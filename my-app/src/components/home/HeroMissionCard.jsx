const categoryLabelMap = {
  health: '건강',
  study: '공부',
  mind: '마음관리',
}

export function HeroMissionCard({ mission }) {
  const categoryLabel = categoryLabelMap[mission.category] ?? mission.category

  return (
    <section className="hero-card">
      <p className="eyebrow hero-card__eyebrow" lang="en">Today&apos;s mission</p>
      <div className="hero-card__bubble">
        <p className="hero-card__bubble-label">DO가 오늘의 미션을 전해요</p>
        <h2 className="hero-card__title">{mission.title}</h2>
        <p className="hero-card__description">{mission.description}</p>
      </div>
      <div className="hero-card__stage">
        <div className="hero-card__shadow" />
        <div className="hero-card__character" aria-hidden="true">
          <div className="hero-card__face">
            <span className="hero-card__eye" />
            <span className="hero-card__eye" />
            <span className="hero-card__mouth" />
          </div>
          <div className="hero-card__body-mark" lang="en">DO</div>
        </div>
      </div>
      <div className="chip-row hero-card__meta">
        <span className="chip">카테고리 {categoryLabel}</span>
        <span className="chip">예상 {mission.estimateMinutes}분</span>
      </div>
    </section>
  )
}
