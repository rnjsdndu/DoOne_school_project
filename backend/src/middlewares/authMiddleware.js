import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    })
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    req.user = { id: payload.sub }
    return next()
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }
}
