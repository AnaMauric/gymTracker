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

class Reps(BaseModel):
    rep_number: int
    rep_count: int

class ToDo(BaseModel):
    task: str
    sets: int
    reps: List[Reps]

    class Config:
        orm_mode = True



