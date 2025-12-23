import { Card } from "@/components/ui/card"
import Logsymptoms from "@/assets/pajamas_status-health.svg";
import Logperiod from "@/assets/hugeicons_blood.svg";
import Healthreport from "@/assets/gravity-ui_stethoscope.svg";

export function QuickActions() {
  return (
    <Card className="p-5 border-0 shadow-sm overflow-x-auto">
      <h3 className="font-semibold text-primary mb-4">Quick Action</h3>

      <div className="flex gap-3 min-w-max sm:min-w-0">
        <button className="flex-1 flex items-center gap-2 px-4 py-1 rounded-xl bg-gray-100 text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            <Logsymptoms/>
          </div>
          <span className="text-black whitespace-nowrap">Log symptoms</span>
        </button>

        <button className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            <Logperiod/>
          </div>
          <span className="text-black whitespace-nowrap">Log period</span>
        </button>

        <button className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            <Healthreport/>
          </div>
          <span className="text-black whitespace-nowrap">Health Report</span>
        </button>
      </div>
    </Card>
  )
}
