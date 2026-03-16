import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { assignMission } from '../controllers/missionsController.js'
import { sync } from '../controllers/systemController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/assign-mission', asyncHandler(assignMission))
router.post('/sync', authMiddleware, asyncHandler(sync))

export default router
