"use client"

import { useRecurrenceStore } from "@/store/recurrence-store"
import type { RecurrenceType, WeekDay } from "@/types/recurrence"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const RECURRENCE_TYPES: { value: RecurrenceType; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

const WEEKDAYS: { value: WeekDay; label: string }[] = [
  { value: "sunday", label: "Sun" },
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
]

const ORDINALS = [
  { value: "first", label: "First" },
  { value: "second", label: "Second" },
  { value: "third", label: "Third" },
  { value: "fourth", label: "Fourth" },
  { value: "last", label: "Last" },
]

export default function RecurrenceOptions() {
  const { recurrenceRule, updateRecurrenceType, updateInterval, updateWeekDays, updateMonthlyPattern } =
    useRecurrenceStore()

  const handleTypeChange = (type: RecurrenceType) => {
    updateRecurrenceType(type)
  }

  const handleIntervalChange = (value: string) => {
    const interval = Number.parseInt(value) || 1
    updateInterval(interval)
  }

  const handleWeekDayToggle = (weekDay: WeekDay, checked: boolean) => {
    const currentDays = recurrenceRule.weekDays || []
    const newDays = checked ? [...currentDays, weekDay] : currentDays.filter((day) => day !== weekDay)
    updateWeekDays(newDays)
  }

  const handleMonthlyPatternChange = (pattern: "date" | "day") => {
    updateMonthlyPattern(pattern)
  }

  const handleOrdinalChange = (ordinal: string) => {
    updateMonthlyPattern("day", ordinal as any)
  }

  const handleMonthlyWeekDayChange = (weekDay: WeekDay) => {
    updateMonthlyPattern("day", recurrenceRule.monthlyPattern?.ordinal, weekDay)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Recurrence Pattern</h3>

      {/* Recurrence Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Repeat</label>
        <div className="grid grid-cols-2 gap-2">
          {RECURRENCE_TYPES.map((type) => (
            <Button
              key={type.value}
              variant={recurrenceRule.type === type.value ? "default" : "outline"}
              onClick={() => handleTypeChange(type.value)}
              className="justify-center"
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Interval Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Every</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            max="999"
            value={recurrenceRule.interval}
            onChange={(e) => handleIntervalChange(e.target.value)}
            className="w-20"
          />
          <span className="text-sm text-gray-600">
            {recurrenceRule.type === "daily" && (recurrenceRule.interval === 1 ? "day" : "days")}
            {recurrenceRule.type === "weekly" && (recurrenceRule.interval === 1 ? "week" : "weeks")}
            {recurrenceRule.type === "monthly" && (recurrenceRule.interval === 1 ? "month" : "months")}
            {recurrenceRule.type === "yearly" && (recurrenceRule.interval === 1 ? "year" : "years")}
          </span>
        </div>
      </div>

      {/* Weekly Options */}
      {recurrenceRule.type === "weekly" && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">On these days</label>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((day) => (
              <div key={day.value} className="flex items-center space-x-2">
                <Checkbox
                  id={day.value}
                  checked={recurrenceRule.weekDays?.includes(day.value) || false}
                  onCheckedChange={(checked) => handleWeekDayToggle(day.value, checked as boolean)}
                />
                <label
                  htmlFor={day.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {day.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Options */}
      {recurrenceRule.type === "monthly" && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Monthly Pattern</label>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monthly-date"
                checked={recurrenceRule.monthlyPattern?.type === "date"}
                onCheckedChange={() => handleMonthlyPatternChange("date")}
              />
              <label htmlFor="monthly-date" className="text-sm">
                On the same date each month
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="monthly-day"
                checked={recurrenceRule.monthlyPattern?.type === "day"}
                onCheckedChange={() => handleMonthlyPatternChange("day")}
              />
              <label htmlFor="monthly-day" className="text-sm">
                On a specific day pattern
              </label>
            </div>
          </div>

          {recurrenceRule.monthlyPattern?.type === "day" && (
            <div className="ml-6 space-y-3">
              <div className="flex gap-2">
                <Select value={recurrenceRule.monthlyPattern.ordinal} onValueChange={handleOrdinalChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDINALS.map((ordinal) => (
                      <SelectItem key={ordinal.value} value={ordinal.value}>
                        {ordinal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={recurrenceRule.monthlyPattern.weekDay} onValueChange={handleMonthlyWeekDayChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {WEEKDAYS.map((day) => (
                      <SelectItem key={day.value} value={day.value}>
                        {day.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">e.g., "Second Tuesday of every month"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
