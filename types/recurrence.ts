export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly"

export type WeekDay = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"

export interface MonthlyPattern {
  type: "date" | "day"
  ordinal?: "first" | "second" | "third" | "fourth" | "last"
  weekDay?: WeekDay
}

export interface RecurrenceRule {
  type: RecurrenceType
  interval: number
  startDate: Date
  endDate?: Date
  weekDays?: WeekDay[]
  monthlyPattern?: MonthlyPattern
}
