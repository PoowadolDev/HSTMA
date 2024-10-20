from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from schemas.ticket import Ticket, TicketCreate, TicketUpdate, StatusEnum
from crud.ticket import (
    get_ticket,
    get_tickets,
    create_ticket,
    update_ticket,
)
from database import get_db

router = APIRouter()

@router.post("/tickets/", response_model=Ticket, status_code=201)
def create_ticket_endpoint(ticket: TicketCreate, db: Session = Depends(get_db)):
    return create_ticket(db=db, ticket=ticket)

@router.get("/tickets/", response_model=List[Ticket])
def read_tickets(
    skip: int = 0,
    limit: int = 100,
    status: Optional[StatusEnum] = None,
    db: Session = Depends(get_db)
):
    tickets = get_tickets(db, skip=skip, limit=limit, status=status)
    return tickets

@router.get("/tickets/{ticket_id}", response_model=Ticket)
def read_ticket(ticket_id: UUID, db: Session = Depends(get_db)):
    db_ticket = get_ticket(db, ticket_id=ticket_id)
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@router.put("/tickets/{ticket_id}", response_model=Ticket)
def update_ticket_endpoint(
    ticket_id: UUID,
    ticket: TicketUpdate,
    db: Session = Depends(get_db)
):
    updated_ticket = update_ticket(db, ticket_id=ticket_id, ticket=ticket)
    if updated_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return updated_ticket
