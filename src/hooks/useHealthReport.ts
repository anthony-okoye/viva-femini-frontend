// Export context-based hooks
export { useHealthReport } from "@/context/HealthReportContext";

// Individual hooks that use the context
import { useHealthReport as useHealthReportContext } from "@/context/HealthReportContext";

export function useCycleSummary() {
  const { healthReportData, loading } = useHealthReportContext();
  return { 
    cycleSummary: healthReportData?.cycleSummary || null, 
    loading 
  };
}

export function useSymptomFrequency() {
  const { healthReportData, loading } = useHealthReportContext();
  return { 
    frequency: healthReportData?.symptomFrequency || {}, 
    loading 
  };
}

export function useSymptomLogs() {
  const { healthReportData, loading } = useHealthReportContext();
  return { 
    logs: healthReportData?.symptomLogs || [], 
    loading 
  };
}

export function useCycleRecords() {
  const { healthReportData, loading } = useHealthReportContext();
  return { 
    cycleRecords: healthReportData?.cycleRecords || [], 
    loading 
  };
}

export function usePeriodLength() {
  const { healthReportData, loading } = useHealthReportContext();
  return { 
    periodLengthData: healthReportData?.periodLengthData || [], 
    loading 
  };
}
