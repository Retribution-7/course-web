import { type A11yFontSize, type A11yScheme, a11y } from "../services/a11y";

const SCHEMES: { value: A11yScheme; label: string; bg: string; fg: string }[] =
	[
		{
			value: "white-black",
			label: "Белый / Чёрный",
			bg: "#ffffff",
			fg: "#000000",
		},
		{
			value: "black-white",
			label: "Чёрный / Белый",
			bg: "#000000",
			fg: "#ffffff",
		},
		{
			value: "black-green",
			label: "Чёрный / Зелёный",
			bg: "#000000",
			fg: "#00ee00",
		},
		{
			value: "beige-brown",
			label: "Бежевый / Коричневый",
			bg: "#f5f0e8",
			fg: "#5c3317",
		},
		{
			value: "blue-darkblue",
			label: "Голубой / Тёмно-синий",
			bg: "#d6eaf8",
			fg: "#1a2e4a",
		},
	];

export const A11yToggle = (): string => `
  <button type="button" data-a11y-btn
          class="relative grid place-items-center size-11 rounded-full
                 bg-bg-first border border-button-first shrink-0
                 transition-transform hover:scale-105"
          aria-label="Версия для слабовидящих"
          aria-expanded="false"
          aria-controls="a11y-panel">
    <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor"
         stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  </button>
`;

const buildPanelHTML = (): string => `
  <div id="a11y-panel" class="a11y-panel-popup a11y-panel-hidden"
       role="dialog" aria-label="Настройки доступности" aria-modal="false">

    <style>
      .ap-section { margin-bottom: 18px; }
      .ap-section:last-child { margin-bottom: 0; }
      .ap-label {
        display: block; margin-bottom: 8px;
        font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
        text-transform: uppercase; color: #888; font-family: sans-serif;
      }
      .ap-header {
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; margin-bottom: 18px;
        padding-bottom: 14px; border-bottom: 1px solid #eee;
      }
      .ap-title {
        font-size: 15px; font-weight: 600; color: #1a1a1a; font-family: sans-serif;
      }
      .ap-toggle-btn {
        flex-shrink: 0; padding: 6px 14px; border-radius: 20px;
        border: 1.5px solid #ffc400; background: transparent;
        font-size: 12px; font-weight: 600; color: #1a1a1a;
        cursor: pointer; font-family: sans-serif; white-space: nowrap;
        transition: background 0.15s;
      }
      .ap-toggle-btn:hover { background: rgba(255,196,0,0.15); }
      .ap-toggle-btn.active { background: #ffc400; }

      .ap-font-group { display: flex; gap: 8px; }
      .ap-font-btn {
        flex: 1; padding: 8px 4px; border-radius: 8px;
        border: 1.5px solid #e0e0e0; background: transparent;
        color: #1a1a1a; cursor: pointer; font-family: sans-serif;
        transition: border-color 0.15s, background 0.15s;
        text-align: center;
      }
      .ap-font-btn:hover { border-color: #ffc400; }
      .ap-font-btn.active { background: #ffc400; border-color: #ffc400; }
      .ap-font-btn[data-a11y-font="normal"]  { font-size: 15px; }
      .ap-font-btn[data-a11y-font="large"]   { font-size: 18px; }
      .ap-font-btn[data-a11y-font="xlarge"]  { font-size: 22px; }

      .ap-scheme-list { display: flex; flex-direction: column; gap: 6px; }
      .ap-scheme-btn {
        display: flex; align-items: center; gap: 10px; width: 100%;
        padding: 8px 12px; border-radius: 8px;
        border: 1.5px solid #e0e0e0; background: transparent;
        font-size: 13px; color: #1a1a1a; cursor: pointer;
        font-family: sans-serif; text-align: left;
        transition: border-color 0.15s, background 0.15s;
      }
      .ap-scheme-btn:hover { border-color: #ffc400; background: rgba(255,196,0,0.06); }
      .ap-scheme-btn.active { border-color: #ffc400; background: rgba(255,196,0,0.12); }
      .ap-swatch {
        display: inline-block; width: 28px; height: 20px;
        border-radius: 4px; flex-shrink: 0;
        border: 1px solid rgba(0,0,0,0.15);
      }

      .ap-img-group { display: flex; gap: 8px; }
      .ap-img-btn {
        flex: 1; padding: 8px; border-radius: 8px;
        border: 1.5px solid #e0e0e0; background: transparent;
        font-size: 13px; color: #1a1a1a; cursor: pointer;
        font-family: sans-serif; text-align: center;
        transition: border-color 0.15s, background 0.15s;
      }
      .ap-img-btn:hover { border-color: #ffc400; }
      .ap-img-btn.active { background: #ffc400; border-color: #ffc400; }

      .ap-reset-btn {
        display: block; width: 100%; padding: 6px;
        background: transparent; border: none;
        font-size: 12px; color: #aaa; cursor: pointer;
        font-family: sans-serif; text-align: center;
        text-decoration: underline; text-underline-offset: 2px;
        transition: color 0.15s;
      }
      .ap-reset-btn:hover { color: #666; }
    </style>

    <div style="padding: 20px;">

      <!-- Заголовок -->
      <div class="ap-header">
        <span class="ap-title">Для слабовидящих</span>
        <button type="button" class="ap-toggle-btn" data-a11y-toggle aria-pressed="false">
          Включить
        </button>
      </div>

      <!-- Размер шрифта -->
      <div class="ap-section">
        <span class="ap-label">Размер шрифта</span>
        <div class="ap-font-group" role="group" aria-label="Размер шрифта">
          <button type="button" class="ap-font-btn" data-a11y-font="normal" aria-pressed="true">А</button>
          <button type="button" class="ap-font-btn" data-a11y-font="large" aria-pressed="false">А+</button>
          <button type="button" class="ap-font-btn" data-a11y-font="xlarge" aria-pressed="false">А++</button>
        </div>
      </div>

      <!-- Цветовая схема -->
      <div class="ap-section">
        <span class="ap-label">Цветовая схема</span>
        <div class="ap-scheme-list" role="group" aria-label="Цветовая схема">
          ${SCHEMES.map(
						(s) => `
          <button type="button" class="ap-scheme-btn" data-a11y-scheme="${s.value}" aria-pressed="false">
            <span class="ap-swatch" style="background:${s.bg};border-color:${s.fg === "#ffffff" ? "#555" : "rgba(0,0,0,0.2)"}">
              <span style="display:block;height:100%;border-radius:3px;background:linear-gradient(to right,${s.bg} 50%,${s.fg} 50%)"></span>
            </span>
            ${s.label}
          </button>`,
					).join("")}
        </div>
      </div>

      <!-- Изображения -->
      <div class="ap-section">
        <span class="ap-label">Изображения</span>
        <div class="ap-img-group" role="group" aria-label="Изображения">
          <button type="button" class="ap-img-btn" data-a11y-images="true" aria-pressed="true">Показать</button>
          <button type="button" class="ap-img-btn" data-a11y-images="false" aria-pressed="false">Скрыть</button>
        </div>
      </div>

      <!-- Сброс -->
      <button type="button" class="ap-reset-btn" data-a11y-reset>
        Сбросить настройки доступности
      </button>

    </div>
  </div>
`;

const getOrCreateOverlay = (): HTMLElement => {
	let overlay = document.getElementById("a11y-overlay");
	if (!overlay) {
		overlay = document.createElement("div");
		overlay.id = "a11y-overlay";
		overlay.style.cssText =
			"display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9099;";
		document.body.appendChild(overlay);
	}
	return overlay;
};

const getPanel = (): HTMLElement | null =>
	document.getElementById("a11y-panel");

const setActive = (el: HTMLElement, active: boolean): void => {
	el.classList.toggle("active", active);
	el.setAttribute("aria-pressed", String(active));
};

const syncPanelUI = (): void => {
	const s = a11y.getSettings();

	const toggleBtn =
		document.querySelector<HTMLButtonElement>("[data-a11y-toggle]");
	if (toggleBtn) {
		toggleBtn.textContent = s.enabled ? "Выключить" : "Включить";
		setActive(toggleBtn, s.enabled);
	}

	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-font]")
		.forEach((btn) => {
			setActive(btn, btn.dataset.a11yFont === s.fontSize);
		});

	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-scheme]")
		.forEach((btn) => {
			setActive(btn, btn.dataset.a11yScheme === s.scheme);
		});

	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-images]")
		.forEach((btn) => {
			const isShow = btn.dataset.a11yImages === "true";
			setActive(btn, isShow ? s.images : !s.images);
		});

	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-btn]")
		.forEach((btn) => {
			if (s.enabled) {
				btn.style.background = "rgba(255,196,0,0.2)";
				btn.style.borderColor = "#ffc400";
			} else {
				btn.style.background = "";
				btn.style.borderColor = "";
			}
		});
};

const MOBILE_BP = 768;

const positionPanel = (trigger: HTMLElement): void => {
	const panel = getPanel();
	if (!panel) return;

	if (window.innerWidth < MOBILE_BP) {
		panel.style.top = "auto";
		panel.style.bottom = "0";
		panel.style.left = "0";
		panel.style.right = "0";
		panel.style.width = "100%";
		panel.style.maxHeight = "85vh";
		panel.style.borderRadius = "16px 16px 0 0";
	} else {
		const rect = trigger.getBoundingClientRect();
		const margin = 8;
		const panelW = 320;

		let left = rect.left;
		if (left + panelW > window.innerWidth - margin) {
			left = window.innerWidth - panelW - margin;
		}

		const spaceBelow = window.innerHeight - rect.bottom - margin;
		if (spaceBelow < 200) {
			panel.style.top = "auto";
			panel.style.bottom = `${window.innerHeight - rect.top + margin}px`;
		} else {
			panel.style.top = `${rect.bottom + margin}px`;
			panel.style.bottom = "auto";
		}

		panel.style.left = `${left}px`;
		panel.style.right = "auto";
		panel.style.width = `${panelW}px`;
		panel.style.maxHeight = "calc(100vh - 80px)";
		panel.style.borderRadius = "16px";
	}
};

const closePanel = (): void => {
	const panel = getPanel();
	if (!panel) return;
	panel.classList.add("a11y-panel-hidden");
	getOrCreateOverlay().style.display = "none";
	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-btn]")
		.forEach((btn) => {
			btn.setAttribute("aria-expanded", "false");
		});
};

const openPanel = (trigger: HTMLElement): void => {
	const panel = getPanel();
	if (!panel) return;

	if (window.innerWidth < MOBILE_BP) {
		const mobileMenu = document.getElementById("mobile-menu");
		const mobileBtn = document.getElementById("mobile-menu-btn");
		if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
			mobileMenu.classList.add("hidden");
			mobileBtn?.setAttribute("aria-expanded", "false");
		}
	}

	positionPanel(trigger);
	panel.classList.remove("a11y-panel-hidden");

	if (window.innerWidth < MOBILE_BP) {
		const overlay = getOrCreateOverlay();
		overlay.style.display = "block";
		overlay.onclick = closePanel;
	}

	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-btn]")
		.forEach((btn) => {
			btn.setAttribute("aria-expanded", "true");
		});
};

export const initA11yPanel = (): void => {
	document.body.insertAdjacentHTML("beforeend", buildPanelHTML());
	const panel = getPanel();
	if (!panel) return;

	syncPanelUI();

	document
		.querySelectorAll<HTMLButtonElement>("[data-a11y-btn]")
		.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				const hidden = panel.classList.contains("a11y-panel-hidden");
				if (hidden) openPanel(btn);
				else closePanel();
			});
		});

	panel
		.querySelector<HTMLButtonElement>("[data-a11y-toggle]")
		?.addEventListener("click", () => {
			a11y.apply({ enabled: !a11y.getSettings().enabled });
			syncPanelUI();
		});

	panel
		.querySelectorAll<HTMLButtonElement>("[data-a11y-font]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				a11y.apply({ fontSize: btn.dataset.a11yFont as A11yFontSize });
				syncPanelUI();
			});
		});

	panel
		.querySelectorAll<HTMLButtonElement>("[data-a11y-scheme]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				a11y.apply({ scheme: btn.dataset.a11yScheme as A11yScheme });
				syncPanelUI();
			});
		});

	panel
		.querySelectorAll<HTMLButtonElement>("[data-a11y-images]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				a11y.apply({ images: btn.dataset.a11yImages === "true" });
				syncPanelUI();
			});
		});

	panel
		.querySelector<HTMLButtonElement>("[data-a11y-reset]")
		?.addEventListener("click", () => {
			a11y.reset();
			syncPanelUI();
		});

	document.addEventListener("click", (e) => {
		if (panel.classList.contains("a11y-panel-hidden")) return;
		const t = e.target as HTMLElement;
		if (!panel.contains(t) && !t.closest("[data-a11y-btn]")) closePanel();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closePanel();
	});

	window.addEventListener("resize", () => {
		if (!panel.classList.contains("a11y-panel-hidden")) closePanel();
	});

	a11y.onChange(syncPanelUI);
};
