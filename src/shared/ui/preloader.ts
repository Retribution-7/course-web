import { PRELOADER_FADE_DURATION_MS } from "../lib/constants";

const PRELOADER_ID = "app-preloader";

export const hidePreloader = (): void => {
  const el = document.getElementById(PRELOADER_ID);
  if (!el) return;
  el.style.opacity = "0";
  el.style.pointerEvents = "none";
  window.setTimeout(() => el.remove(), PRELOADER_FADE_DURATION_MS);
};

export const showPreloader = (): void => {
  let el = document.getElementById(PRELOADER_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = PRELOADER_ID;
    el.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#fff;transition:opacity .3s ease;";
    el.innerHTML =
      '<div style="width:56px;height:56px;border:4px solid rgba(255,196,0,0.25);border-top-color:#FFC400;border-radius:50%;animation:apl-spin 1s linear infinite;"></div>';
    document.body.appendChild(el);
  }
  el.style.opacity = "1";
  el.style.pointerEvents = "auto";
};
