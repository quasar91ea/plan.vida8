/** @jsxRuntime classic */
import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-brand-secondary p-8 rounded-lg border border-brand-border max-w-lg w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">¡Ups! Algo salió mal.</h2>
            <p className="text-brand-tertiary mb-6">
              La aplicación ha encontrado un error inesperado. Por favor, recarga la página para continuar.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-2 bg-brand-accent hover:bg-blue-500 rounded-md text-white font-bold transition-colors"
            >
              Recargar la Página
            </button>
            {this.state.error && (
              <details className="mt-6 text-left text-xs text-brand-tertiary">
                <summary className="cursor-pointer hover:text-white">Detalles del error</summary>
                <pre className="mt-2 p-2 bg-brand-primary rounded-md overflow-auto whitespace-pre-wrap max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
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