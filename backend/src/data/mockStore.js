import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

const missionTemplates = [
  {
    id: 'tmpl-walk',
    category: 'health',
    title: '점심 후 10분 걷기',
    description: '식사 뒤 짧게 걸으며 몸의 리듬을 다시 올립니다.',
  },
  {
    id: 'tmpl-water',
    category: 'health',
    title: '물 1.5L 마시기',
    description: '오늘 하루 수분 섭취를 의식적으로 채워봅니다.',
  },
  {
    id: 'tmpl-focus',
    category: 'study',
    title: '집중 25분 타이머 1회',
    description: '방해 없는 25분을 확보해서 하나의 일만 처리합니다.',
  },
  {
    id: 'tmpl-stretch',
    category: 'mind',
    title: '취침 전 스트레칭 5분',
    description: '하루 마무리를 짧은 정리 동작으로 끝냅니다.',
  },
]

const users = []
const sessions = []
const userMissions = []
const missionRecords = []

function pickTemplateForUser(userId, assignedDate) {
  const seed = [...`${userId}-${assignedDate}`].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return missionTemplates[seed % missionTemplates.length]
}

function ensureMissionForDate(userId, assignedDate) {
  const existing = userMissions.find((mission) => mission.user_id === userId && mission.assigned_date === assignedDate)
  if (existing) {
    return existing
  }

  const template = pickTemplateForUser(userId, assignedDate)
  const created = {
    id: randomUUID(),
    user_id: userId,
    mission_template_id: template.id,
    assigned_date: assignedDate,
    status: 'pending',
    created_at: new Date().toISOString(),
  }

  userMissions.push(created)
  return created
}

export function seedLast30Days(userId, referenceDate = new Date()) {
  const today = new Date(referenceDate)

  for (let offset = 29; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)
    const assignedDate = formatDate(date)
    const mission = ensureMissionForDate(userId, assignedDate)

    if (assignedDate === formatDate(today)) {
      continue
    }

    const alreadyExists = missionRecords.some((record) => record.user_mission_id === mission.id)
    if (alreadyExists) {
      continue
    }

    const shouldFail = offset % 5 === 0
    mission.status = shouldFail ? 'fail' : 'success'
    missionRecords.push({
      id: randomUUID(),
      user_mission_id: mission.id,
      user_id: userId,
      result: shouldFail ? 'fail' : 'success',
      emotion: shouldFail ? 'tired' : null,
      fail_reason: shouldFail ? '예상보다 일정이 길어졌어요.' : null,
      recorded_at: new Date(date.setHours(21, 0, 0, 0)).toISOString(),
    })
  }
}

const demoPasswordHash = await bcrypt.hash('password1234', 10)

const demoUser = {
  id: 'demo-user-id',
  email: 'user@example.com',
  password_hash: demoPasswordHash,
  nickname: 'Doer',
  goal_message: '하루 한 번, 작게라도 해낸다.',
  preferred_mission_category: 'health',
  timezone: 'Asia/Seoul',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

users.push(demoUser)
seedLast30Days(demoUser.id)

export const mockStore = {
  users,
  sessions,
  missionTemplates,
  userMissions,
  missionRecords,
  ensureMissionForDate,
  formatDate,
}
