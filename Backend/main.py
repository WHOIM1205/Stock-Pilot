from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
from models import Base, User
from schemas import inventoryCreate, inventoryResponse, UserCreate, UserLogin, UserResponse
import crud
from sqlalchemy.orm import Session

from sqladmin import Admin, ModelView
from models import Inventory

Base.metadata.create_all(bind=engine)
app = FastAPI()

# Add CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication endpoints
@app.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user account"""
    # Check if user already exists
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login with username and password"""
    authenticated_user = crud.authenticate_user(db, user.username, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {
        "message": "Login successful",
        "user_id": authenticated_user.id,
        "username": authenticated_user.username,
        "access_token": "dummy_token_" + str(authenticated_user.id)  # Simple token for demo
    }

# Inventory endpoints
@app.post("/stock/", response_model=inventoryResponse)
def create(data: inventoryCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)

@app.get("/stock/", response_model=list[inventoryResponse])
def get_stock(name: str | None = None, db: Session = Depends(get_db)):
    return crud.get(db, name)

@app.put("/stock/{id}", response_model=inventoryResponse)
def update(id: int, data: inventoryCreate, db: Session = Depends(get_db)):
    updated = crud.update(db, id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Record not found")
    return updated

@app.delete("/stock/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete(db, id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"message": "Record deleted successfully"}

@app.get("/inventory/", response_model=list[inventoryResponse])
def get(id: str | None = None, db: Session = Depends(get_db)):
    return crud.get(db, id)


admin = Admin(app, engine)

class InventoryAdmin(ModelView, model=Inventory):
    column_list = [Inventory.id, Inventory.name, Inventory.Quantity, Inventory.Price]
    name = "Inventory"
    name_plural = "Inventory Items"

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.username]
    name = "User"
    name_plural = "Users"

admin.add_view(InventoryAdmin)
admin.add_view(UserAdmin)