const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export async function apiClient(path, options = {}) {
  const rawAuth = window.localStorage.getItem('do1-auth')
  const token = rawAuth ? JSON.parse(rawAuth).token : null

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let message = 'API request failed'
    try {
      const errorBody = await response.json()
      message = errorBody.message || message
    } catch {
      message = response.statusText || message
    }

    throw new Error(message)
  }

  return response.json()
}
