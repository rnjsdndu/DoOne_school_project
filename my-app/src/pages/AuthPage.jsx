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
    email: 'demo.gmail.com',
    password: 'demo',
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
        <h1>거창한 계획은 필요 없어요.</h1>
        <p className="auth-panel__intro">하루 1분, 오늘의 미션 하나만 정하면 루틴이 됩니다.</p>
        <div className="tab-row">
          <button
            className={`tab-button${authMode === 'login' ? ' is-active' : ''}`}
            onClick={() => { setAuthMode('login'); mutation.reset() }}
            type="button"
          >
            로그인
          </button>
          <button
            className={`tab-button${authMode === 'signup' ? ' is-active' : ''}`}
            onClick={() => { setAuthMode('signup'); mutation.reset() }}
            type="button"
          >
            회원가입
          </button>
        </div>
        {mutation.isSuccess && authMode === 'signup' ? (
          <div className="auth-success">
            <p className="auth-success__title">가입 완료!</p>
            <p className="auth-success__sub">잠시 후 홈으로 이동합니다.</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              <span className="field-label">이메일</span>
              <input
                autoComplete="username"
                lang="en"
                type="text"
                placeholder="demo.gmail.com"
                value={form.email}
                onChange={handleChange('email')}
              />
            </label>
            <label>
              <span className="field-label">비밀번호</span>
              <input
                autoComplete="current-password"
                lang="en"
                type="password"
                placeholder="demo"
                value={form.password}
                onChange={handleChange('password')}
              />
            </label>
            <div className={`auth-field-extra${authMode === 'signup' ? ' is-visible' : ''}`}>
              <label>
                <span className="field-label">닉네임</span>
                <input
                  autoComplete="off"
                  lang="en"
                  type="text"
                  placeholder="Doer"
                  value={form.nickname}
                  onChange={handleChange('nickname')}
                />
              </label>
            </div>
            <p className="error-text" style={{ visibility: mutation.error && authMode === 'login' ? 'visible' : 'hidden' }}>
              {mutation.error?.message ?? '\u00A0'}
            </p>
            <button className="button button--primary" type="submit" disabled={mutation.isPending}>
              {authMode === 'signup' ? '회원가입' : '로그인'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
