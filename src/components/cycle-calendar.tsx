"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

export function CycleCalendar() {
  const [selectedMonth] = useState("October 2025");

  return (
    <Card className="p-6 bg-linear-to-br from-pink-400 via-pink-500 to-pink-600 text-white border-0 shadow-lg">
      <div className="mb-4 text-center">
        <p className="text-sm opacity-90 mb-2">Today, October 14</p>
        <button className="flex items-center justify-center gap-2 text-lg font-semibold cursor-pointer mx-auto">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          {selectedMonth}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Calendar header */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs font-medium opacity-90">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {[...Array(9)].map((_, i) => {
          const day = i + 1
          const isToday = day === 1
          const isHighlighted = day === 2

          return (
            <button
              key={i}
              className={`
                aspect-square rounded-full flex items-center justify-center text-sm font-medium
                transition-all hover:scale-105
                ${isToday ? "bg-white text-pink-600 shadow-md" : ""}
                ${isHighlighted ? "border-2 border-white/60" : ""}
                ${!isToday && !isHighlighted ? "border border-white/30 hover:bg-white/10" : ""}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Cycle info card */}
      <div className="relative bg-white text-gray-900 rounded-3xl p-6 overflow-hidden">
        {/* Decorative leaves */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute left-4 top-4 w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10" />
          </svg>
          <svg className="absolute right-4 bottom-4 w-40 h-40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10" />
          </svg>
        </div>

        <p className="text-center text-sm text-gray-600 mb-2 relative z-10">Today is Cycle Day</p>
        <div className="flex items-center justify-center mb-4 relative z-10">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-pink-400 to-pink-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">21</span>
          </div>
        </div>

        <div className="text-center text-xs text-gray-600 mb-3 relative z-10">
          <span>Avg. Cycle: </span>
          <span className="font-semibold">28 Days</span>
          <span className="mx-2">·</span>
          <span>Currently: </span>
          <span className="font-semibold">78% of 100</span>
        </div>

        <button className="w-fit mx-auto block px-4 py-2 rounded-full border-2 border-pink-500 text-pink-600 text-sm font-medium mb-3 hover:bg-pink-50 transition-colors relative z-10">
          Next Period: <span className="font-semibold">Nov 12 (17 Days)</span>
        </button>

        <p className="text-center text-xs text-gray-500 relative z-10">
          Fertile window starts <span className="font-semibold">Nov 3</span>
        </p>
      </div>
    </Card>
  );
}
