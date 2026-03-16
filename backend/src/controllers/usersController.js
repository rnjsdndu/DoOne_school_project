import { loginUser, signupUser, getProfile, updateProfile } from '../services/userService.js'

export async function signup(req, res) {
  const data = await signupUser(req.body)
  res.status(201).json({ success: true, data, message: 'Signup success' })
}

export async function login(req, res) {
  const data = await loginUser(req.body)
  res.json({ success: true, data, message: 'Login success' })
}

export async function profile(req, res) {
  const data = await getProfile(req.user.id)
  res.json({ success: true, data, message: 'Profile loaded' })
}

export async function updateMyProfile(req, res) {
  const data = await updateProfile(req.body, req.user.id)
  res.json({ success: true, data, message: 'Profile updated' })
}
