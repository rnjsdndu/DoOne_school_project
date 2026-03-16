import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import {
  failMission,
  successMission,
  todayMission,
} from '../controllers/missionsController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/todayMission', authMiddleware, asyncHandler(todayMission))
router.post('/success', authMiddleware, asyncHandler(successMission))
router.post('/fail', authMiddleware, asyncHandler(failMission))

export default router
