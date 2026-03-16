import { useState } from 'react'
import { SectionCard } from '../components/common/SectionCard'
import { RecordFilterTabs } from '../components/record/RecordFilterTabs'
import { RecordList } from '../components/record/RecordList'
import { useRecordsQuery } from '../features/records/useRecordsQuery'

export function RecordsPage() {
  const [filter, setFilter] = useState('all')
  const { data: records = [] } = useRecordsQuery(filter)

  return (
    <div className="page-stack">
      <SectionCard title="기록 목록" subtitle="최근 기록을 결과별로 확인합니다.">
        <RecordFilterTabs activeFilter={filter} onChange={setFilter} />
        <RecordList records={records} />
      </SectionCard>
    </div>
  )
}
