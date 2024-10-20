from fastapi import FastAPI
from database import get_db
from api.routes import tickets

app = FastAPI()
db = get_db()
app.include_router(tickets.router, prefix="/api", tags=["tickets"])

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)