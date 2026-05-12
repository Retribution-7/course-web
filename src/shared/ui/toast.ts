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
  container.className =
    "fixed bottom-5 right-5 z-[9000] flex flex-col gap-2 pointer-events-none";
  document.body.appendChild(container);
  return container;
};

export const showToast = (
  message: string,
  options: ToastOptions = {},
): void => {
  const type = options.type ?? "success";
  const duration = options.duration ?? 2500;
  const accent = COLOR[type];
  const icon = ICON[type];

  const root = ensureContainer();
  const toast = document.createElement("div");
  toast.className =
    "pointer-events-auto bg-white rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] " +
    "px-4 py-3 flex items-center gap-3 min-w-[220px] max-w-[360px] " +
    "font-sans text-[14px] leading-[1.3] text-[#44444E] " +
    "opacity-0 translate-y-2 transition-all duration-300";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <span class="grid place-items-center size-6 rounded-full text-white font-medium text-[13px] shrink-0"
          style="background:${accent}" aria-hidden="true">${icon}</span>
    <span class="flex-1">${message}</span>
  `;
  root.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-2");
  });

  window.setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    window.setTimeout(() => toast.remove(), 300);
  }, duration);
};
