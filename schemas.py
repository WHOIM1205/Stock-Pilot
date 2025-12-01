from pydantic import BaseModel

class inventorybase(BaseModel):
    name: str
    Quantity: float
    Price: float
    
    

class inventoryCreate(inventorybase):
    pass

class inventoryResponse(inventorybase):
    id: int
    class Confirm:
        from_attributes = True
