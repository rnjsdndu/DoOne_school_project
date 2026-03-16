import { getCalendarReport, getStreakReport, getSummaryReport } from '../services/reportService.js'

export async function calendar(req, res) {
  const data = await getCalendarReport(req.user.id)
  res.json({ success: true, data, message: 'Calendar report loaded' })
}

export async function summary(req, res) {
  const data = await getSummaryReport(req.user.id)
  res.json({ success: true, data, message: 'Summary report loaded' })
}

export async function streak(req, res) {
  const data = await getStreakReport(req.user.id)
  res.json({ success: true, data, message: 'Streak report loaded' })
}
