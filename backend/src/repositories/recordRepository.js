import { env } from '../config/env.js'
import { query } from '../config/db.js'
import { findMockRecordsByUserId } from './mockRepository.js'

export async function findRecordsByUserId(userId, result) {
  if (env.useMockDb) {
    return findMockRecordsByUserId(userId, result)
  }
  const values = [userId]
  let text = `
    SELECT mr.id, mr.result, mr.emotion, mr.fail_reason, mr.recorded_at, mt.title AS mission_title
    FROM mission_records mr
    JOIN user_missions um ON um.id = mr.user_mission_id
    JOIN mission_templates mt ON mt.id = um.mission_template_id
    WHERE mr.user_id = $1
  `

  if (result) {
    values.push(result)
    text += ' AND mr.result = $2'
  }

  text += ' ORDER BY mr.recorded_at DESC LIMIT 30'
  const response = await query(text, values)
  return response.rows
}
