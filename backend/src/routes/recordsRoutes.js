import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { allRecord, failRecord, successRecord } from '../controllers/recordsController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/allRecord', authMiddleware, asyncHandler(allRecord))
router.get('/success', authMiddleware, asyncHandler(successRecord))
router.get('/fail', authMiddleware, asyncHandler(failRecord))

export default router
