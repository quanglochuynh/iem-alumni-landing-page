import { Component } from 'react';

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    const payload = {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    };

    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            Try again?
          </button>
        </div>
      );
    }
    // Return children components in case of no error
    return this.props.children;
  }
}
export default ErrorBoundary;
