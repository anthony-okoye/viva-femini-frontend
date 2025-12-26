"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { contentService, ContentData } from "@/lib/contentService";
import { CacheManager } from "@/lib/cacheManager";
import { useAuth } from "./AuthContext";

interface DashboardContextType {
  dashboardData: ContentData | null;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
  refetchDashboard: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>({
  dashboardData: null,
  loading: true,
  error: null,
  isOffline: false,
  refetchDashboard: async () => {},
});

const DASHBOARD_CACHE_KEY = "dashboard_data";

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsOffline(false);

      const data = await contentService.getAllContent();
      setDashboardData(data);
      CacheManager.set(DASHBOARD_CACHE_KEY, data);
    } catch (err: any) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err.message || "Failed to load dashboard data");
      setIsOffline(true);

      // Try to load from cache
      const cachedData = CacheManager.get<ContentData>(DASHBOARD_CACHE_KEY);
      if (cachedData) {
        setDashboardData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // Load from cache immediately for instant UI
      const cachedData = CacheManager.get<ContentData>(DASHBOARD_CACHE_KEY);
      if (cachedData) {
        setDashboardData(cachedData);
        setLoading(false);
      }

      // Then fetch fresh data
      fetchDashboard();
    } else {
      // Clear cache on logout
      CacheManager.clear();
      setDashboardData(null);
      setLoading(false);
    }
  }, [user]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (user) {
        fetchDashboard();
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [user]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        loading,
        error,
        isOffline,
        refetchDashboard: fetchDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
