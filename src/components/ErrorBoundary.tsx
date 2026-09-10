import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { TrishulIcon } from './Motifs';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF6EA] text-[#211D19] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#EDE3D1] border border-[#B88935]/40 rounded-2xl p-6 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#5A1717] text-amber-200 flex items-center justify-center mx-auto mb-4">
              <TrishulIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-heading text-[#5A1717] mb-2">
              Something went wrong loading the portal
            </h2>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              We encountered an issue displaying this section. Please click below to refresh the page.
            </p>
            {this.state.error && (
              <pre className="text-[11px] bg-white/80 p-3 rounded-lg text-red-800 text-left overflow-auto max-h-32 mb-4 font-mono">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md transition-all"
            >
              पुन्हा प्रयत्न करा • Reload Portal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
