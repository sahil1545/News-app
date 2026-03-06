import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h3 className="alert-heading">Something went wrong!</h3>
            <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <hr />
            <p className="mb-0">
              <button 
                className="btn btn-primary" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-3">
                <summary>Error Details</summary>
                <pre className="mt-2">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
