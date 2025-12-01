from fastapi import FastAPI, Depends, HTTPException
from database import engine, SessionLocal
from models import Base
from schemas import inventoryCreate, inventoryResponse 
import crud
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/stock/", response_model=inventoryResponse)
def create(data: inventoryCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)

@app.get("/stock/", response_model=list[inventoryResponse])
def get(name: str | None = None, db: Session = Depends(get_db)):
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


