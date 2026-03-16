import { syncClientState } from '../services/systemService.js'

export async function sync(req, res) {
  const data = await syncClientState(req.user.id)
  res.json({ success: true, data, message: 'Sync completed' })
}
