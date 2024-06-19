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

# Replace with your actual database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create the SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session maker to create and manage database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative models
Base = declarative_base()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Example SQLAlchemy model
class ExerciseModel(Base):
    __tablename__ = "exercises"

    #id = Column(Integer, primary_key=True, index=True)
    task = Column(String, primary_key=True, index=True)
    sets = Column(Integer)
    reps = Column(JSON)

# Create all tables in the database
Base.metadata.create_all(bind=engine)
