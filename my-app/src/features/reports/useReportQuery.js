import { useQuery } from '@tanstack/react-query'
import {
  getCalendarReport,
  getStreakReport,
  getSummaryReport,
} from '../../services/do1Api'

export function useCalendarReportQuery() {
  return useQuery({
    queryKey: ['report-calendar'],
    queryFn: getCalendarReport,
  })
}

export function useSummaryReportQuery() {
  return useQuery({
    queryKey: ['report-summary'],
    queryFn: getSummaryReport,
  })
}

export function useStreakReportQuery() {
  return useQuery({
    queryKey: ['report-streak'],
    queryFn: getStreakReport,
  })
}
