import { NavLink, Outlet, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: '오늘' },
  { to: '/records', label: '기록' },
  { to: '/reports', label: '리포트' },
  { to: '/profile', label: '설정' },
]

const pageCopy = {
  '/': {
    eyebrow: 'TODAY MISSION',
    title: '오늘 할 한 가지를 받고 바로 실행 여부를 남겨보세요.',
    subtitle: '복잡한 계획 대신 오늘의 한 개 미션에만 집중하고, 끝난 뒤 바로 성공 또는 실패로 기록합니다.',
    badge: '오늘 1개',
  },
  '/records': {
    eyebrow: 'MISSION LOG',
    title: '쌓인 기록을 결과별로 가볍게 다시 살펴보세요.',
    subtitle: '전체, 성공, 실패 기록을 빠르게 훑으면서 어떤 흐름으로 이어지고 있는지 확인할 수 있습니다.',
    badge: '최근 기록',
  },
  '/reports': {
    eyebrow: 'ROUTINE REPORT',
    title: '숫자와 달력으로 지금의 루틴 흐름을 한눈에 봅니다.',
    subtitle: '성공률, 연속 성공, 날짜별 결과를 한 화면에서 확인하면서 최근 페이스를 정리할 수 있습니다.',
    badge: '30일 기준',
  },
  '/profile': {
    eyebrow: 'MY SETTINGS',
    title: '내 루틴 방향과 기본 정보를 편하게 다듬어보세요.',
    subtitle: '닉네임, 목표 문구, 선호 카테고리를 조정해서 앞으로 받을 미션의 결을 맞출 수 있습니다.',
    badge: '개인 설정',
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
