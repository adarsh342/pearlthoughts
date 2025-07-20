"use client"
import RecurringDatePicker from "@/components/recurring-date-picker"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Calendar - Recurring Date Picker</h1>
          <p className="text-gray-600 mb-8">A powerful recurring date picker component similar to TickTick app</p>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <RecurringDatePicker
              onRecurrenceChange={(recurrence) => {
                console.log("Recurrence changed:", recurrence)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
