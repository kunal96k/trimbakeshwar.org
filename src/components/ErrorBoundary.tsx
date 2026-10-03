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
          <div className="max-w-md w-full bg-[#EDE3D1] border-2 border-[#B88935]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            
            {/* Official Temple Purohit Logo */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img
                src="/assets/purohit-profile.png"
                alt="Shri Trimbakeshwar Hereditary Purohit Official Logo"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37] shadow-lg p-0.5 bg-[#5A1717]"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#5A1717] text-amber-300 flex items-center justify-center border border-[#D4AF37] shadow-xs">
                <TrishulIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Sacred Vedic Inscription */}
            <div className="text-[11px] font-bold text-[#5A1717] tracking-widest uppercase mb-1 font-serif">
              ॥ ॐ नमः शिवाय · श्री क्षेत्र त्र्यंबकेश्वर ॥
            </div>

            <h2 className="text-xl font-bold font-heading text-[#5A1717] mb-2">
              Something went wrong loading the portal
            </h2>

            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
              An unexpected display issue occurred while rendering this section. Please reload the portal or return to the main sacred sanctum.
            </p>

            {this.state.error && (
              <pre className="text-[11px] bg-white/90 p-3 rounded-xl border border-stone-300/80 text-red-800 text-left overflow-auto max-h-28 mb-5 font-mono">
                {this.state.error.toString()}
              </pre>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md transition-all cursor-pointer"
              >
                पुन्हा प्रयत्न करा • Reload Portal
              </button>
              <a
                href="/"
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#5A1717] bg-white border border-[#B88935]/40 hover:bg-[#F4EFE6] shadow-xs transition-all text-center cursor-pointer"
              >
                मुख्यपृष्ठ • Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
