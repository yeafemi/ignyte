import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";
import ignyteLogoUrl from "./assets/ignyte-logo.png";

// ── Loading screen ──────────────────────────────────────────────────────────
function showLoader() {
  const style = document.createElement("style");
  style.id = "ignyte-loader-style";
  style.textContent = `
    #ignyte-loader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #0a0a0f;
      gap: 24px;
      transition: opacity 0.5s ease;
    }
    #ignyte-loader.fade-out {
      opacity: 0;
      pointer-events: none;
    }
    @keyframes ignyte-spin {
      0%   { transform: rotate(0deg) scale(1); }
      50%  { transform: rotate(180deg) scale(1.12); }
      100% { transform: rotate(360deg) scale(1); }
    }
    @keyframes ignyte-pulse-ring {
      0%, 100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.5); }
      50%       { box-shadow: 0 0 0 18px rgba(6, 182, 212, 0); }
    }
    #ignyte-logo-spin {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      animation: ignyte-spin 1.4s cubic-bezier(0.68,-0.55,0.27,1.55) infinite,
                 ignyte-pulse-ring 1.4s ease-in-out infinite;
      object-fit: contain;
    }
    #ignyte-loader-text {
      font-family: 'General Sans', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      background: linear-gradient(90deg, #06b6d4, #ec4899, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;
  document.head.appendChild(style);

  const loader = document.createElement("div");
  loader.id = "ignyte-loader";
  loader.innerHTML = `
    <img id="ignyte-logo-spin" src="${ignyteLogoUrl}" alt="IGNYTE" />
    <span id="ignyte-loader-text">IGNYTE</span>
  `;
  document.body.insertBefore(loader, document.body.firstChild);
}

function hideLoader() {
  const loader = document.getElementById("ignyte-loader");
  if (!loader) return;
  loader.classList.add("fade-out");
  setTimeout(() => {
    loader.remove();
    document.getElementById("ignyte-loader-style")?.remove();
  }, 500);
}

// ── App bootstrap ───────────────────────────────────────────────────────────
showLoader();

const router = getRouter();

router.load().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
  hideLoader();
});
