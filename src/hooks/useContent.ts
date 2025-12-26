import { useDashboard as useDashboardContext } from "@/context/ContentContext";

export function useDashboard() {
  return useDashboardContext();
}

export function useArticles() {
  const { dashboardData, loading } = useDashboardContext();
  return {
    articles: dashboardData?.articles || [],
    loading,
  };
}

export function useQuickActions() {
  const { dashboardData, loading } = useDashboardContext();
  return {
    quickActions: dashboardData?.quickActions || [],
    loading,
  };
}

export function useSymptomCategories() {
  const { dashboardData, loading } = useDashboardContext();
  return {
    symptomCategories: dashboardData?.symptomCategories || [],
    loading,
  };
}

export function useHealthTips() {
  const { dashboardData, loading } = useDashboardContext();
  return {
    healthTips: dashboardData?.healthTips || [],
    loading,
  };
}

export function useCycleHighlights() {
  const { dashboardData, loading } = useDashboardContext();
  return {
    cycleHighlights: dashboardData?.cycleHighlights || [],
    loading,
  };
}

export function useDailyCheckoff() {
  const { dashboardData, loading } = useDashboardContext();
  return {
    dailyCheckoff: dashboardData?.dailyCheckoff || null,
    loading,
  };
}

// Backward compatibility exports
export const useContent = useDashboard;
