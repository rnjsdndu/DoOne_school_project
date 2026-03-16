import { env } from '../config/env.js'
import { query } from '../config/db.js'
import {
  assignMockMissionBatch,
  createMockMissionRecord,
  findMockRecordByUserMissionId,
  findMockTodayMission,
} from './mockRepository.js'

export async function findTodayMissionByUserId(userId, assignedDate) {
  if (env.useMockDb) {
    return findMockTodayMission(userId, assignedDate)
  }
  const result = await query(
    `SELECT um.id, um.status, mt.title, mt.description, mt.category, mr.emotion, mr.fail_reason
     FROM user_missions um
     JOIN mission_templates mt ON mt.id = um.mission_template_id
     LEFT JOIN mission_records mr ON mr.user_mission_id = um.id
     WHERE um.user_id = $1 AND um.assigned_date = $2
     LIMIT 1`,
    [userId, assignedDate],
  )
  return result.rows[0] || null
}

export async function createMissionRecord({ userMissionId, userId, result, emotion, failReason }) {
  if (env.useMockDb) {
    return createMockMissionRecord({ userMissionId, userId, result, emotion, failReason })
  }
  const inserted = await query(
    `INSERT INTO mission_records (user_mission_id, user_id, result, emotion, fail_reason)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, result, emotion, fail_reason, recorded_at`,
    [userMissionId, userId, result, emotion, failReason],
  )

  await query('UPDATE user_missions SET status = $1 WHERE id = $2', [result, userMissionId])
  return inserted.rows[0]
}

export async function findRecordByUserMissionId(userMissionId) {
  if (env.useMockDb) {
    return findMockRecordByUserMissionId(userMissionId)
  }
  const result = await query('SELECT * FROM mission_records WHERE user_mission_id = $1 LIMIT 1', [
    userMissionId,
  ])
  return result.rows[0] || null
}

export async function assignMissionForToday() {
  if (env.useMockDb) {
    return assignMockMissionBatch()
  }

  return {
    assignedCount: 0,
    executedAt: new Date().toISOString(),
  }
}
