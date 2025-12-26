"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useSymptomCategories } from "@/hooks/useContent"
import { HealthHeader } from "@/components/health-header"
import { WelcomeCard } from "@/components/welcome-card"
import { SymptomSection } from "@/components/symptom-section"
import { FlowIntensitySlider } from "@/components/flow-intensity-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"
import { SkeletonCard, SkeletonText } from "@/components/loading/SkeletonCard"

export default function TrackingPage() {
  const { user } = useAuth()
  const { symptomCategories, loading } = useSymptomCategories()
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, string[]>>({})
  const [flowIntensity, setFlowIntensity] = useState(3)
  const [notes, setNotes] = useState("")

  const toggleSymptom = (category: string, symptomId: string) => {
    setSelectedSymptoms((prev) => {
      const categorySymptoms = prev[category] || []
      if (categorySymptoms.includes(symptomId)) {
        return {
          ...prev,
          [category]: categorySymptoms.filter((id) => id !== symptomId),
        }
      } else {
        return {
          ...prev,
          [category]: [...categorySymptoms, symptomId],
        }
      }
    })
  }

  const getCategoryByName = (name: string) => {
    return symptomCategories.find((cat) => cat.category === name)
  }

  const physicalPainCategory = getCategoryByName("Physical Pain")
  const moodCategory = getCategoryByName("Mood & Mental")
  const periodIndicatorsCategory = getCategoryByName("Period Indicators")
  const sexualHealthCategory = getCategoryByName("Sexual Health")

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HealthHeader />
        <main className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <SkeletonCard className="h-32" />
              <SkeletonCard className="h-64" />
              <SkeletonCard className="h-64" />
            </div>
            <div className="space-y-6">
              <SkeletonCard className="h-96" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <WelcomeCard />

            {/* Period Indicators */}
            {periodIndicatorsCategory && (
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <SymptomSection
                    title={periodIndicatorsCategory.category}
                    symptoms={periodIndicatorsCategory.symptoms}
                    selectedSymptoms={selectedSymptoms[periodIndicatorsCategory.category] || []}
                    onToggle={(id) => toggleSymptom(periodIndicatorsCategory.category, id)}
                  />
                </CardContent>
              </Card>
            )}

            {/* Sexual Health */}
            {sexualHealthCategory && (
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <SymptomSection
                    title={sexualHealthCategory.category}
                    symptoms={sexualHealthCategory.symptoms}
                    selectedSymptoms={selectedSymptoms[sexualHealthCategory.category] || []}
                    onToggle={(id) => toggleSymptom(sexualHealthCategory.category, id)}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardContent className="p-6 space-y-6">
                {/* Physical Pain */}
                {physicalPainCategory && (
                  <SymptomSection
                    title={physicalPainCategory.category}
                    symptoms={physicalPainCategory.symptoms}
                    selectedSymptoms={selectedSymptoms[physicalPainCategory.category] || []}
                    onToggle={(id) => toggleSymptom(physicalPainCategory.category, id)}
                  />
                )}

                {/* Mood & Mental */}
                {moodCategory && (
                  <SymptomSection
                    title={moodCategory.category}
                    symptoms={moodCategory.symptoms}
                    selectedSymptoms={selectedSymptoms[moodCategory.category] || []}
                    onToggle={(id) => toggleSymptom(moodCategory.category, id)}
                  />
                )}

                {/* Flow Intensity */}
                <FlowIntensitySlider value={flowIntensity} onChange={setFlowIntensity} />

                {/* Notes */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                    <span className="text-gray-400">📝</span>
                    Notes
                  </h3>
                  <Textarea
                    placeholder="Inputting Note"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] resize-none border-gray-200"
                  />
                </div>

                {/* Save Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-full text-base font-semibold">
                  Save <Check className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
