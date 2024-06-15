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


class ToDo(BaseModel):
    task: str
    sets: int
    reps: List[int]

    class Config:
        orm_mode = True



