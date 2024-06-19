'''from typing import Union
from fastapi import FastAPI, HTTPException, status
from database import engine, Base, ToDo
from sqlalchemy.orm import Session 
from fastapi.middleware.cors import CORSMiddleware
from fastapi_versioning import VersionedFastAPI, version

Base.metadata.create_all(engine)
import shemas

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return "TODO app"


@app.post("/dodaj")
@version(1)
def dodaj_todo(todo:shemas.ToDo):
    session = Session(bind=engine, expire_on_commit=False)
    todoDB = ToDo(task=todo.task)
    session.add(todoDB)
    session.commit()
    id=todoDB.id
    session.close()
    return f"Nov ToDo id {id}"



@app.post("/dodaj", status_code=status.HTTP_201_CREATED)
@version(2)
def dodaj_todo(todo:shemas.ToDo):
    session = Session(bind=engine, expire_on_commit=False)
    todoDB = ToDo(task=todo.task)
    session.add(todoDB)
    session.commit()
    id=todoDB.id
    session.close()
    return f"Nov ToDo id {id}"




@app.delete("/delete/{id}")
@version(1)
def delete_todo(id:int):
    return "delete ToDo"


@app.delete("/delete/{id}")
@version(2)
def delete_todo(id:int):
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).get(id)
    if todo:
        session.delete(todo)
        session.commit()
        session.close()
    else:
        session.close()
        raise HTTPException(status_code=404, detail = f"ToDo z id {id} ne obstaja")
    return f"deleted ToDo z id {id}"


@app.put("/update/{id}")
@version(1)
def update_todo():
    return "update ToDo"


@app.put("/update/{id}/{task}")
@version(2)
def update_todo(id:int, task:str):
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).get(id)
    if todo:
        todo.task = task
        session.commit()
        session.close()
    if not todo:
        raise HTTPException(status_code=404, detail=f"ToDo z id {id} ne obstaja")
    return f"updated todo {id}"



@app.get("/get/{id}")
@version(1)
def get_todo():
    return "get ToDo"



@app.get("/get/{id}")
@version(2)
def get_todo(id:int):
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).get(id)
    session.close()
    if not todo:
        raise HTTPException(status_code=404, detail=f"ToDo z id {id} ne obstaja")
    return todo


@app.get("/list", status_code=status.HTTP_200_OK)
@version(2)
def get_all_todo():
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).all()
    session.close()
    return todo


app = VersionedFastAPI(app, version_format='{major}', prefix_format="/v{major}")'''



from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from database import engine, Base, SessionLocal, get_db, ExerciseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

Base.metadata.create_all(bind=engine) 





class Exercise(BaseModel):
    task: str 
    sets: int
    reps: List[int]




# Static files and HTML serving application
static_app = FastAPI()

static_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

static_app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@static_app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})





# API application 
api_app = FastAPI()

api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@api_app.post("/log-workout", response_model=dict)
async def log_workout(exercises: List[Exercise], db: Session = Depends(get_db)):
    try:
        for exercise in exercises:
            db_exercise = ExerciseModel(task=exercise.task, sets=exercise.sets, reps=exercise.reps)
            db.add(db_exercise)
        db.commit()
        return {"status": "success", "exercises_logged": len(exercises)}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to log exercises: {str(e)}")


# DELETE endpoint to delete exercise by name
@api_app.delete("/delete-exercise/{exercise_name}", response_model=dict)
async def delete_exercise(exercise_name: str, db: Session = Depends(get_db)):
    try:
        # Query the database for the exercise by task (exercise_name)
        exercise = db.query(ExerciseModel).filter(ExerciseModel.task == exercise_name).first()

        if exercise:
            # Delete the exercise from the database
            db.delete(exercise)
            db.commit()
            return {"status": "success", "message": f"Exercise '{exercise_name}' deleted"}
        else:
            # Raise 404 HTTPException if exercise is not found
            raise HTTPException(status_code=404, detail=f"Exercise '{exercise_name}' not found")
    except Exception as e:
        # Rollback transaction on any unexpected error and raise HTTP 500 exception
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete exercise: {str(e)}")


 
# GET endpoint to retrieve exercise details by name
@api_app.get("/get-exercise/{exercise_name}", response_model=dict)
async def get_exercise(exercise_name: str, db: Session = Depends(get_db)):
    try:
        # Query the database for the exercise by task (exercise_name)
        exercise = db.query(ExerciseModel).filter(ExerciseModel.task == exercise_name).first()

        if exercise:
            # Return exercise details as a dictionary
            return {
                "task": exercise.task,
                "sets": exercise.sets,
                "reps": exercise.reps
            }
        else:
            # Raise 404 HTTPException if exercise is not found
            raise HTTPException(status_code=404, detail=f"Exercise '{exercise_name}' not found")
    except Exception as e:
        # Raise HTTP 500 exception on unexpected error
        raise HTTPException(status_code=500, detail=f"Failed to fetch exercise: {str(e)}")


# Main FastAPI application 
app = FastAPI()

app.mount("/api", api_app)  # Mount the API application under "/api"
app.mount("/", static_app)  # Mount the static files and HTML serving application under "/"



