import { Router } from 'express'
import missionsRoutes from './missionsRoutes.js'
import recordsRoutes from './recordsRoutes.js'
import reportsRoutes from './reportsRoutes.js'
import systemRoutes from './systemRoutes.js'
import usersRoutes from './usersRoutes.js'

const router = Router()

router.use('/users', usersRoutes)
router.use('/missions', missionsRoutes)
router.use('/records', recordsRoutes)
router.use('/reports', reportsRoutes)
router.use('/system', systemRoutes)

export default router
