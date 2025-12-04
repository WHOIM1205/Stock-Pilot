from models import Inventory, User
from schemas import inventoryCreate, UserCreate
from sqlalchemy.orm import Session

def create(db: Session, data: inventoryCreate):
    inventory = Inventory(**data.model_dump())
    db.add(inventory)
    db.commit()
    db.refresh(inventory)
    return inventory

def get(db: Session, name: str | None = None):
    q = db.query(Inventory)
    if name:
        q = q.filter(Inventory.name == name)
    return q.all()

def update(db: Session, id: int, data: inventoryCreate):
    inventory = db.query(Inventory).filter(Inventory.id == id).first()
    if inventory:
        for key, value in data.model_dump().items():
            setattr(inventory, key, value)            
        db.commit()
        db.refresh(inventory)
    return inventory

def delete(db: Session, id: int):
    inventory = db.query(Inventory).filter(Inventory.id == id).first()
    if inventory:
        db.delete(inventory)
        db.commit()
        return f"Data has been deleted..."
    return f"Data can not be deleted..."

# User authentication functions
def create_user(db: Session, user: UserCreate):
    """Create a new user"""
    db_user = User(username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    """Get user by username"""
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    """Authenticate user with username and password"""
    user = get_user_by_username(db, username)
    if not user:
        return None
    if user.password != password:
        return None
    return user
