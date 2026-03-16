const filters = [
  { value: 'all', label: '전체' },
  { value: 'success', label: '성공' },
  { value: 'fail', label: '실패' },
]

export function RecordFilterTabs({ activeFilter, onChange }) {
  return (
    <div className="tab-row">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`tab-button${activeFilter === filter.value ? ' is-active' : ''}`}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
