import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

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

router.load().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );

  hideLoader();
});
