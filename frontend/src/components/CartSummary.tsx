import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];
  onGoToCheckout: () => void;
}

export const CartSummary = ({ items, onGoToCheckout }: CartSummaryProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onGoToCheckout}
        className="cinema-gradient cinema-floating h-14 px-6 rounded-full font-semibold text-base shadow-xl hover:scale-105 transition-smooth"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        <div className="flex flex-col items-start">
          <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          <span className="text-sm">₹{totalPrice}</span>
        </div>
      </Button>
    </div>
  );
};