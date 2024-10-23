# database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.ticket import Base  # Import Base from your models
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:ADMIN1234@localhost:5432/ticket_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
