"use client"

import { useState } from "react"
import { Calendar, CalendarDays } from "lucide-react"
import { useRecurrenceStore } from "@/store/recurrence-store"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function DateRangeSelector() {
  const { recurrenceRule, updateDateRange } = useRecurrenceStore()
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      updateDateRange({ startDate: date })
      setStartDateOpen(false)
    }
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    updateDateRange({ endDate: date })
    setEndDateOpen(false)
  }

  const clearEndDate = () => {
    updateDateRange({ endDate: undefined })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Date Range</h3>

      <div className="space-y-3">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
          <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !recurrenceRule.startDate && "text-muted-foreground",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {recurrenceRule.startDate ? recurrenceRule.startDate.toLocaleDateString() : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={recurrenceRule.startDate}
                onSelect={handleStartDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
          <div className="flex gap-2">
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start text-left font-normal",
                    !recurrenceRule.endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {recurrenceRule.endDate ? recurrenceRule.endDate.toLocaleDateString() : "Select end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={recurrenceRule.endDate}
                  onSelect={handleEndDateSelect}
                  disabled={(date) => (recurrenceRule.startDate ? date < recurrenceRule.startDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {recurrenceRule.endDate && (
              <Button variant="outline" size="sm" onClick={clearEndDate} className="px-3 bg-transparent">
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
