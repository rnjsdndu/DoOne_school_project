export function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className="section-card">
      {title ? (
        <div className="section-card__header">
          <div>
            <h2 className="section-card__title">{title}</h2>
            {subtitle ? <p className="section-card__subtitle">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className="section-card__body">{children}</div>
    </section>
  )
}
