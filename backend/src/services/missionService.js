import {
  assignMissionForToday,
  createMissionRecord,
  findRecordByUserMissionId,
  findTodayMissionByUserId,
} from '../repositories/missionRepository.js'
import { ApiError } from '../utils/apiError.js'
import { getTodayDateString } from '../utils/date.js'

export async function getTodayMission(userId) {
  const todayMission = await findTodayMissionByUserId(userId, getTodayDateString())
  if (!todayMission) {
    return {
      id: 'pending-seed',
      title: '점심 후 10분 걷기',
      description: '업무 사이에 짧게 움직이며 루틴을 유지하세요.',
      category: 'health',
    }
  }
  return todayMission
}

export async function recordMissionSuccess(userId, missionId) {
  const existingRecord = await findRecordByUserMissionId(missionId)
  if (existingRecord) {
    throw new ApiError(409, 'Today record already exists')
  }

  return createMissionRecord({
    userMissionId: missionId,
    userId,
    result: 'success',
    emotion: null,
    failReason: null,
  })
}

export async function recordMissionFail(userId, payload) {
  if (!payload.reason?.trim()) {
    throw new ApiError(400, 'Fail reason is required')
  }

  const existingRecord = await findRecordByUserMissionId(payload.missionId)
  if (existingRecord) {
    throw new ApiError(409, 'Today record already exists')
  }

  return createMissionRecord({
    userMissionId: payload.missionId,
    userId,
    result: 'fail',
    emotion: payload.emotion,
    failReason: payload.reason,
  })
}

export async function assignMissionBatch() {
  return assignMissionForToday()
}
