from sqlalchemy import Column, String, Text, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
from datetime import datetime
import enum
import uuid
import pytz

Base = declarative_base()

class StatusEnum(str, enum.Enum):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    RESOLVED = 'Resolved'
    REJECTED = 'Rejected'

bangkok_tz = pytz.timezone('Asia/Bangkok')

def bangkok_now():
    return datetime.now(bangkok_tz)

class Ticket(Base):
    __tablename__ = 'tickets'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text)
    contact_info = Column(String)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDING)
    created_at = Column(DateTime(timezone=True), default=bangkok_now)
    updated_at = Column(DateTime(timezone=True), default=bangkok_now, onupdate=bangkok_now)

    def __repr__(self):
        return f"<Ticket(id={self.id}, title='{self.title}', status='{self.status}')>"