import { fetchLast30DaysRecords } from '../repositories/reportRepository.js'

function normalizeStatusRows(rows) {
  return rows.map((row) => ({
    date: row.assigned_date,
    status: row.result || 'pending',
  }))
}

export async function getCalendarReport(userId) {
  const rows = await fetchLast30DaysRecords(userId)
  return normalizeStatusRows(rows)
}

export async function getSummaryReport(userId) {
  const rows = await fetchLast30DaysRecords(userId)
  const successCount = rows.filter((row) => row.result === 'success').length
  const failCount = rows.filter((row) => row.result === 'fail').length
  const totalCount = successCount + failCount

  return {
    successCount,
    failCount,
    totalCount,
    successRate: totalCount ? Math.round((successCount / totalCount) * 100) : 0,
  }
}

export async function getStreakReport(userId) {
  const rows = await fetchLast30DaysRecords(userId)
  let current = 0
  let best = 0
  let running = 0

  rows.forEach((row) => {
    if (row.result === 'success') {
      running += 1
      best = Math.max(best, running)
    } else {
      running = 0
    }
  })

  for (let index = rows.length - 1; index >= 0; index -= 1) {
    if (rows[index].result === 'success') {
      current += 1
    } else {
      break
    }
  }

  return { current, best }
}
