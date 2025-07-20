# Task Calendar - Recurring Date Picker

A powerful and flexible recurring date picker component built with Next.js, Tailwind CSS, and Zustand. This component replicates the functionality found in popular task management apps like TickTick.

## 🚀 Features

### Core Functionality
- **Multiple Recurrence Types**: Daily, Weekly, Monthly, and Yearly patterns
- **Flexible Intervals**: Every X days/weeks/months/years
- **Advanced Weekly Options**: Select specific days of the week
- **Complex Monthly Patterns**: 
  - Same date each month (e.g., 15th of every month)
  - Specific day patterns (e.g., "Second Tuesday of every month")
- **Date Range Support**: Required start date with optional end date
- **Visual Calendar Preview**: Interactive calendar showing all recurring dates

### Technical Features
- **Modern Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **State Management**: Zustand for clean and efficient state handling
- **Modular Architecture**: Reusable components with clear separation of concerns
- **Comprehensive Testing**: Unit tests for date logic and integration tests
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone and Install**
   \`\`\`bash
   git clone <your-repo-url>
   cd task-calendar-recurring-picker
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open in Browser**
   Navigate to `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## 📁 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page with demo
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Shadcn/ui components
│   ├── recurring-date-picker.tsx    # Main component
│   ├── recurrence-options.tsx       # Recurrence pattern selector
│   ├── date-range-selector.tsx      # Start/end date picker
│   └── calendar-preview.tsx         # Visual calendar preview
├── store/
│   └── recurrence-store.ts          # Zustand state management
├── types/
│   └── recurrence.ts               # TypeScript type definitions
├── utils/
│   └── date-utils.ts              # Date calculation utilities
└── __tests__/
    ├── date-utils.test.ts         # Unit tests for date logic
    └── recurring-date-picker.test.tsx # Component integration tests
\`\`\`

## 🎯 Usage Examples

### Basic Implementation
\`\`\`tsx
import RecurringDatePicker from '@/components/recurring-date-picker'

export default function MyApp() {
  const handleRecurrenceChange = (recurrence) => {
    console.log('New recurrence rule:', recurrence)
    // Save to database, update UI, etc.
  }

  return (
    <RecurringDatePicker 
      onRecurrenceChange={handleRecurrenceChange}
    />
  )
}
\`\`\`

### Advanced Usage with Custom Styling
\`\`\`tsx
<div className="max-w-4xl mx-auto p-6">
  <RecurringDatePicker 
    onRecurrenceChange={(rule) => {
      // Handle the recurrence rule
      saveRecurrenceRule(rule)
    }}
  />
</div>
\`\`\`

## 🧪 Testing

The project includes comprehensive tests covering:

### Unit Tests
- Date calculation algorithms
- Recurrence pattern generation
- Edge cases and boundary conditions

### Integration Tests  
- Component rendering and interactions
- State management flow
- User workflow scenarios

Run tests with:
\`\`\`bash
npm run test
\`\`\`

## 🎨 Customization

### Styling
The component uses Tailwind CSS and can be easily customized:

\`\`\`tsx
// Modify colors, spacing, etc. in the component files
// Or override with custom CSS classes
\`\`\`

### Extending Functionality
Add new recurrence patterns by:

1. **Update Types**: Add new options to `types/recurrence.ts`
2. **Extend Store**: Add handlers in `store/recurrence-store.ts`  
3. **Update UI**: Modify `components/recurrence-options.tsx`
4. **Add Logic**: Extend `utils/date-utils.ts`

## 🔧 Architecture Decisions

### State Management (Zustand)
- **Why Zustand**: Lightweight, TypeScript-friendly, minimal boilerplate
- **Store Structure**: Single store with focused actions for each feature
- **Benefits**: Easy testing, clear data flow, excellent DevTools support

### Component Architecture
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be used independently
- **Maintainability**: Clear interfaces and well-defined props

### Date Calculations
- **Pure Functions**: All date logic is in pure, testable functions
- **Edge Case Handling**: Comprehensive handling of month boundaries, leap years, etc.
- **Performance**: Efficient algorithms with safeguards against infinite loops

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Other Platforms
The app is a standard Next.js application and can be deployed to any platform supporting Node.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by TickTick's recurring date picker
- Built with modern React patterns and best practices
- Uses shadcn/ui for consistent, accessible components

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Zustand**
