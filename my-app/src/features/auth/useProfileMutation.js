import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '../../services/do1Api'
import { useAuthStore } from '../../store/authStore'

export function useProfileMutation() {
  const updateUser = useAuthStore((state) => state.updateUser)

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      updateUser(user)
    },
  })
}
