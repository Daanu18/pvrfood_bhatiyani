from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Food(Base):
    __tablename__ = "food"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    price = Column(Float, nullable=False)
    image = Column(String)
    description = Column(String, nullable=True)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    food_id = Column(Integer, nullable=False)
    user_email = Column(String, nullable=False)
    user_mobile = Column(String, nullable=False)
    seat_number = Column(String, nullable=False)
    screen_number = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(String, default="pending")
