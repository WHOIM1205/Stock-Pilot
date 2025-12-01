from models import Inventory
from schemas import inventoryCreate
from sqlalchemy.orm import Session

def create(db: Session, data: inventoryCreate):
    inventory = Inventory(**data.model_dump())
    db.add(inventory)
    db.commit()
    db.refresh(inventory)
    return inventory

def get(db: Session, category: str | None = None):
    query = db.query(Inventory)
    if category:
        query = query.filter(Inventory.category == category)
    return query

def update(db: Session, id: int, data: inventoryCreate):
    inventory = db.query(Inventory).filter(Inventory.id == id).first()
    if inventory:
        for key, value in data.model_dump().items():
            setattr(inventory, key, value)            # satattr(you want to update, it's key, value want to set)
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



