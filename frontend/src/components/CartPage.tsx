import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onProceedToCheckout: () => void;
}

export const CartPage = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onBack, 
  onProceedToCheckout 
}: CartPageProps) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 hover:bg-cinema-grey"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-cinema-text">Your Cart</h1>
          </div>

          <Card className="cinema-card border-cinema-grey p-8 text-center">
            <ShoppingCart className="h-16 w-16 text-cinema-text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-cinema-text mb-2">Your cart is empty</h2>
            <p className="text-cinema-text-muted mb-6">Add some delicious items to get started!</p>
            <Button onClick={onBack} className="cinema-gradient">
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-cinema-grey"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-cinema-text">Your Cart</h1>
          <span className="text-cinema-text-muted">({totalItems} items)</span>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="cinema-card border-cinema-grey p-4">
              <div className="flex items-center gap-4">
                <img 
                  src={`/assets/${item.image}`} 
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-cinema-text">{item.name}</h3>
                  <p className="text-cinema-gold font-medium">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-cinema-grey rounded-lg p-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="h-8 w-8 p-0 hover:bg-cinema-dark-light"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-cinema-text">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0 hover:bg-cinema-dark-light"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveItem(item.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-cinema-gold">₹{item.price * item.quantity}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        <Card className="cinema-card border-cinema-grey p-6 sticky bottom-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-cinema-text">Subtotal ({totalItems} items)</span>
              <span className="font-bold text-cinema-gold">₹{totalPrice}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-cinema-text-muted">
              <span>Delivery charges</span>
              <span>Free</span>
            </div>
            
            <div className="border-t border-cinema-grey pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-cinema-text">Total</span>
                <span className="text-cinema-gold">₹{totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={onProceedToCheckout}
              className="w-full h-12 text-lg font-semibold cinema-gradient cinema-glow transition-smooth hover:scale-105"
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};