"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "@/lib/api";

export interface UserProfile {
  _id: string;
  reference: string;
  firebase_uid: string;
  email: string;
  firstname: string;
  lastname: string;
  profile_url: string | null;
  avgCycleLength: number;
  avgPeriodLength: number;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refetchProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  profile: null,
  loading: true,
  error: null,
  updateProfile: async () => {},
  refetchProfile: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get<UserProfile>("/users/me");
      setProfile(response.data);
    } catch (err: any) {
      console.error("Failed to fetch user profile:", err);
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const response = await api.patch<UserProfile>("/users/me", data);
      setProfile(response.data);
    } catch (err: any) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        error,
        updateProfile,
        refetchProfile: fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
