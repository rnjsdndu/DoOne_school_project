import { useQuery } from '@tanstack/react-query'
import { getRecords } from '../../services/do1Api'

export function useRecordsQuery(filter) {
  return useQuery({
    queryKey: ['records', filter],
    queryFn: () => getRecords(filter),
  })
}
