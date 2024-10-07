import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type TProps = {
  children?: ReactNode;
};

type TState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<TProps, TState> {
  public state: TState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): TState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-screen flex-col items-center justify-center bg-background text-center text-white'>
          <div className='mb-10 text-xl text-black'>Oops, something wrong.</div>
          <button
            className='flex h-10 items-center justify-center rounded bg-zinc-900 px-6 text-sm text-white'
            onClick={() => window.location.reload()}
          >
            Click here to reset!
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
