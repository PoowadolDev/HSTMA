from uuid import UUID
from sqlalchemy.orm import Session
from models.ticket import Ticket, StatusEnum
from schemas.ticket import TicketCreate, TicketUpdate

def create_ticket(db: Session, ticket: TicketCreate):
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def get_ticket(db: Session, ticket_id: UUID):
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()

def get_tickets(db: Session, skip: int = 0, limit: int = 100, status: StatusEnum = None):
    query = db.query(Ticket)
    if status:
        query = query.filter(Ticket.status == status)
    return query.offset(skip).limit(limit).all()

def update_ticket(db: Session, ticket_id: UUID, ticket: TicketUpdate):
    db_ticket = get_ticket(db, ticket_id)
    if not db_ticket:
        return None
    for key, value in ticket.dict(exclude_unset=True).items():
        setattr(db_ticket, key, value)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket