"use client"

import { useMemo } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useRecurrenceStore } from "@/store/recurrence-store"
import { generateRecurringDates } from "@/utils/date-utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CalendarPreview() {
  const { recurrenceRule } = useRecurrenceStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const recurringDates = useMemo(() => {
    if (!recurrenceRule.startDate) return []

    const endDate = recurrenceRule.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    return generateRecurringDates(recurrenceRule, endDate)
  }, [recurrenceRule])

  const calendarDates = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const dates = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return dates
  }, [currentMonth])

  const isRecurringDate = (date: Date) => {
    return recurringDates.some((recurringDate) => recurringDate.toDateString() === date.toDateString())
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth()
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1))
      return newDate
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Preview
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDates.map((date, index) => {
          const isRecurring = isRecurringDate(date)
          const isCurrent = isCurrentMonth(date)
          const isTodayDate = isToday(date)

          return (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-md relative
                ${!isCurrent ? "text-gray-300" : "text-gray-900"}
                ${isTodayDate ? "bg-blue-100 text-blue-900 font-medium" : ""}
                ${isRecurring ? "bg-green-100 text-green-900 font-medium" : ""}
                ${isRecurring && isTodayDate ? "bg-green-200 text-green-900" : ""}
              `}
            >
              {date.getDate()}
              {isRecurring && <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full" />}
            </div>
          )
        })}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-green-100 rounded border border-green-200" />
          <span className="text-gray-600">Recurring dates</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-blue-100 rounded border border-blue-200" />
          <span className="text-gray-600">Today</span>
        </div>
      </div>

      {recurringDates.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Next 5 occurrences:</h4>
          <div className="space-y-1">
            {recurringDates.slice(0, 5).map((date, index) => (
              <div key={index} className="text-xs text-gray-600">
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
