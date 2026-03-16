import {
  assignMissionBatch,
  getTodayMission,
  recordMissionFail,
  recordMissionSuccess,
} from '../services/missionService.js'

export async function todayMission(req, res) {
  const data = await getTodayMission(req.user.id)
  res.json({ success: true, data, message: 'Today mission loaded' })
}

export async function successMission(req, res) {
  const data = await recordMissionSuccess(req.user.id, req.body.missionId)
  res.status(201).json({ success: true, data, message: 'Mission success recorded' })
}

export async function failMission(req, res) {
  const data = await recordMissionFail(req.user.id, req.body)
  res.status(201).json({ success: true, data, message: 'Mission fail recorded' })
}

export async function assignMission(req, res) {
  const data = await assignMissionBatch()
  res.json({ success: true, data, message: 'Mission assignment completed' })
}
