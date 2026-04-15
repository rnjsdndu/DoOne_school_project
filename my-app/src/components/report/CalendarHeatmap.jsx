import { useMemo } from 'react'

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function pad2(value) {
  return String(value).padStart(2, '0')
}

function toDateKey(year, month, day) {
  return `${year}-${pad2(month)}-${pad2(day)}`
}

function formatMonthLabel(year, month) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, 1))
}

function getTodayKey() {
  const today = new Date()
  return toDateKey(today.getFullYear(), today.getMonth() + 1, today.getDate())
}

function buildMonthGrid(year, month, dayMap) {
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  const leadingEmptyCells = firstDayOfMonth.getDay()
  const cells = []

  for (let index = 0; index < leadingEmptyCells; index += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = toDateKey(year, month, day)
    const source = dayMap.get(date)
    const status = source?.status === 'success' || source?.status === 'fail' ? source.status : 'pending'

    cells.push({
      date,
      label: day,
      status,
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  const weeks = []
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7))
  }

  return { weeks }
}

export function CalendarHeatmap({
  days = [],
  yearOptions = [],
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) {
  const todayKey = useMemo(() => getTodayKey(), [])
  const monthLabel = useMemo(() => formatMonthLabel(selectedYear, selectedMonth), [selectedMonth, selectedYear])
  const normalizedYearOptions = useMemo(() => {
    const uniqueYears = new Set([...yearOptions, selectedYear])
    return Array.from(uniqueYears).sort((a, b) => a - b)
  }, [selectedYear, yearOptions])
  const dayMap = useMemo(() => new Map(days.map((day) => [day.date, day])), [days])
  const { weeks } = useMemo(
    () => buildMonthGrid(selectedYear, selectedMonth, dayMap),
    [dayMap, selectedMonth, selectedYear],
  )

  return (
    <section className="calendar-panel" aria-label="리포트 달력">
      <div className="calendar-header">
        <div>
          <p className="summary-card__label">달력</p>
          <strong className="calendar-header__month">{monthLabel}</strong>
        </div>
        <div className="calendar-controls">
          <select
            aria-label="년도 선택"
            value={selectedYear}
            onChange={(event) => onYearChange(Number(event.target.value))}
          >
            {normalizedYearOptions.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select
            aria-label="월 선택"
            value={selectedMonth}
            onChange={(event) => onMonthChange(Number(event.target.value))}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calendar-legend" aria-label="달력 범례">
        <span>
          <i className="calendar-dot calendar-dot--success" />
          성공
        </span>
        <span>
          <i className="calendar-dot calendar-dot--fail" />
          실패
        </span>
        <span>
          <i className="calendar-dot calendar-dot--pending" />
          미기록
        </span>
      </div>

      <div className="calendar-table" role="grid" aria-label={`${monthLabel} 달력`}>
        <div className="calendar-weekdays" role="row">
          {WEEKDAY_LABELS.map((label) => (
            <span key={label} className="calendar-weekday" role="columnheader">
              {label}
            </span>
          ))}
        </div>

        <div className="calendar-weeks">
          {weeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="calendar-week" role="row">
              {week.map((day, dayIndex) =>
                day ? (
                  <div
                    key={day.date}
                    aria-label={`${day.date} ${day.status === 'success' ? '성공' : day.status === 'fail' ? '실패' : '미기록'}`}
                    className={`calendar-cell calendar-cell--${day.status}${day.date === todayKey ? ' is-today' : ''}`}
                    role="gridcell"
                    title={`${day.date} ${day.status}`}
                  >
                    <span className="calendar-cell__date">{day.label}</span>
                  </div>
                ) : (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    aria-hidden="true"
                    className="calendar-cell calendar-cell--empty"
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
