"use client";

import { Card } from "@/components/ui/card";
import { useQuickActions } from "@/hooks/useContent";
import { SkeletonQuickAction } from "@/components/loading/SkeletonCard";
import { useRouter } from "next/navigation";
import Logsymptoms from "@/assets/pajamas_status-health.svg";
import Logperiod from "@/assets/hugeicons_blood.svg";
import Healthreport from "@/assets/gravity-ui_stethoscope.svg";

const iconMap: Record<string, any> = {
  "pajamas_status-health": Logsymptoms,
  "hugeicons_blood": Logperiod,
  "gravity-ui_stethoscope": Healthreport,
};

export function QuickActions() {
  const { quickActions, loading } = useQuickActions();
  const router = useRouter();

  return (
    <Card className="p-5 border-0 shadow-sm">
      <h3 className="font-semibold text-primary mb-4">Quick Action</h3>

      <div className="flex gap-3 flex-wrap sm:flex-nowrap">
        {loading ? (
          <>
            <SkeletonQuickAction />
            <SkeletonQuickAction />
            <SkeletonQuickAction />
          </>
        ) : (
          quickActions.map((action) => {
            const IconComponent = iconMap[action.icon];
            return (
              <button
                key={action._id}
                onClick={() => router.push(action.route)}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gray-100 text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {IconComponent && <IconComponent />}
                </div>
                <span className="text-black text-xs sm:text-sm whitespace-nowrap">{action.label}</span>
              </button>
            );
          })
        )}
      </div>
    </Card>
  );
}
