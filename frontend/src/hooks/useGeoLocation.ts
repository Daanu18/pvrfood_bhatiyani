import { useEffect, useState } from "react";
import axios from "axios";

export const useGeoLocation = () => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setCity(response.data.city);
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };

    fetchLocation();
  }, []);

  return city;
};
