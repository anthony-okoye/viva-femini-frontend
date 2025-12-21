"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function HealthHeader() {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || "User";

  return (
    <header className="flex items-center justify-between p-6 bg-background">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
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

      <nav className="hidden md:flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-medium shadow-sm hover:bg-primary/90 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </button>
        <button className="flex items-center gap-2 rounded-full bg-background px-6 py-3 text-foreground font-medium hover:bg-secondary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Tracking
        </button>
        <button className="flex items-center gap-2 rounded-full bg-background px-6 py-3 text-foreground font-medium hover:bg-secondary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Health Report
        </button>
      </nav>
    </header>
  );
}
