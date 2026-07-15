import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class WebErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (
      error instanceof DOMException
      && error.message.includes('removeChild')
    ) {
      return;
    }
    console.error('[WebErrorBoundary]', error, info.componentStack);
  }

  render() {
    return this.props.children;
  }
}

export { WebErrorBoundary };
