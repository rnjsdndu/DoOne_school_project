import { getAllRecords, getFailRecords, getSuccessRecords } from '../services/recordService.js'

export async function allRecord(req, res) {
  const data = await getAllRecords(req.user.id)
  res.json({ success: true, data, message: 'All records loaded' })
}

export async function successRecord(req, res) {
  const data = await getSuccessRecords(req.user.id)
  res.json({ success: true, data, message: 'Success records loaded' })
}

export async function failRecord(req, res) {
  const data = await getFailRecords(req.user.id)
  res.json({ success: true, data, message: 'Fail records loaded' })
}
