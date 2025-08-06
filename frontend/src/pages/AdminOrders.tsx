import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  food_id: number;
  user_email: string;
  user_mobile: string;
  screen_number: string;
  seat_number: string;
  quantity: number;
  status: string;
}

interface AdminOrdersProps {
  userDetails: { email: string } | null;
}

export const AdminOrders = ({ userDetails }: AdminOrdersProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  // Check admin access based on email domain
  const isAdmin = userDetails?.email?.toLowerCase().endsWith("@cinemaEats.com");

  useEffect(() => {
    if (!isAdmin) return; // Don't fetch if not admin

    setLoading(true);
    setError(null);
    fetch("http://127.0.0.1:8000/orders/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  const markAsDelivered = async (orderId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "delivered" }),
      });
      if (!res.ok) throw new Error("Failed to update order status");
      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updatedOrder : o))
      );
      toast({ title: "Success", description: "Order marked as delivered" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  const deleteOrder = async (orderId: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      toast({ title: "Success", description: "Order deleted" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-center text-red-600 text-xl">
          Access Denied — Admins Only
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-cinema-text mb-6">
        Admin: Orders Panel
      </h1>

      {loading && <div>Loading orders...</div>}
      {error && <div className="text-red-700">{error}</div>}

      <Card className="overflow-x-auto">
        <table className="min-w-full border border-cinema-grey">
          <thead>
            <tr className="bg-cinema-grey text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Food ID</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Screen</th>
              <th className="px-4 py-2">Seat</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-cinema-grey hover:bg-cinema-dark-light transition"
              >
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.food_id}</td>
                <td className="px-4 py-2">{order.user_email}</td>
                <td className="px-4 py-2">{order.user_mobile}</td>
                <td className="px-4 py-2">{order.screen_number}</td>
                <td className="px-4 py-2">{order.seat_number}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  {order.status !== "delivered" && (
                    <Button
                      size="sm"
                      onClick={() => markAsDelivered(order.id)}
                      className="mr-2"
                    >
                      Mark Delivered
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
