import { Component } from 'react'

export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, componentStack: '' }
  }

  static getDerivedStateFromError(error) {
    return { error, componentStack: '' }
  }

  componentDidCatch(error, info) {
    if (typeof window !== 'undefined') {
      window.__APP_ERROR__ = error
      window.__APP_ERROR_STACK__ = info.componentStack ?? ''
    }

    // Keep the stack on screen for easier debugging during development.
    this.setState({
      error,
      componentStack: info.componentStack ?? '',
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="app-shell">
          <div className="phone-shell">
            <section className="section-card">
              <h2 className="section-card__title">앱 렌더 중 문제가 생겼어요</h2>
              <p className="section-card__subtitle">새로고침해도 계속되면 아래 오류 내용을 확인해 주세요.</p>
              <p className="error-text">{this.state.error.message}</p>
              {this.state.componentStack ? <pre className="error-stack">{this.state.componentStack}</pre> : null}
            </section>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
