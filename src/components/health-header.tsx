"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import HomeIcon from "@/assets/home.svg";
import HeartIcon from "@/assets/heart.svg";
import StethoscopeIcon from "@/assets/stethoscope_line.svg";

export function HealthHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const displayName = user?.displayName || user?.email?.split('@')[0] || "User";

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <HomeIcon />
      ),
    },
    {
      label: "Tracking",
      href: "/tracking",
      icon: (
        <HeartIcon />
      ),
    },
    {
      label: "Health Report",
      href: "/health-report",
      icon: (
        <StethoscopeIcon />
      ),
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between p-6 bg-background border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={user?.photoURL || ""} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {displayName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Good Morning ☀️</p>
            <p className="font-semibold text-foreground">{displayName}</p>
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

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

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
                  "flex flex-col items-center gap-1 rounded-full w-50 px-8 py-2 font-medium transition-all duration-200 min-w-[70px]",
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
