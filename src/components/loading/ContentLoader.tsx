"use client";

import { useContent } from "@/context/ContentContext";
import { AlertCircle, WifiOff } from "lucide-react";

export function ContentLoader({ children }: { children: React.ReactNode }) {
  const { loading, error, isOffline } = useContent();

  if (isOffline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 px-4 py-2">
        <div className="container mx-auto flex items-center justify-center gap-2 text-yellow-800">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">You are offline. Showing cached content.</span>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-50 border-b border-red-200 px-4 py-2">
        <div className="container mx-auto flex items-center justify-center gap-2 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function OfflineIndicator() {
  const { isOffline } = useContent();

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
      <WifiOff className="h-4 w-4" />
      <span className="text-sm font-medium">Offline Mode</span>
    </div>
  );
}
