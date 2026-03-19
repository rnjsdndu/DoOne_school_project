import { useState } from 'react'
import { SectionCard } from '../components/common/SectionCard'
import { CalendarHeatmap } from '../components/report/CalendarHeatmap'
import { StreakPanel } from '../components/report/StreakPanel'
import { SummaryCards } from '../components/report/SummaryCards'
import {
  useCalendarReportQuery,
  useStreakReportQuery,
  useSummaryReportQuery,
} from '../features/reports/useReportQuery'

function formatMonthDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function ReportsPage() {
  const { data: summary } = useSummaryReportQuery()
  const { data: streak } = useStreakReportQuery()
  const { data: calendar = [] } = useCalendarReportQuery()
  const [showSummary, setShowSummary] = useState(false)
  const currentYear = new Date().getFullYear()
  const dataYears = calendar.map((day) => Number(day.date.slice(0, 4)))
  const minYear = Math.min(...dataYears, currentYear - 1)
  const maxYear = Math.max(...dataYears, currentYear + 1)
  const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  if (!summary || !streak) {
    return null
  }

  const calendarMap = new Map(calendar.map((day) => [day.date, day]))
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
  const filteredCalendar = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const date = formatMonthDate(selectedYear, selectedMonth, day)
    const existingDay = calendarMap.get(date)

    return existingDay ?? { date, label: day, status: 'pending' }
  })

  return (
    <div className="page-stack">
      <SectionCard title="달력 리포트" subtitle="날짜별 성공, 실패, 미기록 상태를 먼저 확인하세요.">
        <div className="report-calendar-stack">
          <CalendarHeatmap
            days={filteredCalendar}
            yearOptions={yearOptions}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
          <button
            aria-expanded={showSummary}
            className="button button--ghost report-more-button"
            onClick={() => setShowSummary((prev) => !prev)}
            type="button"
          >
            {showSummary ? '접기' : '더보기'}
          </button>
          <div className={`report-summary-drawer${showSummary ? ' is-visible' : ''}`}>
            <div className="report-summary-section">
              <p className="summary-card__label">전체 성과</p>
              <SummaryCards summary={summary} />
              <StreakPanel streak={streak} />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
