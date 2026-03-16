export function HeroMissionCard({ mission }) {
  return (
    <section className="hero-card">
      <p className="eyebrow hero-card__eyebrow">Today&apos;s mission</p>
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
          <div className="hero-card__body-mark">DO</div>
        </div>
      </div>
      <div className="chip-row hero-card__meta">
        <span className="chip">카테고리 {mission.category}</span>
        <span className="chip">{mission.estimateMinutes}분 예상</span>
      </div>
    </section>
  )
}
