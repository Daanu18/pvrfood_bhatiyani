from sqlalchemy.orm import Session
from . import models, schemas


# Food CRUD operations
def get_food(db: Session, food_id: int):
    return db.query(models.Food).filter(models.Food.id == food_id).first()


def get_food_by_name(db: Session, name: str):
    return db.query(models.Food).filter(models.Food.name == name).first()


def get_foods(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Food).offset(skip).limit(limit).all()


def create_food(db: Session, food: schemas.FoodCreate):
    db_food = models.Food(
        name=food.name,
        price=food.price,
        image=food.image,
        description=food.description,
    )
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food


# Order CRUD operations
def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()


def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()


def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        food_id=order.food_id,
        user_email=order.user_email,
        user_mobile=order.user_mobile,
        seat_number=order.seat_number,
        screen_number=order.screen_number,
        quantity=order.quantity,
        status=order.status,
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def update_order(db: Session, order_id: int, updates: dict):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order:
        for key, value in updates.items():
            setattr(db_order, key, value)
        db.commit()
        db.refresh(db_order)
    return db_order


def update_order_status(db: Session, order_id: int, status: str):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order:
        db_order.status = status
        db.commit()
        db.refresh(db_order)
    return db_order


def delete_order(db: Session, order_id: int):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order:
        db.delete(db_order)
        db.commit()
    return db_order
