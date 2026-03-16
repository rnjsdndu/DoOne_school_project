export function SummaryCards({ summary }) {
  const cards = [
    { label: '성공 횟수', value: summary.successCount, suffix: '회' },
    { label: '실패 횟수', value: summary.failCount, suffix: '회' },
    { label: '성공률', value: summary.successRate, suffix: '%' },
  ]

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div key={card.label} className="summary-card">
          <p className="summary-card__label">{card.label}</p>
          <strong className="summary-card__value">
            {card.value}
            <span>{card.suffix}</span>
          </strong>
        </div>
      ))}
    </div>
  )
}
