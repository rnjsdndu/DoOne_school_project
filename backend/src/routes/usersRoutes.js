import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { login, profile, signup, updateMyProfile } from '../controllers/usersController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/signup', asyncHandler(signup))
router.post('/login', asyncHandler(login))
router.get('/profile', authMiddleware, asyncHandler(profile))
router.put('/profile', authMiddleware, asyncHandler(updateMyProfile))

export default router
