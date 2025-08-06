import { Film } from "lucide-react";
import { UserDetails } from "./LoginForm";

interface HeaderProps {
  userDetails?: UserDetails | null;
}

export const Header = ({ userDetails }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cinema-grey bg-cinema-dark/90 backdrop-blur supports-[backdrop-filter]:bg-cinema-dark/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full cinema-gradient shadow-md">
            <Film className="h-6 w-6 text-cinema-dark" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-cinema-text">CinemaEats</h1>
            <p className="text-xs text-cinema-text-muted">Premium Food Experience</p>
          </div>
        </div>

        {/* User Location Info */}
        <div className="text-right leading-tight">
          <p className="text-sm font-medium text-cinema-gold">
            Screen {userDetails?.screenNumber || "N/A"}
          </p>
          <p className="text-xs text-cinema-text-muted">
            {userDetails?.location || "PVR Cinemas"}
          </p>
        </div>
      </div>
    </header>
  );
};
