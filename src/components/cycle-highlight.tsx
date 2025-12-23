"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { TipCard } from "@/components/tip-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const tips = [
  {
    icon: "💧",
    title: "Stay Comfortable",
    description: "On heavy flow days, prioritize comfort. Stay hydrated and use heating pads.",
    action: "Listen to your body",
    colorClass: "blush" as const,
  },
  {
    icon: "🧘",
    title: "Gentle Movement",
    description: "Light stretches and walks can ease discomfort during your cycle.",
    action: "Stay active",
    colorClass: "peach" as const,
  },
  {
    icon: "🛌",
    title: "Rest & Recover",
    description: "Your body works hard. Aim for 8+ hours of sleep and frequent breaks.",
    action: "Prioritize sleep",
    colorClass: "mint" as const,
  },
  {
    icon: "🍵",
    title: "Herbal Teas",
    description: "Ginger or peppermint tea can help soothe cramps and bloating.",
    action: "Soothe naturally",
    colorClass: "blush" as const,
  },
  {
    icon: "🥗",
    title: "Iron-Rich Foods",
    description: "Leafy greens and lentils help replenish iron levels during menstruation.",
    action: "Eat nutritiously",
    colorClass: "peach" as const,
  },
]

export function CycleHighlight() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="space-y-6">
      <Card className="p-6 border-0 shadow-sm flex flex-col items-center overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-2 text-primary">
          Cycle Highlight
        </h2>
        <p className="text-center text-gray-600 text-sm mb-8">Understand your cycle and take care during peak days</p>
        
        <button
          className="mx-auto block px-4 py-2 rounded-lg text-sm font-medium bg-blush text-primary hover:opacity-90 transition-opacity cursor-pointer mb-12"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Day 1 Tip
          </span>
        </button>

        <div className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1 py-10">
              {tips.map((tip, index) => {
                const isActive = current === index
                return (
                  <CarouselItem 
                    key={index} 
                    className="pl-1 basis-[50%] md:basis-[45%] lg:basis-[40%] transition-all duration-500 ease-in-out"
                    style={{
                      transform: isActive ? "scale(1.1)" : "scale(0.75)",
                      opacity: isActive ? 1 : 0.4,
                      zIndex: isActive ? 10 : 0
                    }}
                  >
                    <div className={cn(
                      "h-full transition-all duration-500",
                      isActive ? "font-bold" : "font-normal blur-[1px] grayscale-[0.5]"
                    )}>
                      <TipCard {...tip} />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </Card>
    </div>
  )
}
