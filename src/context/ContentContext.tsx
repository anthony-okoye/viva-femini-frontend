"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { contentService, ContentData } from "@/lib/contentService";
import { CacheManager } from "@/lib/cacheManager";
import { useAuth } from "./AuthContext";

interface ContentContextType {
  content: ContentData | null;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
  refetchContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  content: null,
  loading: true,
  error: null,
  isOffline: false,
  refetchContent: async () => {},
});

const CONTENT_CACHE_KEY = "app_content";

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsOffline(false);

      const data = await contentService.getAllContent();
      setContent(data);
      CacheManager.set(CONTENT_CACHE_KEY, data);
    } catch (err: any) {
      console.error("Failed to fetch content:", err);
      setError(err.message || "Failed to load content");
      setIsOffline(true);

      // Try to load from cache
      const cachedContent = CacheManager.get<ContentData>(CONTENT_CACHE_KEY);
      if (cachedContent) {
        setContent(cachedContent);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // Load from cache immediately for instant UI
      const cachedContent = CacheManager.get<ContentData>(CONTENT_CACHE_KEY);
      if (cachedContent) {
        setContent(cachedContent);
        setLoading(false);
      }

      // Then fetch fresh data
      fetchContent();
    } else {
      // Clear cache on logout
      CacheManager.clear();
      setContent(null);
      setLoading(false);
    }
  }, [user]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (user) {
        fetchContent();
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [user]);

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        error,
        isOffline,
        refetchContent: fetchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
