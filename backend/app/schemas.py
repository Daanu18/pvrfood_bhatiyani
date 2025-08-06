from pydantic import BaseModel
from typing import Optional

class FoodBase(BaseModel):
    name: str
    price: float
    image: str
    description: str | None = None

class FoodCreate(FoodBase):
    pass

class Food(FoodBase):
    id: int

    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    food_id: int
    user_email: str
    user_mobile: str
    seat_number: str
    screen_number: str
    quantity: int
    status: str = "pending"

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    quantity: Optional[int] = None
    seat_number: Optional[str] = None
    screen_number: Optional[str] = None
    user_email: Optional[str] = None
    user_mobile: Optional[str] = None
