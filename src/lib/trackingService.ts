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

class TrackingService {
  async getCycleRecords(limit = 12): Promise<CycleRecord[]> {
    const response = await api.get<CycleRecord[]>(`/tracking/cycle-records?limit=${limit}`);
    return response.data;
  }

  async createCycleRecord(data: Partial<CycleRecord>): Promise<CycleRecord> {
    const response = await api.post<CycleRecord>("/tracking/cycle-records", data);
    return response.data;
  }

  async getSymptomLogs(startDate?: string, endDate?: string): Promise<SymptomLog[]> {
    let url = "/tracking/symptom-logs";
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await api.get<SymptomLog[]>(url);
    return response.data;
  }

  async createSymptomLog(data: Partial<SymptomLog>): Promise<SymptomLog> {
    const response = await api.post<SymptomLog>("/tracking/symptom-logs", data);
    return response.data;
  }
}

export const trackingService = new TrackingService();
