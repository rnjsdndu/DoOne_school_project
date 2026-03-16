import { useQuery } from '@tanstack/react-query'
import { getTodayMission } from '../../services/do1Api'

export function useTodayMissionQuery() {
  return useQuery({
    queryKey: ['today-mission'],
    queryFn: getTodayMission,
  })
}
