# Helpdesk Support Ticket Management Application

This project is a modern web application designed for efficient helpdesk ticket management. It leverages the following technologies and design principles:

Frontend:
- Next.js: A React framework for building fast and scalable web applications
- Tailwind CSS: A utility-first CSS framework for rapid UI development
- Axios: A promise-based HTTP client for making API requests

Backend:
- FastAPI: A high-performance Python web framework for building APIs
- SQLAlchemy: An SQL toolkit and Object-Relational Mapping (ORM) library
- PostgreSQL: A powerful, open-source relational database

Key Features:
- Responsive design for seamless use across devices
- Real-time updates using server-side events
- RESTful API architecture for smooth frontend-backend communication
- Efficient state management with React hooks

## Table of Contents

- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend](#backend)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js
- Python 3.8+
- PostgreSQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PoowadolDev/HSTMA.git
   cd HSTMA
   ```

2. **Run Docker Compose for running the project:**

   Ensure Docker and Docker Compose are installed on your machine. Then, run the following command to start the services:

   ```bash
   docker-compose up --build
   ```

3. **Run the python unit test:**

   First, run only the PostgreSQL service using Docker Compose:

   ```bash
   docker-compose up -d postgres
   ```

   Then, create a virtual environment and install the required dependencies:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

   Finally, run the unit tests:

   ```bash
   python -m pytest
   ```

## Frontend

The frontend is built with Next.js and uses Tailwind CSS for styling. It includes components for creating and editing tickets.

### Structure
```
frontend/
├── app/
│   ├── components/
│   │   ├── TicketForm.tsx
│   │   ├── TicketFormEdit.tsx
│   │   └── TicketList.tsx
│   ├── data/
│   │   └── Tickets.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
│   └── fonts/
│       ├── GeistVF.woff
│       └── GeistMonoVF.woff
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

- **app/components/**: This folder contains React components used in the application. Components like `TicketForm`, `TicketFormEdit`, and `TicketList` are responsible for rendering UI elements and handling user interactions related to ticket management.
- **app/data/**: This folder holds data models or interfaces, such as the `Ticket` interface, which defines the structure of ticket data used throughout the frontend application.
- **app/**: This is the main application directory where the primary page components and layout files reside. It includes the main entry point for the application, such as `page.tsx`, which is the starting point for rendering the homepage.

## Backend

The backend is built with FastAPI and uses SQLAlchemy for database interactions. It provides RESTful API endpoints for managing tickets.

### Backend Structure
```
backend/
├── api/
│   ├── routes/
│   │   ├── __init__.py
│   │   └── tickets.py
│   └── __init__.py
├── crud/
│   ├── __init__.py
│   └── ticket.py
├── models/
│   ├── __init__.py
│   └── ticket.py
├── schemas/
│   ├── __init__.py
│   └── ticket.py
├── tests/
│   ├── __init__.py
│   └── test_tickets.py
├── database.py
└── main.py
```

- **api/routes/**: This folder contains route definitions for the FastAPI application. Each file in this directory, like tickets.py, defines endpoints for specific resources or functionalities, such as creating, reading, updating, and managing tickets.
- **crud/**: This folder includes CRUD (Create, Read, Update, Delete) operations for interacting with the database. It abstracts the database operations related to different models, such as tickets, and provides functions to perform these operations.
- **models/**: This directory contains SQLAlchemy models that define the database schema. Each model represents a table in the database, with attributes corresponding to the table's columns.
- **schemas/**: This folder holds Pydantic models used for data validation and serialization. These schemas define the structure of data that is expected in API requests and responses.
- **tests/**: This directory is used for writing test cases to ensure the functionality of the backend application. It includes test files that use tools like pytest to verify the behavior of API endpoints and other components.
- **database.py**: This file is responsible for setting up the database connection and session management. It includes the configuration for connecting to the database and functions to get a database session.
- **main.py**: This is the entry point for the FastAPI application. It initializes the app, includes middleware like CORS, and sets up the API routes.

**API Endpoints:**
  - `POST /api/tickets/`: Create a new ticket.
  - `GET /api/tickets/`: Retrieve a list of tickets.
  - `GET /api/tickets/{ticket_id}`: Retrieve a specific ticket.
  - `PUT /api/tickets/{ticket_id}`: Update a ticket.

**Note:**
- For more detail about the API documentation, please refer to the [Swagger UI](http://localhost:8000/docs) at http://localhost:8000/docs
