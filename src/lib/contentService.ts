import api from "./api";

export type SymptomColor = "pink" | "red" | "purple" | "yellow" | "blue";

export interface Symptom {
  id: string;
  label: string;
  emoji: string;
  color: SymptomColor;
  description?: string;
}

export interface SymptomCategory {
  _id: string;
  category: string;
  symptoms: Symptom[];
  order: number;
  isActive: boolean;
}

export interface Article {
  _id: string;
  title: string;
  image: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags: string[];
  order: number;
  isActive: boolean;
}

export interface QuickAction {
  _id: string;
  label: string;
  icon: string;
  route: string;
  color?: string;
  order: number;
  isActive: boolean;
}

export interface HealthTip {
  _id: string;
  title: string;
  content: string;
  category?: string;
  conditions: string[];
  priority: number;
  isActive: boolean;
}

export interface CycleHighlight {
  _id: string;
  icon: string;
  title: string;
  description: string;
  action: string;
  colorClass: "blush" | "peach" | "mint";
  order: number;
  isActive: boolean;
}

export interface DailyCheckoff {
  _id: string;
  userId: string;
  date: string;
  symptoms: string;
  healthReport: string;
  trendSymptom: string;
  trendIntensity: string;
}

export interface ContentData {
  articles: Article[];
  quickActions: QuickAction[];
  symptomCategories: SymptomCategory[];
  healthTips: HealthTip[];
  cycleHighlights: CycleHighlight[];
  dailyCheckoff?: DailyCheckoff;
}

class ContentService {
  async getAllContent(): Promise<ContentData> {
    const response = await api.get<ContentData>("/content");
    return response.data;
  }

  async getArticles(): Promise<Article[]> {
    const response = await api.get<Article[]>("/content/articles");
    return response.data;
  }

  async getQuickActions(): Promise<QuickAction[]> {
    const response = await api.get<QuickAction[]>("/content/quick-actions");
    return response.data;
  }

  async getSymptomCategories(): Promise<SymptomCategory[]> {
    const response = await api.get<SymptomCategory[]>("/content/symptom-categories");
    return response.data;
  }

  async getHealthTips(): Promise<HealthTip[]> {
    const response = await api.get<HealthTip[]>("/content/health-tips");
    return response.data;
  }

  async getCycleHighlights(): Promise<CycleHighlight[]> {
    const response = await api.get<CycleHighlight[]>("/content/cycle-highlights");
    return response.data;
  }

  async getDailyCheckoff(): Promise<DailyCheckoff | null> {
    const response = await api.get<DailyCheckoff>("/content/daily-checkoff");
    return response.data;
  }
}

export const contentService = new ContentService();
