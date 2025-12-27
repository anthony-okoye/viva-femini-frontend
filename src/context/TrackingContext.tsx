"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { trackingService, CycleRecord, SymptomLog } from "@/lib/trackingService";
import { CacheManager } from "@/lib/cacheManager";
import { useAuth } from "./AuthContext";

interface TrackingData {
  cycleRecords: CycleRecord[];
  symptomLogs: SymptomLog[];
}

interface TrackingContextType {
  trackingData: TrackingData | null;
  loading: boolean;
  error: string | null;
  refetchTracking: () => Promise<void>;
}

const TrackingContext = createContext<TrackingContextType>({
  trackingData: null,
  loading: true,
  error: null,
  refetchTracking: async () => {},
});

const TRACKING_CACHE_KEY = "tracking_data";

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch tracking data for tracking page (if needed in future)
      const [cycleRecords, symptomLogs] = await Promise.all([
        trackingService.getCycleRecords(12),
        trackingService.getSymptomLogs(),
      ]);

      const data: TrackingData = {
        cycleRecords,
        symptomLogs,
      };

      setTrackingData(data);
      CacheManager.set(TRACKING_CACHE_KEY, data);
    } catch (err: any) {
      console.error("❌ Failed to fetch tracking data:", err);
      setError(err.message || "Failed to load tracking data");

      // Try to load from cache
      const cachedData = CacheManager.get<TrackingData>(TRACKING_CACHE_KEY);
      if (cachedData) {
        console.log("📦 Loading from cache");
        setTrackingData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // Load from cache immediately for instant UI
      const cachedData = CacheManager.get<TrackingData>(TRACKING_CACHE_KEY);
      if (cachedData) {
        setTrackingData(cachedData);
        setLoading(false);
      }

      // Then fetch fresh data
      fetchTracking();
    } else {
      // Clear cache on logout
      setTrackingData(null);
      setLoading(false);
    }
  }, [user]);

  return (
    <TrackingContext.Provider
      value={{
        trackingData,
        loading,
        error,
        refetchTracking: fetchTracking,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => useContext(TrackingContext);
