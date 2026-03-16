import { findRecordsByUserId } from '../repositories/recordRepository.js'

export async function getAllRecords(userId) {
  return findRecordsByUserId(userId)
}

export async function getSuccessRecords(userId) {
  return findRecordsByUserId(userId, 'success')
}

export async function getFailRecords(userId) {
  return findRecordsByUserId(userId, 'fail')
}
