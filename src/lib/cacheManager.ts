const CACHE_PREFIX = "vitalflow_cache_";

export class CacheManager {
  static set(key: string, data: any): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Cache set error:", error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(CACHE_PREFIX + key);
      if (!cached) return null;

      const { data } = JSON.parse(cached);
      return data as T;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(CACHE_PREFIX + key);
    } catch (error) {
      console.error("Cache remove error:", error);
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Cache clear error:", error);
    }
  }

  static has(key: string): boolean {
    return localStorage.getItem(CACHE_PREFIX + key) !== null;
  }
}
