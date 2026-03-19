import { useState } from 'react'
import { SectionCard } from '../components/common/SectionCard'
import { RecordFilterTabs } from '../components/record/RecordFilterTabs'
import { RecordList } from '../components/record/RecordList'
import { useRecordsQuery } from '../features/records/useRecordsQuery'

const INITIAL_VISIBLE_COUNT = 4

export function RecordsPage() {
  const [filter, setFilter] = useState('all')
  const { data: records = [] } = useRecordsQuery(filter)
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleRecords = isExpanded ? records : records.slice(0, INITIAL_VISIBLE_COUNT)
  const canExpand = records.length > INITIAL_VISIBLE_COUNT

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter)
    setIsExpanded(false)
  }

  return (
    <div className="page-stack">
      <SectionCard title="기록 목록" subtitle="최근 기록을 결과별로 확인합니다.">
        <RecordFilterTabs activeFilter={filter} onChange={handleFilterChange} />
        <RecordList records={visibleRecords} />
        {canExpand && !isExpanded ? (
          <button className="button button--ghost record-more-button" onClick={() => setIsExpanded(true)} type="button">
            더보기
          </button>
        ) : null}
      </SectionCard>
    </div>
  )
}
