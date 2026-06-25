import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[USIU] ${this.props.label ?? 'Section'} crashed:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-panel p-6 m-6 border border-threat/40 text-center">
          <AlertTriangle className="w-8 h-8 text-threat mx-auto mb-3" />
          <p className="text-threat font-heading font-bold uppercase tracking-wider text-sm mb-2">
            Section Render Error
          </p>
          <p className="text-slate-400 text-xs mb-4">
            {this.props.label ?? 'This panel'} failed to load. The rest of the dossier remains accessible.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="text-xs font-mono uppercase tracking-wider border border-cyan/40 text-cyan px-4 py-2 rounded hover:bg-cyan/10"
          >
            Retry Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
