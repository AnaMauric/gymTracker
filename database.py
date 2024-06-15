'''from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine("sqlite:///tododatabase.db")
Base = declarative_base()

class ToDo(Base):
    __tablename__="todotable"
    id=Column(Integer, primary_key = True)
    task = Column(String(50)) ''' 

from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database URL (use a relative path to store the database in your project directory)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create the database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative models
Base = declarative_base()


class ToDo(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    task = Column(String, index=True)
    sets = Column(Integer)
    reps = Column(JSON)

