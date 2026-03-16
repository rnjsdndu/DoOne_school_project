export function CalendarHeatmap({ days }) {
  return (
    <>
      <div className="calendar-legend">
        <span><i className="calendar-dot calendar-dot--success" />성공</span>
        <span><i className="calendar-dot calendar-dot--fail" />실패</span>
        <span><i className="calendar-dot calendar-dot--pending" />미기록</span>
      </div>
      <div className="calendar-grid">
        {days.map((day) => (
          <div key={day.date} className={`calendar-cell calendar-cell--${day.status}`} title={`${day.date} ${day.status}`}>
            <span>{day.label}</span>
          </div>
        ))}
      </div>
    </>
  )
}
