import React, { useState, useEffect } from "react";
import { LoginForm, UserDetails } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { FoodItem } from "@/components/FoodItem";
import { CartSummary } from "@/components/CartSummary";
import { CartPage } from "@/components/CartPage";
import { PaymentCheckout } from "@/components/PaymentCheckout";
import { useToast } from "@/hooks/use-toast";
import { FoodStats } from "@/components/FoodStats";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

type AppState = "login" | "menu" | "cart" | "payment" | "success";

export const FoodMenu = () => {
  // Use environment variable for backend URL; fallback to localhost for dev
  const apiUrl = import.meta.env.VITE_API_URL;

  const [currentState, setCurrentState] = useState<AppState>("login");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [foodItems, setFoodItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const { toast } = useToast();

  /**
   * Fetches food items from backend API.
   */
  useEffect(() => {
    const fetchFoodItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/food/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch food items: ${response.statusText}`);
        }
        const data: CartItem[] = await response.json();
        setFoodItems(data);
      } catch (err) {
        setError((err as Error).message);
        toast({
          title: "Error",
          description: (err as Error).message || "Could not load food menu",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentState === "menu") fetchFoodItems();
  }, [currentState, toast, apiUrl]);

  /**
   * Handles login, sets user details and navigates to menu state.
   */
  const handleLogin = (details: UserDetails) => {
    setUserDetails(details);
    setCurrentState("menu");
    toast({
      title: "Welcome!",
      description: `Hello! You're all set to order from ${details.city} - ${details.location}`,
    });
  };

  /**
   * Adds item to cart or updates quantity if it already exists.
   */
  const addToCart = (
    item: Omit<CartItem, "image" | "description"> & { description: string }
  ) => {
    const foodItem = foodItems.find((f) => f.id === item.id);
    if (!foodItem) return;
    const cartItem: CartItem = {
      ...item,
      image: foodItem.image,
      description: foodItem.description,
    };
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      return existing
        ? prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, cartItem];
    });
    toast({
      title: "Added to Cart",
      description: `${item.quantity}x ${item.name} added to your cart`,
    });
  };

  /**
   * Updates quantity of a cart item, removes it if quantity is zero.
   */
  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) return removeFromCart(id);
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  /**
   * Removes item from cart.
   */
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Item Removed", description: "Item removed from your cart" });
  };

  /**
   * Submits order(s) to backend API for each cart item.
   */
  const submitOrder = async () => {
    if (!userDetails || cartItems.length === 0) return;

    setSubmittingOrder(true);
    try {
      for (const item of cartItems) {
        const orderPayload = {
          food_id: Number(item.id),
          user_email: userDetails.email,
          user_mobile: userDetails.mobile,
          seat_number: userDetails.seatNumber,
          screen_number: userDetails.screenNumber,
          quantity: item.quantity,
          status: "pending",
        };

        const response = await fetch(`${apiUrl}/orders/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        if (!response.ok) throw new Error("Failed to create order");
      }

      toast({
        title: "Order Placed",
        description: "Your order has been sent successfully!",
      });
      setCartItems([]);
      setCurrentState("success");
    } catch (error) {
      toast({
        title: "Order Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setSubmittingOrder(false);
    }
  };

  /**
   * Handles payment and submits order, provides payment success/failure feedback.
   */
  const handlePayment = async (method: string, cardDetails?: any) => {
    try {
      await submitOrder();
      toast({
        title: "Payment Successful!",
        description: `Your order will be delivered to ${userDetails?.city} - ${userDetails?.location}`,
      });
      setTimeout(() => {
        setCurrentState("menu");
      }, 3000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  if (currentState === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }
  if (currentState === "cart") {
    return (
      <CartPage
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onBack={() => setCurrentState("menu")}
        onProceedToCheckout={() => setCurrentState("payment")}
      />
    );
  }
  if (currentState === "payment" && userDetails) {
    return (
      <PaymentCheckout
        items={cartItems}
        userDetails={userDetails}
        onBack={() => setCurrentState("cart")}
        onPayment={handlePayment}
        submittingOrder={submittingOrder} // Pass loading state to disable button & show spinner inside PaymentCheckout
      />
    );
  }
  if (currentState === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full cinema-gradient mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-cinema-text mb-2">Order Successful!</h1>
          <p className="text-cinema-text-muted">Your food will be delivered to your seat shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userDetails={userDetails} />
      <main className="container mx-auto px-4 py-8">
        <FoodStats />
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cinema-text mb-2">Delicious Cinema Food</h1>
          <p className="text-cinema-text-muted text-lg">
            Order your favorite snacks and enjoy them during the movie
          </p>
          {userDetails && (
            <p className="text-cinema-gold text-sm mt-2">
              Delivering to {userDetails.city} • {userDetails.location} • Screen {userDetails.screenNumber} • Seat {userDetails.seatNumber}
            </p>
          )}
        </div>
        {loading ? (
          <div className="text-center py-16">Loading food menu...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {foodItems.map((item) => (
              <FoodItem
                key={item.id}
                {...item}
                description={item.description || "Delicious cinema snack"}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>
      <CartSummary items={cartItems} onGoToCheckout={() => setCurrentState("cart")} />
    </div>
  );
};
