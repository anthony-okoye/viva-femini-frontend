"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function HealthHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const displayName = user?.displayName || user?.email?.split('@')[0] || "User";

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      label: "Tracking",
      href: "/tracking",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      label: "Health Report",
      href: "/health-report",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
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

      <nav className="hidden lg:flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "bg-background text-foreground hover:bg-secondary"
              )}
            >
              {item.icon}
              {item.label}
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
  );
}
