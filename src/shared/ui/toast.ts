import { TOAST_FADE_DURATION_MS } from "../lib/constants";

type ToastType = "success" | "info" | "warning" | "error";

interface ToastOptions {
	type?: ToastType;
	duration?: number;
}

const COLOR: Record<ToastType, string> = {
	success: "#22C55E",
	info: "#FFC400",
	warning: "#F59E0B",
	error: "#EF4444",
};

const ICON: Record<ToastType, string> = {
	success: "✓",
	info: "i",
	warning: "!",
	error: "✕",
};

let container: HTMLElement | null = null;

const ensureContainer = (): HTMLElement => {
	if (container && document.body.contains(container)) return container;
	container = document.createElement("div");
	container.id = "toast-container";
	container.style.cssText =
		"position:fixed;bottom:20px;right:20px;z-index:9000;display:flex;flex-direction:column;gap:8px;pointer-events:none;";
	document.body.appendChild(container);
	return container;
};

export const showToast = (
	message: string,
	options: ToastOptions = {},
): void => {
	const type = options.type ?? "success";
	const duration = options.duration ?? 3000;
	const accent = COLOR[type];
	const icon = ICON[type];

	const root = ensureContainer();
	const toast = document.createElement("div");
	toast.style.cssText =
		"pointer-events:auto;background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.12);padding:12px 16px;display:flex;align-items:center;gap:12px;min-width:220px;max-width:360px;font-family:sans-serif;font-size:14px;line-height:1.3;color:#44444E;";
	toast.setAttribute("role", "status");
	toast.innerHTML = `
    <span style="display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:${accent};color:#fff;font-size:13px;font-weight:500;flex-shrink:0;" aria-hidden="true">${icon}</span>
    <span style="flex:1;">${message}</span>
  `;
	root.appendChild(toast);

	window.setTimeout(() => {
		toast.style.opacity = "0";
		toast.style.transform = "translateY(8px)";
		toast.style.transition = "opacity 300ms, transform 300ms";
		window.setTimeout(() => toast.remove(), TOAST_FADE_DURATION_MS);
	}, duration);
};
