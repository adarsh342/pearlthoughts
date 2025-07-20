import type { RecurrenceRule, WeekDay } from "@/types/recurrence"

const WEEKDAY_MAP: Record<WeekDay, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

/**
 * Generate recurring dates based on the recurrence rule
 */
export function generateRecurringDates(rule: RecurrenceRule, endDate: Date): Date[] {
  if (!rule.startDate) return []

  const dates: Date[] = []
  const maxDates = 100 // Limit to prevent infinite loops
  let currentDate = new Date(rule.startDate)
  const finalEndDate = rule.endDate || endDate

  while (dates.length < maxDates && currentDate <= finalEndDate) {
    dates.push(new Date(currentDate))
    currentDate = getNextRecurrenceDate(currentDate, rule)

    // Safety check to prevent infinite loops
    if (currentDate.getTime() === dates[dates.length - 1]?.getTime()) {
      break
    }
  }

  return dates.filter((date) => date <= finalEndDate)
}

/**
 * Get the next occurrence date based on recurrence rule
 */
function getNextRecurrenceDate(currentDate: Date, rule: RecurrenceRule): Date {
  const nextDate = new Date(currentDate)

  switch (rule.type) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + rule.interval)
      break

    case "weekly":
      if (rule.weekDays && rule.weekDays.length > 0) {
        return getNextWeeklyDate(nextDate, rule)
      } else {
        nextDate.setDate(nextDate.getDate() + 7 * rule.interval)
      }
      break

    case "monthly":
      if (rule.monthlyPattern?.type === "day") {
        return getNextMonthlyDayDate(nextDate, rule)
      } else {
        nextDate.setMonth(nextDate.getMonth() + rule.interval)
      }
      break

    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + rule.interval)
      break
  }

  return nextDate
}

/**
 * Get next weekly occurrence based on selected weekdays
 */
function getNextWeeklyDate(currentDate: Date, rule: RecurrenceRule): Date {
  if (!rule.weekDays || rule.weekDays.length === 0) {
    const nextDate = new Date(currentDate)
    nextDate.setDate(nextDate.getDate() + 7 * rule.interval)
    return nextDate
  }

  const sortedWeekDays = rule.weekDays.map((day) => WEEKDAY_MAP[day]).sort((a, b) => a - b)

  const currentWeekDay = currentDate.getDay()
  const nextDate = new Date(currentDate)

  // Find next weekday in current week
  const nextWeekDay = sortedWeekDays.find((day) => day > currentWeekDay)

  if (nextWeekDay !== undefined) {
    // Next occurrence is in the same week
    nextDate.setDate(nextDate.getDate() + (nextWeekDay - currentWeekDay))
  } else {
    // Move to next interval and use first weekday
    const daysToAdd = 7 * rule.interval - currentWeekDay + sortedWeekDays[0]
    nextDate.setDate(nextDate.getDate() + daysToAdd)
  }

  return nextDate
}

/**
 * Get next monthly occurrence based on day pattern (e.g., "second Tuesday")
 */
function getNextMonthlyDayDate(currentDate: Date, rule: RecurrenceRule): Date {
  if (!rule.monthlyPattern?.ordinal || !rule.monthlyPattern?.weekDay) {
    const nextDate = new Date(currentDate)
    nextDate.setMonth(nextDate.getMonth() + rule.interval)
    return nextDate
  }

  const nextDate = new Date(currentDate)
  nextDate.setMonth(nextDate.getMonth() + rule.interval)

  return getNthWeekdayOfMonth(
    nextDate.getFullYear(),
    nextDate.getMonth(),
    rule.monthlyPattern.ordinal,
    rule.monthlyPattern.weekDay,
  )
}

/**
 * Get the nth occurrence of a weekday in a month
 */
function getNthWeekdayOfMonth(
  year: number,
  month: number,
  ordinal: "first" | "second" | "third" | "fourth" | "last",
  weekDay: WeekDay,
): Date {
  const targetWeekDay = WEEKDAY_MAP[weekDay]

  if (ordinal === "last") {
    // Start from the last day of the month and work backwards
    const lastDay = new Date(year, month + 1, 0)
    while (lastDay.getDay() !== targetWeekDay) {
      lastDay.setDate(lastDay.getDate() - 1)
    }
    return lastDay
  }

  // Find the first occurrence of the weekday
  const firstDay = new Date(year, month, 1)
  const daysToAdd = (targetWeekDay - firstDay.getDay() + 7) % 7
  const firstOccurrence = new Date(year, month, 1 + daysToAdd)

  // Add weeks based on ordinal
  const ordinalMap = { first: 0, second: 1, third: 2, fourth: 3 }
  const weeksToAdd = ordinalMap[ordinal]

  firstOccurrence.setDate(firstOccurrence.getDate() + weeksToAdd * 7)

  // Check if the date is still in the same month
  if (firstOccurrence.getMonth() !== month) {
    // If we've gone to the next month, return the last occurrence instead
    return getNthWeekdayOfMonth(year, month, "last", weekDay)
  }

  return firstOccurrence
}

/**
 * Format recurrence rule as human-readable string
 */
export function formatRecurrenceRule(rule: RecurrenceRule): string {
  if (!rule.startDate) return "No recurrence set"

  const parts: string[] = []

  // Base frequency
  switch (rule.type) {
    case "daily":
      parts.push(rule.interval === 1 ? "Daily" : `Every ${rule.interval} days`)
      break
    case "weekly":
      if (rule.weekDays && rule.weekDays.length > 0) {
        const dayNames = rule.weekDays.map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3)).join(", ")
        parts.push(rule.interval === 1 ? `Weekly on ${dayNames}` : `Every ${rule.interval} weeks on ${dayNames}`)
      } else {
        parts.push(rule.interval === 1 ? "Weekly" : `Every ${rule.interval} weeks`)
      }
      break
    case "monthly":
      if (rule.monthlyPattern?.type === "day" && rule.monthlyPattern.ordinal && rule.monthlyPattern.weekDay) {
        const ordinal = rule.monthlyPattern.ordinal
        const weekDay = rule.monthlyPattern.weekDay.charAt(0).toUpperCase() + rule.monthlyPattern.weekDay.slice(1)
        parts.push(
          rule.interval === 1
            ? `Monthly on the ${ordinal} ${weekDay}`
            : `Every ${rule.interval} months on the ${ordinal} ${weekDay}`,
        )
      } else {
        parts.push(rule.interval === 1 ? "Monthly" : `Every ${rule.interval} months`)
      }
      break
    case "yearly":
      parts.push(rule.interval === 1 ? "Yearly" : `Every ${rule.interval} years`)
      break
  }

  // Date range
  parts.push(`starting ${rule.startDate.toLocaleDateString()}`)
  if (rule.endDate) {
    parts.push(`until ${rule.endDate.toLocaleDateString()}`)
  }

  return parts.join(" ")
}
