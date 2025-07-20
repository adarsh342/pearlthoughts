import { create } from "zustand"
import type { RecurrenceRule, RecurrenceType, WeekDay } from "@/types/recurrence"

interface RecurrenceState {
  recurrenceRule: RecurrenceRule
  updateRecurrenceType: (type: RecurrenceType) => void
  updateInterval: (interval: number) => void
  updateDateRange: (dates: { startDate?: Date; endDate?: Date }) => void
  updateWeekDays: (weekDays: WeekDay[]) => void
  updateMonthlyPattern: (
    type: "date" | "day",
    ordinal?: "first" | "second" | "third" | "fourth" | "last",
    weekDay?: WeekDay,
  ) => void
  resetRecurrence: () => void
}

const initialState: RecurrenceRule = {
  type: "daily",
  interval: 1,
  startDate: new Date(),
  endDate: undefined,
  weekDays: [],
  monthlyPattern: {
    type: "date",
  },
}

export const useRecurrenceStore = create<RecurrenceState>((set) => ({
  recurrenceRule: initialState,

  updateRecurrenceType: (type) =>
    set((state) => ({
      recurrenceRule: {
        ...state.recurrenceRule,
        type,
        // Reset type-specific options when changing type
        weekDays: type === "weekly" ? state.recurrenceRule.weekDays : [],
        monthlyPattern: type === "monthly" ? state.recurrenceRule.monthlyPattern : { type: "date" },
      },
    })),

  updateInterval: (interval) =>
    set((state) => ({
      recurrenceRule: {
        ...state.recurrenceRule,
        interval: Math.max(1, interval),
      },
    })),

  updateDateRange: (dates) =>
    set((state) => ({
      recurrenceRule: {
        ...state.recurrenceRule,
        ...dates,
      },
    })),

  updateWeekDays: (weekDays) =>
    set((state) => ({
      recurrenceRule: {
        ...state.recurrenceRule,
        weekDays,
      },
    })),

  updateMonthlyPattern: (type, ordinal, weekDay) =>
    set((state) => ({
      recurrenceRule: {
        ...state.recurrenceRule,
        monthlyPattern: {
          type,
          ...(type === "day" && { ordinal, weekDay }),
        },
      },
    })),

  resetRecurrence: () =>
    set(() => ({
      recurrenceRule: { ...initialState, startDate: new Date() },
    })),
}))
