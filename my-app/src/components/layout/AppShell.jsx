import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: '오늘' },
  { to: '/records', label: '리스트' },
  { to: '/reports', label: '30일 리포트' },
  { to: '/profile', label: '마이페이지' },
]

const pageCopy = {
  '/': {
    eyebrow: 'TODAY MISSION',
    title: '오늘 할 한 가지를 받고 바로 실행 여부를 남겨보세요.',
    subtitle: '복잡한 계획 대신 오늘의 한 개 미션에만 집중하고, 끝난 뒤 바로 성공 또는 실패로 기록합니다.',
    badge: '오늘 1개',
  },
  '/records': {
    eyebrow: 'MISSION LIST',
    title: '쌓인 기록을 한눈에.',
    subtitle: '전체·성공·실패별로 내 흐름을 빠르게 확인하세요.',
    badge: '전체 기록',
  },
  '/reports': {
    eyebrow: 'ROUTINE REPORT',
    title: '숫자와 달력으로 보는 루틴.',
    subtitle: '성공률, 연속 기록, 날짜별 결과를 한 화면에서 확인하세요.',
    badge: '30일 기준',
  },
  '/profile': {
    eyebrow: 'MY PAGE',
    title: '내 루틴 방향을 다듬기.',
    subtitle: '닉네임, 목표, 선호 카테고리를 조정해서 미션의 결을 맞추세요.',
    badge: '마이페이지',
  },
}

export function AppShell() {
  const location = useLocation()
  const currentCopy = pageCopy[location.pathname] ?? pageCopy['/']

  return (
    <div className="app-shell" lang="ko">
      <div className="phone-shell">
        <header className="topbar">
          <div className="topbar__row">
            <div className="topbar__content">
              <p className="eyebrow" lang="en">{currentCopy.eyebrow}</p>
              <h1>{currentCopy.title}</h1>
            </div>
            <div className="topbar__badge">{currentCopy.badge}</div>
          </div>
          <p className="topbar__subtitle">{currentCopy.subtitle}</p>
        </header>

        <main className="page-content">
          <Outlet />
        </main>

        <nav className="bottom-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `bottom-nav__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
