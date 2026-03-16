import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { calendar, streak, summary } from '../controllers/reportsController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/calendar', authMiddleware, asyncHandler(calendar))
router.get('/summary', authMiddleware, asyncHandler(summary))
router.get('/streak', authMiddleware, asyncHandler(streak))

export default router
