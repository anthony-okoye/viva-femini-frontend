"use client";

import { useAuth } from "@/context/AuthContext";
import { HealthHeader } from "@/components/health-header";
import { CycleCalendar } from "@/components/cycle-calendar";
import { CycleHighlight } from "@/components/cycle-highlight";
import { DailyCheckOffs } from "@/components/daily-check-offs";
import { ReferralCard } from "@/components/referral-card";
import { PregnancyTest } from "@/components/pregnancy-test";
import { QuickActions } from "@/components/quick-actions";
import { RecommendedArticles } from "@/components/recommended-articles";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <HealthHeader />

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <CycleCalendar />
            <ReferralCard />
            <PregnancyTest />
            <QuickActions />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <CycleHighlight />
            <DailyCheckOffs />
            <RecommendedArticles />
          </div>
        </div>
      </main>
    </div>
  );
}
