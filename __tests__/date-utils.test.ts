import { generateRecurringDates, formatRecurrenceRule } from "@/utils/date-utils"
import type { RecurrenceRule } from "@/types/recurrence"

describe("Date Utils", () => {
  describe("generateRecurringDates", () => {
    it("should generate daily recurring dates", () => {
      const rule: RecurrenceRule = {
        type: "daily",
        interval: 1,
        startDate: new Date("2024-01-01"),
      }

      const endDate = new Date("2024-01-05")
      const dates = generateRecurringDates(rule, endDate)

      expect(dates).toHaveLength(5)
      expect(dates[0]).toEqual(new Date("2024-01-01"))
      expect(dates[4]).toEqual(new Date("2024-01-05"))
    })

    it("should generate weekly recurring dates with specific days", () => {
      const rule: RecurrenceRule = {
        type: "weekly",
        interval: 1,
        startDate: new Date("2024-01-01"), // Monday
        weekDays: ["monday", "wednesday", "friday"],
      }

      const endDate = new Date("2024-01-15")
      const dates = generateRecurringDates(rule, endDate)

      // Should include Mon, Wed, Fri of first two weeks
      expect(dates.length).toBeGreaterThan(0)
      dates.forEach((date) => {
        const day = date.getDay()
        expect([1, 3, 5]).toContain(day) // Mon=1, Wed=3, Fri=5
      })
    })

    it("should generate monthly recurring dates", () => {
      const rule: RecurrenceRule = {
        type: "monthly",
        interval: 1,
        startDate: new Date("2024-01-15"),
        monthlyPattern: { type: "date" },
      }

      const endDate = new Date("2024-04-15")
      const dates = generateRecurringDates(rule, endDate)

      expect(dates).toHaveLength(4)
      dates.forEach((date) => {
        expect(date.getDate()).toBe(15)
      })
    })

    it("should generate monthly recurring dates with day pattern", () => {
      const rule: RecurrenceRule = {
        type: "monthly",
        interval: 1,
        startDate: new Date("2024-01-01"),
        monthlyPattern: {
          type: "day",
          ordinal: "second",
          weekDay: "tuesday",
        },
      }

      const endDate = new Date("2024-04-01")
      const dates = generateRecurringDates(rule, endDate)

      dates.forEach((date) => {
        expect(date.getDay()).toBe(2) // Tuesday
      })
    })
  })

  describe("formatRecurrenceRule", () => {
    it("should format daily recurrence", () => {
      const rule: RecurrenceRule = {
        type: "daily",
        interval: 1,
        startDate: new Date("2024-01-01"),
      }

      const formatted = formatRecurrenceRule(rule)
      expect(formatted).toContain("Daily")
      expect(formatted).toContain("starting")
    })

    it("should format weekly recurrence with specific days", () => {
      const rule: RecurrenceRule = {
        type: "weekly",
        interval: 1,
        startDate: new Date("2024-01-01"),
        weekDays: ["monday", "friday"],
      }

      const formatted = formatRecurrenceRule(rule)
      expect(formatted).toContain("Weekly on")
      expect(formatted).toContain("Mon")
      expect(formatted).toContain("Fri")
    })

    it("should format monthly recurrence with day pattern", () => {
      const rule: RecurrenceRule = {
        type: "monthly",
        interval: 1,
        startDate: new Date("2024-01-01"),
        monthlyPattern: {
          type: "day",
          ordinal: "second",
          weekDay: "tuesday",
        },
      }

      const formatted = formatRecurrenceRule(rule)
      expect(formatted).toContain("Monthly on the second Tuesday")
    })
  })
})
