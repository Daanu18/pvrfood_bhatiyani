import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Wallet, Smartphone } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentCheckoutProps {
  items: CartItem[];
  userDetails: {
    email: string;
    mobile: string;
    location: string;
    screenNumber: string;
    seatNumber: string;
  };
  onBack: () => void;
  onPayment: (paymentMethod: string, cardDetails?: any) => void;
  submittingOrder?: boolean;
}

export const PaymentCheckout = ({
  items,
  userDetails,
  onBack,
  onPayment,
  submittingOrder = false,
}: PaymentCheckoutProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Single definition of handleCardInputChange
  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    if (paymentMethod === "card") {
      onPayment(paymentMethod, cardDetails);
    } else {
      onPayment(paymentMethod);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-cinema-grey"
            disabled={submittingOrder}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-cinema-text">Payment</h1>
        </div>

        {/* Order Summary */}
        <Card className="cinema-card border-cinema-grey p-6">
          <h2 className="text-xl font-semibold text-cinema-text mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="text-cinema-text">{item.name}</span>
                  <span className="text-cinema-text-muted ml-2">
                    x{item.quantity}
                  </span>
                </div>
                <span className="text-cinema-gold font-medium">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
            <div className="border-t border-cinema-grey pt-3 mt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-cinema-text">Total ({totalItems} items)</span>
                <span className="text-cinema-gold">₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Delivery Details */}
        <Card className="cinema-card border-cinema-grey p-6">
          <h2 className="text-xl font-semibold text-cinema-text mb-4">
            Delivery Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-cinema-text-muted">Location</p>
              <p className="text-cinema-text font-medium">{userDetails.location}</p>
            </div>
            <div>
              <p className="text-cinema-text-muted">Mobile</p>
              <p className="text-cinema-text font-medium">{userDetails.mobile}</p>
            </div>
            <div>
              <p className="text-cinema-text-muted">Screen</p>
              <p className="text-cinema-text font-medium">#{userDetails.screenNumber}</p>
            </div>
            <div>
              <p className="text-cinema-text-muted">Seat</p>
              <p className="text-cinema-text font-medium">{userDetails.seatNumber}</p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="cinema-card border-cinema-grey p-6">
          <h2 className="text-xl font-semibold text-cinema-text mb-6">Payment Method</h2>

          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-cinema-grey hover:bg-cinema-grey/50 transition-smooth">
              <RadioGroupItem value="card" id="card" disabled={submittingOrder} />
              <Label
                htmlFor="card"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <CreditCard className="h-5 w-5 text-cinema-gold" />
                <div>
                  <p className="text-cinema-text font-medium">Credit/Debit Card</p>
                  <p className="text-cinema-text-muted text-sm">
                    Visa, Mastercard, RuPay
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-cinema-grey hover:bg-cinema-grey/50 transition-smooth">
              <RadioGroupItem value="upi" id="upi" disabled={submittingOrder} />
              <Label
                htmlFor="upi"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Smartphone className="h-5 w-5 text-cinema-gold" />
                <div>
                  <p className="text-cinema-text font-medium">UPI Payment</p>
                  <p className="text-cinema-text-muted text-sm">
                    PhonePe, GPay, Paytm
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-cinema-grey hover:bg-cinema-grey/50 transition-smooth">
              <RadioGroupItem value="wallet" id="wallet" disabled={submittingOrder} />
              <Label
                htmlFor="wallet"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Wallet className="h-5 w-5 text-cinema-gold" />
                <div>
                  <p className="text-cinema-text font-medium">Digital Wallet</p>
                  <p className="text-cinema-text-muted text-sm">
                    PayPal, Amazon Pay
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {/* Card Details Form */}
          {paymentMethod === "card" && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName" className="text-cinema-text">
                  Cardholder Name
                </Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => handleCardInputChange("name", e.target.value)}
                  disabled={submittingOrder}
                  className="bg-cinema-grey border-cinema-grey text-cinema-text placeholder:text-cinema-text-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-cinema-text">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => handleCardInputChange("number", e.target.value)}
                  disabled={submittingOrder}
                  className="bg-cinema-grey border-cinema-grey text-cinema-text placeholder:text-cinema-text-muted"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-cinema-text">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                    disabled={submittingOrder}
                    className="bg-cinema-grey border-cinema-grey text-cinema-text placeholder:text-cinema-text-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-cinema-text">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                    disabled={submittingOrder}
                    className="bg-cinema-grey border-cinema-grey text-cinema-text placeholder:text-cinema-text-muted"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Payment Button */}
        <Card className="cinema-card border-cinema-grey p-6">
          <Button
            onClick={handlePayment}
            className="w-full h-12 text-lg font-semibold cinema-gradient cinema-glow transition-smooth hover:scale-105"
            disabled={submittingOrder}
          >
            {submittingOrder ? "Processing..." : `Pay ₹${totalPrice}`}
          </Button>
          <p className="text-center text-cinema-text-muted text-sm mt-3">
            Your payment is secured with end-to-end encryption
          </p>
        </Card>
      </div>
    </div>
  );
};
