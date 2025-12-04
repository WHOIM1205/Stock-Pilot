from pydantic import BaseModel, Field

class inventorybase(BaseModel):
    name: str
    Quantity: float
    Price: float
    
    class Config:
        from_attributes = True

class inventoryCreate(inventorybase):
    pass

class inventoryResponse(BaseModel):
    id: int
    name: str
    Quantity: float
    Price: float
    
    class Config:
        from_attributes = True

# User schemas for authentication
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    
    class Config:
        from_attributes = True
