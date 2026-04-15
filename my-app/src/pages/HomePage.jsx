import { SectionCard } from '../components/common/SectionCard'
import { HeroMissionCard } from '../components/home/HeroMissionCard'
import { MissionActionPanel } from '../components/home/MissionActionPanel'
import {
  useMissionFailMutation,
  useMissionSuccessMutation,
} from '../features/mission/useMissionRecordMutation'
import { useTodayMissionQuery } from '../features/mission/useTodayMissionQuery'

export function HomePage() {
  const { data: mission, isLoading, isError, error, refetch } = useTodayMissionQuery()
  const successMutation = useMissionSuccessMutation()
  const failMutation = useMissionFailMutation()

  if (isLoading || (!mission && !isError)) {
    return (
      <div className="page-stack">
        <SectionCard title="오늘 미션" subtitle="가져오는 중입니다. 잠시만 기다려 주세요.">
          <p className="empty-state">오늘의 미션을 불러오고 있어요.</p>
        </SectionCard>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="page-stack">
        <SectionCard title="오늘 미션" subtitle="미션을 불러오는 데 실패했어요.">
          <p className="error-text">{error.message}</p>
          <button className="button button--ghost" onClick={() => refetch()} type="button">
            다시 시도
          </button>
        </SectionCard>
      </div>
    )
  }

  const isLocked = mission.status === 'success' || mission.status === 'fail'
  const resultLabel = mission.status === 'success' ? '성공 기록 완료' : '실패 기록 완료'

  return (
    <div className="page-stack">
      <HeroMissionCard mission={mission} />

      <SectionCard title="미션 응답하기" subtitle="캐릭터가 준 오늘의 미션에 대해 바로 답해주세요. 저장 후에는 수정할 수 없습니다.">
        <MissionActionPanel
          isLocked={isLocked || successMutation.isPending || failMutation.isPending}
          onSuccess={() => successMutation.mutate(mission.id)}
          onFail={(payload) => failMutation.mutate({ missionId: mission.id, ...payload })}
        />
        {successMutation.error || failMutation.error ? (
          <p className="error-text">{successMutation.error?.message || failMutation.error?.message}</p>
        ) : null}
        {isLocked ? (
          <div className="lock-message">
            <strong>{resultLabel}</strong>
            <p>오늘 기록은 이미 저장되어 잠금 상태입니다.</p>
            {mission.failReason ? <p>실패 이유: {mission.failReason}</p> : null}
          </div>
        ) : null}
      </SectionCard>
    </div>
  )
}
