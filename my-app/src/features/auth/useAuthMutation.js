import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../../services/do1Api'
import { useAuthStore } from '../../store/authStore'

export function useAuthMutation(mode) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: mode === 'signup' ? signup : login,
    onSuccess: (data) => {
      setSession(data)
      queryClient.clear()
      if (mode === 'signup') {
        setTimeout(() => navigate('/', { replace: true }), 1800)
      } else {
        navigate('/', { replace: true })
      }
    },
  })
}
