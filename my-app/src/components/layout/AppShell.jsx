import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: '오늘' },
  { to: '/records', label: '기록' },
  { to: '/reports', label: '리포트' },
  { to: '/profile', label: '설정' },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <div className="phone-shell">
        <header className="topbar">
          <div className="topbar__row">
            <div className="topbar__content">
              <p className="eyebrow">DO1 companion</p>
              <h1>오늘은 이 캐릭터가 딱 한 개의 미션만 줄 거예요.</h1>
            </div>
            <div className="topbar__badge">오늘 1개</div>
          </div>
          <p className="topbar__subtitle">미션을 받고, 바로 실행 여부를 기록하고, 흐름을 짧고 분명하게 확인하는 모바일 화면입니다.</p>
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
