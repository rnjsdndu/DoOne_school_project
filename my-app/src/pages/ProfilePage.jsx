import { useState } from 'react'
import { SectionCard } from '../components/common/SectionCard'
import { useProfileMutation } from '../features/auth/useProfileMutation'
import { useAuthStore } from '../store/authStore'

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const mutation = useProfileMutation()
  const [form, setForm] = useState({
    nickname: user?.nickname ?? '',
    goalMessage: user?.goalMessage ?? '',
    preferredMissionCategory: user?.preferredMissionCategory ?? 'health',
  })

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  return (
    <div className="page-stack">
      <SectionCard title="프로필">
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            mutation.mutate(form)
          }}
        >
          <label>
            <span className="field-label">닉네임</span>
            <input type="text" value={form.nickname} onChange={handleChange('nickname')} />
          </label>
          <label>
            <span className="field-label">이메일</span>
            <input type="email" value={user?.email ?? ''} disabled />
          </label>
          <label>
            <span className="field-label">목표 문구</span>
            <input type="text" value={form.goalMessage} onChange={handleChange('goalMessage')} />
          </label>
          <label>
            <span className="field-label">선호 카테고리</span>
            <select value={form.preferredMissionCategory} onChange={handleChange('preferredMissionCategory')}>
              <option value="health">건강</option>
              <option value="study">공부</option>
              <option value="mind">마음관리</option>
            </select>
          </label>
          {mutation.error ? <p className="error-text">{mutation.error.message}</p> : null}
          <button className="button button--primary" type="submit" disabled={mutation.isPending}>
            저장
          </button>
        </form>
        <button className="button button--ghost profile-logout" onClick={logout}>
          로그아웃
        </button>
      </SectionCard>
    </div>
  )
}
