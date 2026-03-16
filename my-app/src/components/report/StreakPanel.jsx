export function StreakPanel({ streak }) {
  return (
    <div className="streak-panel">
      <div className="streak-card">
        <p className="summary-card__label">현재 연속 성공</p>
        <strong className="summary-card__value">
          {streak.current}
          <span>일</span>
        </strong>
      </div>
      <div className="streak-card">
        <p className="summary-card__label">최고 기록</p>
        <strong className="summary-card__value">
          {streak.best}
          <span>일</span>
        </strong>
      </div>
    </div>
  )
}
