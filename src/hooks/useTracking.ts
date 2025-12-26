// Export context-based hooks
export { useTracking } from "@/context/TrackingContext";

// Individual hooks that use the context
import { useTracking as useTrackingContext } from "@/context/TrackingContext";

export function useCycleRecords() {
  const { trackingData, loading } = useTrackingContext();
  return { 
    cycleRecords: trackingData?.cycleRecords || [], 
    loading 
  };
}

export function useSymptomLogs() {
  const { trackingData, loading } = useTrackingContext();
  return { 
    logs: trackingData?.symptomLogs || [], 
    loading 
  };
}
