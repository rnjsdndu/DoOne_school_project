const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const STATUS_MESSAGES = {
  400: '이메일 또는 비밀번호를 확인해 주세요.',
  401: '이메일 또는 비밀번호가 올바르지 않습니다.',
  403: '접근 권한이 없습니다.',
  404: '존재하지 않는 계정입니다.',
  409: '이미 사용 중인 이메일입니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  502: '이메일 또는 비밀번호를 다시 확인해 주세요.',
  503: '서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해 주세요.',
  504: '서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.',
}

function getStoredAuthToken() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawAuth = window.localStorage.getItem('do1-auth')
    if (!rawAuth) {
      return null
    }

    const parsed = JSON.parse(rawAuth)
    return parsed.token ?? null
  } catch {
    return null
  }
}

export async function apiClient(path, options = {}) {
  const token = getStoredAuthToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const message = STATUS_MESSAGES[response.status] ?? '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    throw new Error(message)
  }

  return response.json()
}
