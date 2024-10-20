from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum
from uuid import UUID

class StatusEnum(str, Enum):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    RESOLVED = 'Resolved'
    REJECTED = 'Rejected'

class TicketBase(BaseModel):
    title: str
    description: Optional[str] = None
    contact_info: Optional[str] = None

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    contact_info: Optional[str] = None
    status: Optional[StatusEnum] = None

class Ticket(TicketBase):
    id: UUID
    status: StatusEnum
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True