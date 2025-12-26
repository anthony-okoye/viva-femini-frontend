import { useContent as useContentContext } from "@/context/ContentContext";

export function useContent() {
  return useContentContext();
}

export function useArticles() {
  const { content, loading } = useContentContext();
  return {
    articles: content?.articles || [],
    loading,
  };
}

export function useQuickActions() {
  const { content, loading } = useContentContext();
  return {
    quickActions: content?.quickActions || [],
    loading,
  };
}

export function useSymptomCategories() {
  const { content, loading } = useContentContext();
  return {
    symptomCategories: content?.symptomCategories || [],
    loading,
  };
}

export function useHealthTips() {
  const { content, loading } = useContentContext();
  return {
    healthTips: content?.healthTips || [],
    loading,
  };
}
