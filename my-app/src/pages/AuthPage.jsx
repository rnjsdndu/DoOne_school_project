import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthMutation } from '../features/auth/useAuthMutation'
import { useAuthStore } from '../store/authStore'
import { useUiStore } from '../store/uiStore'

export function AuthPage() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const authMode = useUiStore((state) => state.authMode)
  const setAuthMode = useUiStore((state) => state.setAuthMode)
  const mutation = useAuthMutation(authMode)
  const [form, setForm] = useState({
    email: 'user@example.com',
    password: 'password1234',
    nickname: 'Doer',
  })

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="auth-page" lang="ko">
      <div className="auth-panel">
        <p className="eyebrow" lang="en">DO1</p>
        <h1>하루 1개 미션으로 루틴을 단순하게 만듭니다.</h1>
        <p className="auth-panel__intro">복잡한 계획 대신, 오늘 반드시 해볼 한 가지에만 집중할 수 있게 도와주는 기록 서비스입니다.</p>
        <div className="tab-row">
          <button
            className={`tab-button${authMode === 'login' ? ' is-active' : ''}`}
            onClick={() => setAuthMode('login')}
            type="button"
          >
            로그인
          </button>
          <button
            className={`tab-button${authMode === 'signup' ? ' is-active' : ''}`}
            onClick={() => setAuthMode('signup')}
            type="button"
          >
            회원가입
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span className="field-label">이메일</span>
            <input lang="en" type="email" placeholder="user@example.com" value={form.email} onChange={handleChange('email')} />
          </label>
          <label>
            <span className="field-label">비밀번호</span>
            <input lang="en" type="password" placeholder="password" value={form.password} onChange={handleChange('password')} />
          </label>
          {authMode === 'signup' ? (
            <label>
              <span className="field-label">닉네임</span>
              <input lang="en" type="text" placeholder="Doer" value={form.nickname} onChange={handleChange('nickname')} />
            </label>
          ) : null}
          {mutation.error ? <p className="error-text">{mutation.error.message}</p> : null}
          <button className="button button--primary" type="submit" disabled={mutation.isPending}>
            {authMode === 'signup' ? '회원가입' : '로그인'}
          </button>
        </form>
        <p className="helper-text">
          데모 계정: <span lang="en">user@example.com / password1234</span>
        </p>
      </div>
    </div>
  )
}
