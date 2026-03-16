import { env } from '../config/env.js'
import { query } from '../config/db.js'
import { fetchMockLast30DaysRecords } from './mockRepository.js'

export async function fetchLast30DaysRecords(userId) {
  if (env.useMockDb) {
    return fetchMockLast30DaysRecords(userId)
  }
  const result = await query(
    `SELECT um.assigned_date, mr.result
     FROM user_missions um
     LEFT JOIN mission_records mr ON mr.user_mission_id = um.id
     WHERE um.user_id = $1
       AND um.assigned_date >= CURRENT_DATE - INTERVAL '29 days'
     ORDER BY um.assigned_date ASC`,
    [userId],
  )
  return result.rows
}
