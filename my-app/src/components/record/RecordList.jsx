export function RecordList({ records }) {
  if (!records.length) {
    return <p className="empty-state">아직 표시할 기록이 없습니다. 오늘 미션을 저장하면 이곳에 쌓입니다.</p>
  }

  return (
    <div className="record-list">
      {records.map((record) => (
        <article className="record-item" key={record.id}>
          <div className="record-item__row">
            <strong className="record-item__title">{record.missionTitle}</strong>
            <span className={`status-badge status-badge--${record.result}`}>
              {record.result === 'success' ? '성공' : '실패'}
            </span>
          </div>
          <p className="record-item__date">{record.date}</p>
          {record.reason ? <p className="record-item__reason">{record.reason}</p> : null}
          {record.emotion ? <p className="record-item__emotion">감정: {record.emotion}</p> : null}
        </article>
      ))}
    </div>
  )
}
