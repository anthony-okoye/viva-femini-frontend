import api from "./api";

export interface CycleRecord {
  _id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  cycleLength: number;
  periodLength: number;
  ovulationDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SymptomEntry {
  category: string;
  symptoms: string[];
}

export interface SymptomLog {
  _id: string;
  userId: string;
  date: string;
  symptoms: SymptomEntry[];
  flowIntensity: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SymptomFrequency {
  [category: string]: number;
}

export interface CycleSummary {
  avgCycleLength: number;
  avgPeriodLength: number;
  lastPeriodStart: string | null;
  nextPeriodEstimate: string | null;
  ovulationWindow: {
    start: string;
    end: string;
  } | null;
}

export interface PeriodLength {
  _id: string;
  date: string;
  flowValue: number;
  timestamp: string;
  sequenceOrder: number;
  createdAt: string;
  updatedAt: string;
}

class HealthReportService {
  async getCycleRecords(limit = 12): Promise<CycleRecord[]> {
    const response = await api.get<CycleRecord[]>(`/health-report/cycle-records?limit=${limit}`);
    return response.data;
  }

  async getSymptomLogs(startDate?: string, endDate?: string): Promise<SymptomLog[]> {
    let url = "/health-report/symptom-logs";
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await api.get<SymptomLog[]>(url);
    return response.data;
  }

  async getSymptomFrequency(): Promise<SymptomFrequency> {
    const response = await api.get<SymptomFrequency>("/health-report/symptom-frequency");
    return response.data;
  }

  async getCycleSummary(): Promise<CycleSummary> {
    const response = await api.get<CycleSummary>("/health-report/cycle-summary");
    return response.data;
  }

  async getPeriodLengthData(): Promise<PeriodLength[]> {
    const response = await api.get<PeriodLength[]>("/health-report/period-length");
    return response.data;
  }
}

export const healthReportService = new HealthReportService();
