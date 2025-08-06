from sqlalchemy.orm import Session
from . import models, database

def seed_food_items():
    db = database.SessionLocal()
    try:
        food_list = [
            {
                "name": "BBQ Grilled Chicken Burger",
                "price": 350,
                "image": "Bbq Grilled Chicken Burger Regular.png",
                "description": "Smoky grilled chicken patty with sauce",
            },
            {
                "name": "Chicken Tikka Sandwich",
                "price": 300,
                "image": "Chicken Tikka Sandwich.png",
                "description": "Spicy chicken tikka in soft bread",
            },
            {
                "name": "Crispy Paneer Burger",
                "price": 320,
                "image": "Crispy Paneer Burger Regular.png",
                "description": "Paneer patty with crunchy veggies",
            },
            {
                "name": "Large Combo Salted",
                "price": 450,
                "image": "Large Combo Salted.png",
                "description": "Popcorn combo with a soft drink",
            },
            {
                "name": "Large Nachos with Cheese & Salsa",
                "price": 360,
                "image": "Large Nachos With Cheese & Salsa.png",
                "description": "Crispy nachos with toppings",
            },
            {
                "name": "Large Popcorn Salted",
                "price": 300,
                "image": "Large Popcorn Salted.png",
                "description": "Classic salted popcorn",
            },
            {
                "name": "Medium Combo Caramel",
                "price": 400,
                "image": "Medium Combo Caramel.png",
                "description": "Caramel popcorn with soda",
            },
            {
                "name": "Medium Combo Cheese",
                "price": 400,
                "image": "Medium Combo Cheese.png",
                "description": "Cheese popcorn combo",
            },
            {
                "name": "Medium Combo Salted",
                "price": 380,
                "image": "Medium Combo Salted.png",
                "description": "Salted popcorn combo",
            },
            {
                "name": "Medium Popcorn Caramel",
                "price": 220,
                "image": "Medium Popcorn Caramel.png",
                "description": "Caramel flavored popcorn",
            },
            {
                "name": "Medium Popcorn Cheese",
                "price": 220,
                "image": "Medium Popcorn Cheese.png",
                "description": "Cheesy popcorn delight",
            },
            {
                "name": "Medium Popcorn Salted",
                "price": 200,
                "image": "Medium Popcorn Salted.png",
                "description": "Medium sized salted popcorn",
            },
            {
                "name": "Paneer Tikka Sandwich",
                "price": 320,
                "image": "Paneer Tikka Sandwich.png",
                "description": "Indian style sandwich with paneer tikka",
            },
            {
                "name": "Pepsi Large",
                "price": 160,
                "image": "Pepsi Large.png",
                "description": "Chilled large Pepsi",
            },
            {
                "name": "Pepsi Medium",
                "price": 140,
                "image": "Pepsi Medium.png",
                "description": "Chilled medium Pepsi",
            },
            {
                "name": "Pepsi Regular",
                "price": 120,
                "image": "Pepsi Regular.png",
                "description": "Regular size Pepsi",
            },
            {
                "name": "Regular Combo Caramel",
                "price": 360,
                "image": "Regular Combo Caramel.png",
                "description": "Caramel popcorn combo",
            },
            {
                "name": "Regular Combo Cheese",
                "price": 360,
                "image": "Regular Combo Cheese.png",
                "description": "Cheese popcorn combo",
            },
            {
                "name": "Regular Combo Salted",
                "price": 340,
                "image": "Regular Combo Salted.png",
                "description": "Salted popcorn combo",
            },
            {
                "name": "Regular Popcorn Caramel",
                "price": 200,
                "image": "Regular Popcorn Caramel.png",
                "description": "Regular caramel popcorn",
            },
            {
                "name": "Regular Popcorn Cheese",
                "price": 200,
                "image": "Regular Popcorn Cheese.png",
                "description": "Regular cheese popcorn",
            },
            {
                "name": "Regular Popcorn Salted",
                "price": 180,
                "image": "Regular Popcorn Salted.png",
                "description": "Classic regular popcorn",
            },
            {
                "name": "Spicy Grilled Chicken Burger",
                "price": 370,
                "image": "Spicy Grilled Chicken Burger Regular.png",
                "description": "Spicy grilled chicken in a bun",
            },
            {
                "name": "Veggie Mint Chutney Burger",
                "price": 330,
                "image": "Veggie Mint Chutney Burger Regular.png",
                "description": "Veg burger with mint chutney",
            },
        ]

        for food in food_list:
            existing = db.query(models.Food).filter(models.Food.name == food["name"]).first()
            if existing:
                print(f"Skipping existing food: {food['name']}")
                continue

            new_food = models.Food(
                name=food["name"],
                price=food["price"],
                image=food["image"],
                description=food["description"],
            )
            db.add(new_food)

        db.commit()
        print("Food items seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding food data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_food_items()
