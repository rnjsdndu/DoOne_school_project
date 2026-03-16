import { SectionCard } from '../components/common/SectionCard'
import { CalendarHeatmap } from '../components/report/CalendarHeatmap'
import { StreakPanel } from '../components/report/StreakPanel'
import { SummaryCards } from '../components/report/SummaryCards'
import {
  useCalendarReportQuery,
  useStreakReportQuery,
  useSummaryReportQuery,
} from '../features/reports/useReportQuery'

export function ReportsPage() {
  const { data: summary } = useSummaryReportQuery()
  const { data: streak } = useStreakReportQuery()
  const { data: calendar = [] } = useCalendarReportQuery()

  if (!summary || !streak) {
    return null
  }

  return (
    <div className="page-stack">
      <SectionCard title="30일 성과" subtitle="최근 30일 기준 루틴 상태입니다.">
        <SummaryCards summary={summary} />
      </SectionCard>
      <SectionCard title="연속 성공" subtitle="지금의 흐름과 최고 기록을 함께 보여줍니다.">
        <StreakPanel streak={streak} />
      </SectionCard>
      <SectionCard title="달력 리포트" subtitle="날짜별 성공/실패/미기록 상태입니다.">
        <CalendarHeatmap days={calendar} />
      </SectionCard>
    </div>
  )
}
