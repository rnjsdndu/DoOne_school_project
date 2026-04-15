import { useState } from 'react'
import { SectionCard } from '../components/common/SectionCard'
import { RecordList } from '../components/record/RecordList'
import { useRecordsQuery } from '../features/records/useRecordsQuery'

export function RecordsPage() {
  const [filter, setFilter] = useState('all')
  const { data: records = [] } = useRecordsQuery(filter)

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter)
  }

  return (
    <div className="records-page">
      <div className="tab-row">
        <button
          className={`tab-button${filter === 'all' ? ' is-active' : ''}`}
          onClick={() => handleFilterChange('all')}
          type="button"
        >
          전체
        </button>
        <button
          className={`tab-button${filter === 'success' ? ' is-active' : ''}`}
          onClick={() => handleFilterChange('success')}
          type="button"
        >
          성공
        </button>
        <button
          className={`tab-button${filter === 'fail' ? ' is-active' : ''}`}
          onClick={() => handleFilterChange('fail')}
          type="button"
        >
          실패
        </button>
      </div>
      <SectionCard>
        <RecordList records={records} />
      </SectionCard>
    </div>
  )
}
