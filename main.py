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





from fastapi import FastAPI, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from database import engine, Base, ToDo
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi_versioning import VersionedFastAPI, version
import shemas

Base.metadata.create_all(engine)

# Aplikacija za serviranje HTML in statičnih datotek
static_app = FastAPI()

static_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

static_app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@static_app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# API aplikacija
api_app = FastAPI()

@api_app.post("/dodaj")
@version(1)
def dodaj_todo_v1(todo:shemas.ToDo):
    session = Session(bind=engine, expire_on_commit=False)
    todoDB = ToDo(task=todo.task)
    session.add(todoDB)
    session.commit()
    id = todoDB.id
    session.close()
    return f"Nov ToDo id {id}"

@api_app.post("/dodaj", status_code=status.HTTP_201_CREATED)
@version(2)
def dodaj_todo_v2(todo:shemas.ToDo):
    session = Session(bind=engine, expire_on_commit=False)
    todoDB = ToDo(task=todo.task)
    session.add(todoDB)
    session.commit()
    id = todoDB.id
    session.close()
    return f"Nov ToDo id {id}"

@api_app.delete("/delete/{id}")
@version(1)
def delete_todo_v1(id: int):
    return "delete ToDo"

@api_app.delete("/delete/{id}")
@version(2)
def delete_todo_v2(id: int):
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).get(id)
    if todo:
        session.delete(todo)
        session.commit()
        session.close()
    else:
        session.close()
        raise HTTPException(status_code=404, detail=f"ToDo z id {id} ne obstaja")
    return f"deleted ToDo z id {id}"

@api_app.put("/update/{id}")
@version(1)
def update_todo_v1():
    return "update ToDo"

@api_app.put("/update/{id}/{task}")
@version(2)
def update_todo_v2(id: int, task: str):
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).get(id)
    if todo:
        todo.task = task
        session.commit()
        session.close()
    if not todo:
        raise HTTPException(status_code=404, detail=f"ToDo z id {id} ne obstaja")
    return f"updated todo {id}"

@api_app.get("/get/{id}")
@version(1)
def get_todo_v1():
    return "get ToDo"

@api_app.get("/get/{id}")
@version(2)
def get_todo_v2(id: int):
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).get(id)
    session.close()
    if not todo:
        raise HTTPException(status_code=404, detail=f"ToDo z id {id} ne obstaja")
    return todo

@api_app.get("/list", status_code=status.HTTP_200_OK)
@version(2)
def get_all_todo():
    session = Session(bind=engine, expire_on_commit=False)
    todo = session.query(ToDo).all()
    session.close()
    return todo

# Uporabi VersionedFastAPI za API aplikacijo
versioned_api_app = VersionedFastAPI(api_app, version_format='{major}', prefix_format="/v{major}")

# Glavna aplikacija, ki združuje statični del in API
app = FastAPI()
app.mount("/", static_app)
app.mount("/api", versioned_api_app)

