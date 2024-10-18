# models/ticket.py

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.orm import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class StatusEnum(str, enum.Enum):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    RESOLVED = 'Resolved'
    REJECTED = 'Rejected'

class Ticket(Base):
    __tablename__ = 'tickets'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    contact_info = Column(String)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Ticket(id={self.id}, title='{self.title}', status='{self.status}')>"