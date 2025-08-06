from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine, Base

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS setup: allow your frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your deployed frontend domain in production!
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

# Food Endpoints
@app.post("/food/", response_model=schemas.Food)
def create_food(food: schemas.FoodCreate, db: Session = Depends(get_db)):
    db_food = crud.get_food_by_name(db, name=food.name)
    if db_food:
        raise HTTPException(status_code=400, detail="Food with this name already exists")
    return crud.create_food(db, food)

@app.get("/food/", response_model=list[schemas.Food])
def read_foods(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_foods(db, skip, limit)

@app.get("/food/{food_id}", response_model=schemas.Food)
def read_food(food_id: int, db: Session = Depends(get_db)):
    db_food = crud.get_food(db, food_id)
    if db_food is None:
        raise HTTPException(status_code=404, detail="Food not found")
    return db_food

# Order Endpoints
@app.post("/orders/", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db, order)

@app.get("/orders/", response_model=list[schemas.Order])
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_orders(db, skip, limit)

@app.get("/orders/{order_id}", response_model=schemas.Order)
def read_order(order_id: int, db: Session = Depends(get_db)):
    db_order = crud.get_order(db, order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

# PATCH endpoint for updating any order fields (status, quantity, etc.)
@app.patch("/orders/{order_id}", response_model=schemas.Order)
def update_order(order_id: int, order_update: schemas.OrderUpdate, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    update_data = order_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_order, key, value)
    db.commit()
    db.refresh(db_order)
    return db_order

# PUT endpoint for status only (kept for compatibility)
@app.put("/orders/{order_id}/status", response_model=schemas.Order)
def update_order_status(order_id: int, status: str = Query(...), db: Session = Depends(get_db)):
    db_order = crud.update_order_status(db, order_id, status)
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@app.delete("/orders/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(db_order)
    db.commit()
    return
