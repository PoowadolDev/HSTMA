from sqlalchemy import Column, String, Text, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from datetime import datetime
import enum
import uuid
Base = declarative_base()

class StatusEnum(str, enum.Enum):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    RESOLVED = 'Resolved'
    REJECTED = 'Rejected'

class Ticket(Base):
    __tablename__ = 'tickets'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text)
    contact_info = Column(String)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Ticket(id={self.id}, title='{self.title}', status='{self.status}')>"