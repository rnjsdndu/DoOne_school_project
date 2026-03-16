import { apiClient } from './apiClient'
import {
  fetchCalendarReport,
  fetchRecords,
  fetchStreakReport,
  fetchSummaryReport,
  fetchTodayMission,
} from './mockData'

async function withFallback(request, fallback) {
  try {
    const response = await request()
    return response.data
  } catch {
    return fallback()
  }
}

function normalizeMission(mission) {
  return {
    ...mission,
    failReason: mission.failReason ?? mission.fail_reason ?? null,
  }
}

function normalizeRecord(record) {
  return {
    id: record.id,
    date: record.date ?? record.recorded_at?.slice(0, 10),
    missionTitle: record.missionTitle ?? record.mission_title,
    result: record.result,
    emotion: record.emotion ?? null,
    reason: record.reason ?? record.fail_reason ?? null,
  }
}

function normalizeCalendarDay(day) {
  return {
    date: day.date ?? day.assigned_date,
    label: day.label ?? Number((day.date ?? day.assigned_date).slice(-2)),
    status: day.status ?? 'pending',
  }
}

export async function getTodayMission() {
  const mission = await withFallback(() => apiClient('/missions/todayMission'), fetchTodayMission)
  return normalizeMission(mission)
}

export async function recordMissionSuccess(missionId) {
  const response = await apiClient('/missions/success', {
    method: 'POST',
    body: JSON.stringify({ missionId }),
  })
  return response.data
}

export async function recordMissionFail(payload) {
  const response = await apiClient('/missions/fail', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return response.data
}

export async function getRecords(filter) {
  const path =
    filter === 'success' ? '/records/success' : filter === 'fail' ? '/records/fail' : '/records/allRecord'

  const records = await withFallback(() => apiClient(path), () => fetchRecords(filter))
  return records.map(normalizeRecord)
}

export async function getCalendarReport() {
  const days = await withFallback(() => apiClient('/reports/calendar'), fetchCalendarReport)
  return days.map(normalizeCalendarDay)
}

export async function getSummaryReport() {
  return withFallback(() => apiClient('/reports/summary'), fetchSummaryReport)
}

export async function getStreakReport() {
  return withFallback(() => apiClient('/reports/streak'), fetchStreakReport)
}

export async function login(payload) {
  const response = await apiClient('/users/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return response.data
}

export async function signup(payload) {
  const response = await apiClient('/users/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return response.data
}

export async function updateProfile(payload) {
  const response = await apiClient('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  return response.data
}
