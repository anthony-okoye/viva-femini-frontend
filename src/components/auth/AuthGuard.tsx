"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login" && pathname !== "/register") {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[#2D016C]" />
      </div>
    );
  }

  // If not loading and no user, and not on auth pages, show nothing while redirecting
  if (!user && pathname !== "/login" && pathname !== "/register") {
    return null;
  }

  return <>{children}</>;
};
