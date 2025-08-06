import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  image: string; // this will be only the filename, e.g. 'Bbq Grilled Chicken Burger Regular.png'
  description: string;
  onAddToCart: (item: { id: string; name: string; price: number; quantity: number }) => void;
}

export const FoodItem = ({
  id,
  name,
  price,
  image,
  description,
  onAddToCart,
}: FoodItemProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({ id, name, price, quantity });
      setQuantity(0);
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));

  // Construct the image URL path assuming images served from /assets/
  const imageUrl = `/assets/${image}`;

  return (
    <Card className="cinema-card border-cinema-grey overflow-hidden transition-smooth hover:scale-105 hover:cinema-glow">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-smooth hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-cinema-text">{name}</h3>
          <p className="text-sm text-cinema-text-muted">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-cinema-gold">₹{price}</span>

          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <div className="flex items-center gap-2 bg-cinema-grey rounded-lg p-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={decreaseQuantity}
                  className="h-8 w-8 p-0 hover:bg-cinema-dark-light"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={increaseQuantity}
                  className="h-8 w-8 p-0 hover:bg-cinema-dark-light"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}

            {quantity === 0 ? (
              <Button onClick={increaseQuantity} className="cinema-gradient font-medium">
                Add
              </Button>
            ) : (
              <Button onClick={handleAddToCart} className="cinema-gradient font-medium">
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
