import { useMutation, useQueryClient } from '@tanstack/react-query'
import { recordMissionFail, recordMissionSuccess } from '../../services/do1Api'

function invalidateDashboardQueries(queryClient) {
  queryClient.invalidateQueries({ queryKey: ['today-mission'] })
  queryClient.invalidateQueries({ queryKey: ['records'] })
  queryClient.invalidateQueries({ queryKey: ['report-calendar'] })
  queryClient.invalidateQueries({ queryKey: ['report-summary'] })
  queryClient.invalidateQueries({ queryKey: ['report-streak'] })
}

export function useMissionSuccessMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (missionId) => recordMissionSuccess(missionId),
    onSuccess: () => invalidateDashboardQueries(queryClient),
  })
}

export function useMissionFailMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ missionId, emotion, reason }) => recordMissionFail({ missionId, emotion, reason }),
    onSuccess: () => invalidateDashboardQueries(queryClient),
  })
}
