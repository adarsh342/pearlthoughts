import { render, screen, fireEvent } from "@testing-library/react"
import RecurringDatePicker from "@/components/recurring-date-picker"
import jest from "jest" // Declare the jest variable

// Mock Zustand store
jest.mock("@/store/recurrence-store", () => ({
  useRecurrenceStore: () => ({
    recurrenceRule: {
      type: "daily",
      interval: 1,
      startDate: new Date("2024-01-01"),
      endDate: undefined,
      weekDays: [],
      monthlyPattern: { type: "date" },
    },
    resetRecurrence: jest.fn(),
    updateRecurrenceType: jest.fn(),
    updateInterval: jest.fn(),
    updateDateRange: jest.fn(),
    updateWeekDays: jest.fn(),
    updateMonthlyPattern: jest.fn(),
  }),
}))

describe("RecurringDatePicker", () => {
  it("should render all main components", () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText("Configure Recurring Schedule")).toBeInTheDocument()
    expect(screen.getByText("Date Range")).toBeInTheDocument()
    expect(screen.getByText("Recurrence Pattern")).toBeInTheDocument()
    expect(screen.getByText("Preview")).toBeInTheDocument()
  })

  it("should render recurrence type buttons", () => {
    render(<RecurringDatePicker />)

    expect(screen.getByText("Daily")).toBeInTheDocument()
    expect(screen.getByText("Weekly")).toBeInTheDocument()
    expect(screen.getByText("Monthly")).toBeInTheDocument()
    expect(screen.getByText("Yearly")).toBeInTheDocument()
  })

  it("should call onRecurrenceChange when provided", () => {
    const mockCallback = jest.fn()
    render(<RecurringDatePicker onRecurrenceChange={mockCallback} />)

    // The callback should be called with initial state
    expect(mockCallback).toHaveBeenCalled()
  })

  it("should have a reset button", () => {
    render(<RecurringDatePicker />)

    const resetButton = screen.getByText("Reset")
    expect(resetButton).toBeInTheDocument()

    fireEvent.click(resetButton)
    // Reset function should be called (mocked)
  })
})
