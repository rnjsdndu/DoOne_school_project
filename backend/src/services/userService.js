import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import {
  createUser,
  findUserByEmail,
  findUserById,
  saveSession,
  updateUserProfile,
} from '../repositories/userRepository.js'
import { ApiError } from '../utils/apiError.js'

function buildAuthResponse(user) {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    goalMessage: user.goal_message,
    preferredMissionCategory: user.preferred_mission_category,
  }
}

export async function signupUser(payload) {
  if (!payload.email || !payload.password || !payload.nickname) {
    throw new ApiError(400, 'Email, password and nickname are required')
  }

  const existingUser = await findUserByEmail(payload.email)
  if (existingUser) {
    throw new ApiError(409, 'Email already exists')
  }

  const passwordHash = await bcrypt.hash(payload.password, 10)
  const user = await createUser({
    email: payload.email,
    passwordHash,
    nickname: payload.nickname,
  })

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '30d' })
  await saveSession({
    userId: user.id,
    refreshToken: token,
    deviceName: payload.deviceName,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  })
  return { user: buildAuthResponse(user), token }
}

export async function loginUser(payload) {
  const user = await findUserByEmail(payload.email)
  if (!user) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const isValidPassword = await bcrypt.compare(payload.password, user.password_hash)
  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '30d' })
  await saveSession({
    userId: user.id,
    refreshToken: token,
    deviceName: payload.deviceName,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  })
  return {
    user: buildAuthResponse(user),
    token,
  }
}

export async function getProfile(userId) {
  const user = await findUserById(userId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }
  return buildAuthResponse(user)
}

export async function updateProfile(payload, userId) {
  const user = await updateUserProfile(userId, payload)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }
  return buildAuthResponse(user)
}
