"use client"

import React from "react"

import { useRecurrenceStore } from "@/store/recurrence-store"
import RecurrenceOptions from "./recurrence-options"
import DateRangeSelector from "./date-range-selector"
import CalendarPreview from "./calendar-preview"
import type { RecurrenceRule } from "@/types/recurrence"

interface RecurringDatePickerProps {
  onRecurrenceChange?: (recurrence: RecurrenceRule) => void
}

export default function RecurringDatePicker({ onRecurrenceChange }: RecurringDatePickerProps) {
  const { recurrenceRule, resetRecurrence } = useRecurrenceStore()

  const handleReset = () => {
    resetRecurrence()
  }

  // Notify parent component of changes
  React.useEffect(() => {
    if (onRecurrenceChange) {
      onRecurrenceChange(recurrenceRule)
    }
  }, [recurrenceRule, onRecurrenceChange])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Configure Recurring Schedule</h2>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DateRangeSelector />
          <RecurrenceOptions />
        </div>

        <div className="lg:sticky lg:top-6">
          <CalendarPreview />
        </div>
      </div>
    </div>
  )
}
