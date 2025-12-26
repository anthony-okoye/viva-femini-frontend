"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { healthReportService, CycleRecord, SymptomLog, SymptomFrequency, CycleSummary } from "@/lib/healthReportService";
import { CacheManager } from "@/lib/cacheManager";
import { useAuth } from "./AuthContext";

interface HealthReportData {
  cycleRecords: CycleRecord[];
  symptomLogs: SymptomLog[];
  symptomFrequency: SymptomFrequency;
  cycleSummary: CycleSummary | null;
}

interface HealthReportContextType {
  healthReportData: HealthReportData | null;
  loading: boolean;
  error: string | null;
  refetchHealthReport: () => Promise<void>;
}

const HealthReportContext = createContext<HealthReportContextType>({
  healthReportData: null,
  loading: true,
  error: null,
  refetchHealthReport: async () => {},
});

const HEALTH_REPORT_CACHE_KEY = "health_report_data";

export const HealthReportProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [healthReportData, setHealthReportData] = useState<HealthReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthReport = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Fetching health report data...");

      // Fetch all health report data in parallel
      const [cycleRecords, symptomLogs, symptomFrequency, cycleSummary] = await Promise.all([
        healthReportService.getCycleRecords(12),
        healthReportService.getSymptomLogs(),
        healthReportService.getSymptomFrequency(),
        healthReportService.getCycleSummary(),
      ]);

      console.log("✅ Health report data fetched:", {
        cycleRecords: cycleRecords.length,
        symptomLogs: symptomLogs.length,
        symptomFrequency: Object.keys(symptomFrequency).length,
        cycleSummary,
      });

      const data: HealthReportData = {
        cycleRecords,
        symptomLogs,
        symptomFrequency,
        cycleSummary,
      };

      setHealthReportData(data);
      CacheManager.set(HEALTH_REPORT_CACHE_KEY, data);
    } catch (err: any) {
      console.error("❌ Failed to fetch health report data:", err);
      console.error("Error details:", err.response?.data || err.message);
      setError(err.message || "Failed to load health report data");

      // Try to load from cache
      const cachedData = CacheManager.get<HealthReportData>(HEALTH_REPORT_CACHE_KEY);
      if (cachedData) {
        console.log("📦 Loading from cache");
        setHealthReportData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // Load from cache immediately for instant UI
      const cachedData = CacheManager.get<HealthReportData>(HEALTH_REPORT_CACHE_KEY);
      if (cachedData) {
        setHealthReportData(cachedData);
        setLoading(false);
      }

      // Then fetch fresh data
      fetchHealthReport();
    } else {
      // Clear cache on logout
      setHealthReportData(null);
      setLoading(false);
    }
  }, [user]);

  return (
    <HealthReportContext.Provider
      value={{
        healthReportData,
        loading,
        error,
        refetchHealthReport: fetchHealthReport,
      }}
    >
      {children}
    </HealthReportContext.Provider>
  );
};

export const useHealthReport = () => useContext(HealthReportContext);
