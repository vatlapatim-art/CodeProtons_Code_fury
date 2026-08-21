import { Component } from 'react'

class AppErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="error-state">
        <p className="eyebrow">Arthiq needs a reset</p>
        <h1>Something went wrong.</h1>
        <p>Try loading the workspace again. Your saved local data is kept unless you reset it.</p>
        <button className="primary-button" type="button" onClick={() => window.location.reload()}>
          Retry workspace
        </button>
      </main>
    )
  }
}

export default AppErrorBoundary
