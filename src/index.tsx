import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import App from "./app";
import "./index.css";

/** 独立部署兜底错误页（替代原平台 ErrorRender，无任何外部依赖）。 */
function Fallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-serif">
      <div className="max-w-md w-full mx-4 p-6 bg-card border border-border rounded-sm shadow-lg text-center">
        <div className="text-3xl mb-3">🍂</div>
        <h1 className="text-xl mb-2 tracking-wider">庭院失序，笔墨暂歇</h1>
        <p className="text-sm text-muted-foreground mb-6 break-all">{message}</p>
        <button
          onClick={() => resetErrorBoundary()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors cursor-pointer"
        >
          重整庭院
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 独立部署：静态托管于任意路径，basename 固定为根路径 */}
    <BrowserRouter basename="/">
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <Fallback error={error} resetErrorBoundary={resetErrorBoundary} />
        )}
      >
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
