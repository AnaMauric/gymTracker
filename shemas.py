'''from pydantic import BaseModel

class ToDo(BaseModel):
    task:str '''


'''from pydantic import BaseModel

class ToDo(BaseModel):
    task: str
    sets: int

    class Config:
        orm_mode = True''' 


from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import mapper 

class ToDo(BaseModel):
    task: str
    sets: int
    reps: int

    class Config:
        orm_mode = True

#mapper(ToDo, todo_t)

