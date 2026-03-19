const weekDays = ['일', '월', '화', '수', '목', '금', '토']

export function CalendarHeatmap({ days, yearOptions, selectedYear, selectedMonth, onYearChange, onMonthChange }) {
  if (!days.length) {
    return null
  }

  const today = new Date()
  const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const firstDate = new Date(`${days[0].date}T00:00:00`)
  const lastDate = new Date(`${days[days.length - 1].date}T00:00:00`)
  const monthLabel = `${firstDate.getFullYear()}년 ${firstDate.getMonth() + 1}월`
  const leadingEmptyCells = firstDate.getDay()
  const trailingEmptyCells = 6 - lastDate.getDay()
  const calendarCells = [
    ...Array.from({ length: leadingEmptyCells }, (_, index) => ({ id: `leading-${index}`, isEmpty: true })),
    ...days.map((day) => ({ ...day, id: day.date, isEmpty: false })),
    ...Array.from({ length: trailingEmptyCells }, (_, index) => ({ id: `trailing-${index}`, isEmpty: true })),
  ]
  const weeks = []

  for (let index = 0; index < calendarCells.length; index += 7) {
    weeks.push(calendarCells.slice(index, index + 7))
  }

  return (
    <div className="calendar-panel">
      <div className="calendar-header">
        <strong className="calendar-header__month">{monthLabel}</strong>
        <div className="calendar-controls">
          <select aria-label="년도 선택" value={selectedYear} onChange={(event) => onYearChange(Number(event.target.value))}>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <select aria-label="월 선택" value={selectedMonth} onChange={(event) => onMonthChange(Number(event.target.value))}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="calendar-legend">
        <span><i className="calendar-dot calendar-dot--success" />성공</span>
        <span><i className="calendar-dot calendar-dot--fail" />실패</span>
        <span><i className="calendar-dot calendar-dot--pending" />미기록</span>
      </div>
      <div className="calendar-table" role="grid" aria-label={`${monthLabel} 루틴 달력`}>
        <div className="calendar-weekdays" role="row">
          {weekDays.map((day) => (
            <span key={day} className="calendar-weekday" role="columnheader">
              {day}
            </span>
          ))}
        </div>
        <div className="calendar-weeks">
          {weeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="calendar-week" role="row">
              {week.map((day) =>
                day.isEmpty ? (
                  <div key={day.id} className="calendar-cell calendar-cell--empty" aria-hidden="true" />
                ) : (
                  <div
                    key={day.id}
                    className={`calendar-cell calendar-cell--${day.status}${day.date === todayDate ? ' is-today' : ''}`}
                    role="gridcell"
                    title={`${day.date} ${day.status}`}
                  >
                    <div className="calendar-cell__top">
                      <span className="calendar-cell__date">{day.label}</span>
                    </div>
                    <i className={`calendar-cell__marker calendar-cell__marker--${day.status}`} aria-hidden="true" />
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
