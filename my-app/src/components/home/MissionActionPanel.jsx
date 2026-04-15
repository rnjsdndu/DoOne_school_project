import { useState } from 'react'

export function MissionActionPanel({ onSuccess, onFail, isLocked }) {
  const [emotion, setEmotion] = useState('tired')
  const [reason, setReason] = useState('')
  const [isFailMode, setIsFailMode] = useState(false)

  const handleFail = () => {
    if (!reason.trim()) {
      return
    }

    onFail({ emotion, reason })
  }

  return (
    <div className="action-panel">
      <p className="section-note">오늘 미션을 못했다면 바로 실패로 기록하고, 이유를 남겨 흐름을 추적하세요.</p>
      <div className="button-row">
        <button className="button button--primary" onClick={onSuccess} disabled={isLocked}>
          성공
        </button>
        <button
          className="button button--secondary"
          onClick={() => setIsFailMode((prev) => !prev)}
          disabled={isLocked}
        >
          실패
        </button>
      </div>

      {isFailMode ? (
        <div className="fail-form">
          <label>
            <span className="field-label">감정</span>
            <select value={emotion} onChange={(event) => setEmotion(event.target.value)}>
              <option value="tired">지침</option>
              <option value="anxious">불안</option>
              <option value="distracted">산만</option>
              <option value="frustrated">답답함</option>
            </select>
          </label>
          <label>
            <span className="field-label">실패 이유</span>
            <textarea
              rows="4"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="오늘 실행하지 못한 이유를 적어주세요."
            />
          </label>
          <button className="button button--danger" onClick={handleFail} disabled={isLocked}>
            실패 기록 저장
          </button>
        </div>
      ) : null}
    </div>
  )
}
