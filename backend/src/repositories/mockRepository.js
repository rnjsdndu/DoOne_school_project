import { randomUUID } from 'crypto'
import { mockStore } from '../data/mockStore.js'

function withTemplate(mission) {
  const template = mockStore.missionTemplates.find((item) => item.id === mission.mission_template_id)
  return {
    ...mission,
    title: template?.title,
    description: template?.description,
    category: template?.category,
  }
}

export function createMockUser({ email, passwordHash, nickname }) {
  const user = {
    id: randomUUID(),
    email,
    password_hash: passwordHash,
    nickname,
    goal_message: '하루 1개 미션으로 루틴 만들기',
    preferred_mission_category: 'health',
    timezone: 'Asia/Seoul',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockStore.users.push(user)
  return user
}

export function findMockUserByEmail(email) {
  return mockStore.users.find((user) => user.email === email) || null
}

export function findMockUserById(id) {
  return mockStore.users.find((user) => user.id === id) || null
}

export function updateMockUser(userId, payload) {
  const user = findMockUserById(userId)
  if (!user) {
    return null
  }

  user.nickname = payload.nickname ?? user.nickname
  user.goal_message = payload.goalMessage ?? user.goal_message
  user.preferred_mission_category =
    payload.preferredMissionCategory ?? user.preferred_mission_category
  user.updated_at = new Date().toISOString()
  return user
}

export function createMockSession({ userId, refreshToken, deviceName, expiresAt }) {
  const session = {
    id: randomUUID(),
    user_id: userId,
    refresh_token: refreshToken,
    device_name: deviceName ?? 'browser',
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
  }

  mockStore.sessions.push(session)
  return session
}

export function findMockTodayMission(userId, assignedDate) {
  const mission = mockStore.ensureMissionForDate(userId, assignedDate)
  const record = mockStore.missionRecords.find((item) => item.user_mission_id === mission.id)
  return {
    ...withTemplate(mission),
    status: record?.result ?? mission.status,
    emotion: record?.emotion ?? null,
    failReason: record?.fail_reason ?? null,
  }
}

export function createMockMissionRecord({ userMissionId, userId, result, emotion, failReason }) {
  const existing = mockStore.missionRecords.find((record) => record.user_mission_id === userMissionId)
  if (existing) {
    return existing
  }

  const record = {
    id: randomUUID(),
    user_mission_id: userMissionId,
    user_id: userId,
    result,
    emotion: emotion ?? null,
    fail_reason: failReason ?? null,
    recorded_at: new Date().toISOString(),
  }

  mockStore.missionRecords.push(record)
  const mission = mockStore.userMissions.find((item) => item.id === userMissionId)
  if (mission) {
    mission.status = result
  }

  return record
}

export function findMockRecordByUserMissionId(userMissionId) {
  return mockStore.missionRecords.find((record) => record.user_mission_id === userMissionId) || null
}

export function findMockRecordsByUserId(userId, result) {
  return mockStore.missionRecords
    .filter((record) => record.user_id === userId && (!result || record.result === result))
    .map((record) => {
      const mission = mockStore.userMissions.find((item) => item.id === record.user_mission_id)
      const template = mockStore.missionTemplates.find((item) => item.id === mission?.mission_template_id)
      return {
        id: record.id,
        result: record.result,
        emotion: record.emotion,
        fail_reason: record.fail_reason,
        recorded_at: record.recorded_at,
        mission_title: template?.title ?? '오늘의 미션',
      }
    })
    .sort((a, b) => new Date(b.recorded_at) - new Date(a.recorded_at))
}

export function fetchMockLast30DaysRecords(userId) {
  const days = []
  const now = new Date()

  for (let offset = 29; offset >= 0; offset -= 1) {
    const date = new Date(now)
    date.setDate(now.getDate() - offset)
    const assignedDate = mockStore.formatDate(date)
    const mission = mockStore.ensureMissionForDate(userId, assignedDate)
    const record = mockStore.missionRecords.find((item) => item.user_mission_id === mission.id)

    days.push({
      assigned_date: assignedDate,
      result: record?.result ?? null,
    })
  }

  return days
}

export function assignMockMissionBatch() {
  const assignedDate = mockStore.formatDate(new Date())
  mockStore.users.forEach((user) => {
    mockStore.ensureMissionForDate(user.id, assignedDate)
  })
  return {
    assignedCount: mockStore.users.length,
    executedAt: new Date().toISOString(),
  }
}
