"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { ProfileModal } from "@/components/ProfileModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGreeting } from "@/lib/utils/time";
import { useState, useRef, useEffect } from "react";
import HomeIcon from "@/assets/home.svg";
import HeartIcon from "@/assets/heart.svg";
import StethoscopeIcon from "@/assets/stethoscope_line.svg";

export function HealthHeader() {
  const { user, logout } = useAuth();
  const { profile } = useUser();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = profile?.firstname || user?.displayName || user?.email?.split('@')[0] || "User";
  const profileImage = profile?.profile_url || user?.photoURL || "";
  const greeting = getGreeting();

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: <HomeIcon />,
    },
    {
      label: "Tracking",
      href: "/tracking",
      icon: <HeartIcon />,
    },
    {
      label: "Health Report",
      href: "/health-report",
      icon: <StethoscopeIcon />,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between p-6 bg-background border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={profileImage} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">{greeting}</p>
            <p className="font-semibold text-foreground capitalize">{displayName}</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-menu-ash px-3.5 py-2 rounded-full border border-gray-200/50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isHeartIcon = item.label === "Tracking";
            const isHomeIcon = item.label === "Home";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-full w-50 px-8 py-2 font-medium transition-all duration-200",
                  isActive
                    ? `bg-primary text-white shadow-sm ${
                        isHomeIcon 
                          ? '[&_svg]:fill-white [&_svg]:stroke-primary' 
                          : `[&_svg]:fill-white [&_svg]:stroke-white ${isHeartIcon ? '[&_svg_path]:stroke-[1.1]' : ''}`
                      }`
                    : "bg-white text-gray-800 [&_svg]:stroke-gray-800 shadow-xs"
                )}
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <User size={18} />
              <span className="hidden sm:inline">Account</span>
              <ChevronDown size={16} className={cn("transition-transform", dropdownOpen && "rotate-180")} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setProfileModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User size={16} />
                  Edit Profile
                </button>
                <div className="h-px bg-gray-200 my-1" />
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-menu-ash rounded-full border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isHeartIcon = item.label === "Tracking";
            const isHomeIcon = item.label === "Home";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-full px-6 py-2 font-medium transition-all duration-200 min-w-[70px]",
                  isActive
                    ? `bg-primary text-white shadow-sm ${
                        isHomeIcon 
                          ? '[&_svg]:fill-white [&_svg]:stroke-primary' 
                          : `[&_svg]:fill-white [&_svg]:stroke-white ${isHeartIcon ? '[&_svg_path]:stroke-[2]' : ''}`
                      }`
                    : "bg-white text-gray-800 [&_svg]:stroke-gray-800 shadow-xs"
                )}
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
