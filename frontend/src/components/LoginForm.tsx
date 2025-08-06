import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Film,
  Mail,
  Phone,
  MapPin,
  Monitor,
  Armchair,
  Building,
} from "lucide-react";

interface LoginFormProps {
  onLogin: (userDetails: UserDetails) => void;
}

export interface UserDetails {
  email: string;
  mobile: string;
  city: string;
  location: string;
  screenNumber: string;
  seatNumber: string;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [formData, setFormData] = useState<UserDetails>({
    email: "",
    mobile: "",
    city: "",
    location: "",
    screenNumber: "",
    seatNumber: "",
  });

  const [errors, setErrors] = useState<{ email?: string; mobile?: string }>({});

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
  ];

  const pvrLocations: Record<string, string[]> = {
    Mumbai: ["PVR Phoenix Palladium", "PVR Juhu", "PVR Oberoi Mall"],
    Delhi: ["PVR Select City Walk", "PVR Priya", "PVR Anupam"],
    Bangalore: ["PVR Forum Mall", "PVR Orion Mall", "PVR Phoenix Marketcity"],
    Chennai: ["PVR Express Avenue", "PVR VR Mall"],
    Hyderabad: ["PVR Forum Mall", "PVR Inorbit Cyberabad"],
    Pune: ["PVR Phoenix MarketCity", "PVR Seasons Mall"],
    Kolkata: ["PVR South City Mall", "PVR Quest Mall"],
    Ahmedabad: ["PVR Acropolis Mall"],
    Surat: ["PVR Rahul Raj Mall"],
    Jaipur: ["PVR GT Central"],
    Lucknow: ["PVR Phoenix United"],
    Kanpur: ["PVR Z Square Mall"],
    Nagpur: ["PVR Empress City Mall"],
    Indore: ["PVR Treasure Island"],
    Thane: ["PVR Viviana Mall"],
    Bhopal: ["PVR DB City Mall"],
    Visakhapatnam: ["PVR CMR Central"],
    "Pimpri-Chinchwad": ["PVR City One Mall"],
    Patna: ["PVR P&M Mall"],
    Vadodara: ["PVR Inorbit Mall"],
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; mobile?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid Indian mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onLogin(formData);
    }
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "city" ? { location: "" } : {}),
    }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md cinema-card border-cinema-grey p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full cinema-gradient mx-auto mb-4">
            <Film className="h-8 w-8 text-cinema-dark" />
          </div>
          <h1 className="text-2xl font-bold text-cinema-text mb-2">
            Welcome to CinemaEats
          </h1>
          <p className="text-cinema-text-muted">
            Enter your details to start ordering
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-cinema-text flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email Address
            </Label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-cinema-grey border-cinema-grey"
              required
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-cinema-text flex items-center gap-2">
              <Phone className="h-4 w-4" /> Mobile Number
            </Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              className="bg-cinema-grey border-cinema-grey"
              required
            />
            {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-cinema-text flex items-center gap-2">
              <Building className="h-4 w-4" /> City
            </Label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleInputChange("city", value)}
            >
              <SelectTrigger className="bg-cinema-grey border-cinema-grey text-cinema-text">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="bg-cinema-grey border-cinema-grey max-h-48 overflow-auto">
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-cinema-text flex items-center gap-2">
              <MapPin className="h-4 w-4" /> PVR Cinema Location
            </Label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleInputChange("location", value)}
              disabled={!formData.city}
            >
              <SelectTrigger className="bg-cinema-grey border-cinema-grey text-cinema-text">
                <SelectValue
                  placeholder={
                    formData.city ? "Select PVR location" : "Select city first"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-cinema-grey border-cinema-grey max-h-48 overflow-auto">
                {formData.city &&
                  pvrLocations[formData.city]?.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-cinema-text flex items-center gap-2">
                <Monitor className="h-4 w-4" /> Screen
              </Label>
              <Input
                placeholder="3"
                value={formData.screenNumber}
                onChange={(e) => handleInputChange("screenNumber", e.target.value)}
                className="bg-cinema-grey border-cinema-grey"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-cinema-text flex items-center gap-2">
                <Armchair className="h-4 w-4" /> Seat
              </Label>
              <Input
                placeholder="F12"
                value={formData.seatNumber}
                onChange={(e) => handleInputChange("seatNumber", e.target.value)}
                className="bg-cinema-grey border-cinema-grey"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold cinema-gradient cinema-glow transition-smooth hover:scale-105"
          >
            Continue to Menu
          </Button>
        </form>
      </Card>
    </div>
  );
};
