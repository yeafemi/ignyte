import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

// Error display overlay for debugging production issues
if (typeof window !== "undefined") {
  const showErrorOverlay = (message: string, stack?: string) => {
    const errorDiv = document.createElement("div");
    errorDiv.style.position = "fixed";
    errorDiv.style.top = "0";
    errorDiv.style.left = "0";
    errorDiv.style.width = "100%";
    errorDiv.style.padding = "20px";
    errorDiv.style.backgroundColor = "#fee2e2";
    errorDiv.style.color = "#991b1b";
    errorDiv.style.borderBottom = "2px solid #f87171";
    errorDiv.style.zIndex = "100000";
    errorDiv.style.fontFamily = "monospace";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.overflowX = "auto";
    errorDiv.style.whiteSpace = "pre-wrap";
    errorDiv.innerHTML = `<strong>Application Error:</strong> ${message}<br/><br/>${stack || ""}`;
    document.body.appendChild(errorDiv);
    
    // Also make sure loader is hidden so the error is visible
    const loader = document.getElementById("ignyte-loader");
    if (loader) {
      loader.style.display = "none";
    }
  };

  window.addEventListener("error", (event) => {
    showErrorOverlay(event.message, event.error?.stack);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    showErrorOverlay(
      reason instanceof Error ? reason.message : String(reason),
      reason instanceof Error ? reason.stack : undefined
    );
  });
}

// Track when the page started loading
const loadStart = Date.now();
const MIN_LOADER_MS = 1000; // show loader for at least 1 second

function hideLoader() {
  const elapsed = Date.now() - loadStart;
  const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

  setTimeout(() => {
    const loader = document.getElementById("ignyte-loader");
    if (!loader) return;
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 650); // wait for CSS transition
  }, remaining);
}

const router = getRouter();

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
  hideLoader();
};

router.load()
  .then(renderApp)
  .catch((err) => {
    console.error("Router load failed:", err);
    renderApp();
  });
