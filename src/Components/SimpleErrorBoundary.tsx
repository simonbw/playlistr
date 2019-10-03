import React, { ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  error?: Error;
}

export default class TopErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: 40 }}>
          <h1
            style={{
              letterSpacing: 2,
              fontSize: "3em",
              textAlign: "center"
            }}
          >
            Uh oh, something went wrong
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}
