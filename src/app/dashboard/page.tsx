"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { LogOut, User } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <span className="text-xl font-bold text-[#2D016C]">VivaFemini</span>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700 font-medium">
                {user?.email}
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-[#2D016C]/10 flex items-center justify-center text-[#2D016C]">
              <User size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome back to your workspace</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                Widget {i}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
