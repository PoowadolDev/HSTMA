import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from database import Base, get_db

# Set up test database
DATABASE_URL = "postgresql://admin:ADMIN1234@localhost:5432/ticket_db"

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the dependency to use the test database
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Create the test database tables
Base.metadata.create_all(bind=engine)

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def test_create_ticket():
    response = client.post(
        "/api/tickets/",
        json={
            "title": "Test Ticket",
            "description": "This is a test ticket",
            "contact_info": "test@example.com"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Ticket"
    assert data["status"] == "Pending"
    assert "id" in data

def test_read_ticket():
    # Create a ticket first
    response = client.post(
        "/api/tickets/",
        json={
            "title": "Test Ticket",
            "description": "This is a test ticket",
            "contact_info": "test@example.com"
        }
    )
    ticket_id = response.json()["id"]

    # Read the created ticket
    response = client.get(f"/api/tickets/{ticket_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == ticket_id
    assert data["title"] == "Test Ticket"

def test_update_ticket():
    # Create a ticket first
    response = client.post(
        "/api/tickets/",
        json={
            "title": "Old Title",
            "description": "Old description",
            "contact_info": "test@example.com"
        }
    )
    ticket_id = response.json()["id"]

    # Update the ticket
    response = client.put(
        f"/api/tickets/{ticket_id}",
        json={
            "title": "New Title",
            "status": "Accepted"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Title"
    assert data["status"] == "Accepted"

def test_ticket_cannot_be_deleted():
    # Create a ticket first
    response = client.post(
        "/api/tickets/",
        json={
            "title": "Test Ticket",
            "description": "This is a test ticket",
            "contact_info": "test@example.com"
        }
    )
    ticket_id = response.json()["id"]

    # Attempt to delete the ticket
    response = client.delete(f"/api/tickets/{ticket_id}")
    assert response.status_code == 405