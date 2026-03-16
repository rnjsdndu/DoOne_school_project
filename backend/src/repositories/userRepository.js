import { env } from '../config/env.js'
import { query } from '../config/db.js'
import {
  createMockSession,
  createMockUser,
  findMockUserByEmail,
  findMockUserById,
  updateMockUser,
} from './mockRepository.js'

export async function findUserByEmail(email) {
  if (env.useMockDb) {
    return findMockUserByEmail(email)
  }
  const result = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])
  return result.rows[0] || null
}

export async function createUser({ email, passwordHash, nickname }) {
  if (env.useMockDb) {
    return createMockUser({ email, passwordHash, nickname })
  }
  const result = await query(
    `INSERT INTO users (email, password_hash, nickname)
     VALUES ($1, $2, $3)
     RETURNING id, email, nickname, goal_message, preferred_mission_category`,
    [email, passwordHash, nickname],
  )
  return result.rows[0]
}

export async function findUserById(id) {
  if (env.useMockDb) {
    return findMockUserById(id)
  }
  const result = await query(
    `SELECT id, email, nickname, goal_message, preferred_mission_category
     FROM users WHERE id = $1 LIMIT 1`,
    [id],
  )
  return result.rows[0] || null
}

export async function saveSession({ userId, refreshToken, deviceName, expiresAt }) {
  if (env.useMockDb) {
    return createMockSession({ userId, refreshToken, deviceName, expiresAt })
  }
  const result = await query(
    `INSERT INTO sessions (user_id, refresh_token, device_name, expires_at)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [userId, refreshToken, deviceName, expiresAt],
  )
  return result.rows[0]
}

export async function updateUserProfile(userId, payload) {
  if (env.useMockDb) {
    return updateMockUser(userId, payload)
  }
  const result = await query(
    `UPDATE users
     SET nickname = COALESCE($2, nickname),
         goal_message = COALESCE($3, goal_message),
         preferred_mission_category = COALESCE($4, preferred_mission_category),
         updated_at = NOW()
     WHERE id = $1
     RETURNING id, email, nickname, goal_message, preferred_mission_category`,
    [userId, payload.nickname, payload.goalMessage, payload.preferredMissionCategory],
  )
  return result.rows[0] || null
}
