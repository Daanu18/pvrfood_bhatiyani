import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Suggestion {
  id: number;
  text: string;
  user: string;
}

export const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [newSuggestion, setNewSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/suggestions");
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load suggestions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const addSuggestion = async () => {
    if (!newSuggestion.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newSuggestion, user: "Anonymous" }),
      });
      if (!res.ok) throw new Error("Failed to add suggestion");
      const added = await res.json();
      setSuggestions((prev) => [...prev, added]);
      setNewSuggestion("");
      toast({ title: "Success", description: "Suggestion sent!" });
    } catch (error) {
      toast({ title: "Error", description: "Could not add suggestion", variant: "destructive" });
    }
  };

  return (
    <Card className="p-6 my-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Suggestions</h2>
      <div className="mb-4">
        {loading ? (
          <p>Loading suggestions...</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 max-h-40 overflow-auto">
            {suggestions.map((s) => (
              <li key={s.id}>{`${s.text} - ${s.user}`}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Your suggestion..."
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
        />
        <Button onClick={addSuggestion}>Add</Button>
      </div>
    </Card>
  );
};
