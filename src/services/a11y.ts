import {
	SMALL_IMAGE_MAX_HEIGHT,
	SMALL_IMAGE_MAX_WIDTH,
} from "../shared/lib/constants";

const STORAGE_KEY = "a11y";

const ALL_SCHEME_CLASSES = [
	"a11y-scheme-white-black",
	"a11y-scheme-black-white",
	"a11y-scheme-black-green",
	"a11y-scheme-beige-brown",
	"a11y-scheme-blue-darkblue",
] as const;

export type A11yFontSize = "normal" | "large" | "xlarge";
export type A11yScheme =
	(typeof ALL_SCHEME_CLASSES)[number] extends `a11y-scheme-${infer S}`
		? S
		: never;

export interface A11ySettings {
	enabled: boolean;
	fontSize: A11yFontSize;
	scheme: A11yScheme;
	images: boolean;
}

const DEFAULTS: A11ySettings = {
	enabled: false,
	fontSize: "normal",
	scheme: "white-black",
	images: true,
};

const getSettings = (): A11ySettings => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { ...DEFAULTS };
		const parsed = JSON.parse(raw) as Partial<A11ySettings>;
		return { ...DEFAULTS, ...parsed };
	} catch {
		return { ...DEFAULTS };
	}
};

const saveSettings = (s: A11ySettings): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
};

const IMAGE_SELECTOR = 'img:not([aria-hidden="true"])';

const ensurePlaceholder = (img: HTMLImageElement): void => {
	if ((img.nextElementSibling as HTMLElement | null)?.dataset?.a11yPlaceholder)
		return;
	const ph = document.createElement("span");
	ph.className = "a11y-img-placeholder";
	ph.dataset.a11yPlaceholder = "1";
	// Snapshot dimensions before the image is hidden so the placeholder fits its slot
	const w = img.offsetWidth;
	const h = img.offsetHeight;
	if (w > 0) ph.style.width = `${w}px`;
	if (h > 0) ph.style.height = `${h}px`;
	ph.style.maxWidth = "100%";
	// Only show text for images large enough to fit it; small icons get an empty dashed box
	const isSmall =
		(w > 0 && w < SMALL_IMAGE_MAX_WIDTH) ||
		(h > 0 && h < SMALL_IMAGE_MAX_HEIGHT);
	if (!isSmall) ph.textContent = img.alt || "Изображение";
	img.insertAdjacentElement("afterend", ph);
};

const removePlaceholder = (img: HTMLImageElement): void => {
	const next = img.nextElementSibling as HTMLElement | null;
	if (next?.dataset?.a11yPlaceholder) next.remove();
};

const applyImageVisibility = (hide: boolean): void => {
	document.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR).forEach((img) => {
		if (hide) {
			ensurePlaceholder(img);
			img.style.display = "none";
		} else {
			img.style.display = "";
			removePlaceholder(img);
		}
	});

	const banner = document.getElementById("a11y-images-banner");
	if (banner) {
		if (hide) {
			banner.setAttribute("data-active", "");
		} else {
			banner.removeAttribute("data-active");
		}
	}
};

const applyToDOM = (s: A11ySettings): void => {
	const html = document.documentElement;

	html.classList.toggle("a11y", s.enabled);

	html.classList.remove("a11y-font-large", "a11y-font-xlarge");
	if (s.enabled) {
		if (s.fontSize === "large") html.classList.add("a11y-font-large");
		if (s.fontSize === "xlarge") html.classList.add("a11y-font-xlarge");
	}

	ALL_SCHEME_CLASSES.forEach((cls) => {
		html.classList.remove(cls);
	});
	if (s.enabled) {
		html.classList.add(`a11y-scheme-${s.scheme}`);
	}

	applyImageVisibility(s.enabled && !s.images);
};

let imageObserver: MutationObserver | null = null;

export const a11y = {
	getSettings,

	apply(partial: Partial<A11ySettings>): void {
		const current = getSettings();
		const next = { ...current, ...partial };
		saveSettings(next);
		applyToDOM(next);
		window.dispatchEvent(new CustomEvent("a11y:change"));
	},

	reset(): void {
		localStorage.removeItem(STORAGE_KEY);
		applyToDOM({ ...DEFAULTS });
		window.dispatchEvent(new CustomEvent("a11y:change"));
	},

	applyFromStorage(): void {
		const s = getSettings();
		applyImageVisibility(s.enabled && !s.images);
	},

	observeImages(): void {
		if (imageObserver) return;
		imageObserver = new MutationObserver(() => {
			const s = getSettings();
			if (s.enabled && !s.images) {
				applyImageVisibility(true);
			}
		});
		const target = document.getElementById("app") ?? document.body;
		imageObserver.observe(target, { childList: true, subtree: true });
	},

	onChange(handler: () => void): () => void {
		window.addEventListener("a11y:change", handler);
		return () => window.removeEventListener("a11y:change", handler);
	},
};
