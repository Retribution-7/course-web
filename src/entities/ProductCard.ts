import { isAuthenticated } from "../services/auth";
import { favorites } from "../services/favorites";
import {
	SPEC_LABEL_I18N_KEY,
	t,
	translateSurface,
	translateTitle,
} from "../services/i18n";
import { showToast } from "../shared/ui/toast";
import type { Product } from "./products";

export const COLOR_OPTIONS = [
	"RAL 3005",
	"RAL 3011",
	"RAL 5005",
	"RAL 6005",
	"RAL 6020",
	"RAL 7004",
	"RAL 7024",
	"RAL 8017",
	"RAL 9005",
	"Оцинкованный",
	"Антрацит",
] as const;

export const THICKNESS_OPTIONS = [
	"0,35",
	"0,4",
	"0,45",
	"0,5",
	"0,55",
	"0,7",
	"0,8",
] as const;

export const SURFACE_OPTIONS = [
	"Полиэстер",
	"Матовая",
	"Глянцевая",
	"Структурная",
] as const;

const DROPDOWN_I18N = Object.freeze({
	color: "calc-color-label",
	thickness: "calc-thickness-label",
	surface: "calc-surface-label",
} as Record<string, string>);

export const Dropdown = (
	label: string,
	value: string,
	options: readonly string[],
	name: string,
): string => {
	const isSurface = name === "surface";
	const displayValue = isSurface ? translateSurface(value) : value;

	const items = options
		.map((option) => {
			const displayOption = isSurface ? translateSurface(option) : option;
			const surfaceAttr = isSurface ? ` data-i18n-surface="${option}"` : "";
			return `
        <li>
          <button type="button"
                  class="product-dropdown__option block w-full text-left px-[10px] py-1.5
                         font-sans text-[13px] leading-[1.3] text-primary
                         hover:bg-bg-first transition-colors cursor-pointer
                         ${option === value ? "bg-bg-first" : ""}"
                  data-value="${option}"${surfaceAttr}>
            ${displayOption}
          </button>
        </li>
      `;
		})
		.join("");

	const labelKey = DROPDOWN_I18N[name];
	const surfaceValueAttr = isSurface ? ` data-i18n-surface="${value}"` : "";
	return `
    <div class="product-dropdown flex flex-col gap-[6px]" data-dropdown="${name}">
      <span class="font-sans font-normal text-[13px] leading-[1.3] text-primary"${labelKey ? ` data-i18n="${labelKey}"` : ""}>${label}</span>
      <div class="relative w-[152px]">
        <button type="button"
                class="product-dropdown__toggle relative h-7 w-full rounded-[5px] border border-primary/20 bg-surface
                       text-left cursor-pointer transition-colors hover:border-button-first
                       focus:outline-none focus:border-button-first"
                aria-haspopup="listbox"
                aria-expanded="false">
          <span class="product-dropdown__value absolute left-[10px] top-1/2 -translate-y-1/2
                       font-sans text-[13px] leading-[1.3] text-primary whitespace-nowrap"
                data-value="${value}"${surfaceValueAttr}>${displayValue}</span>
          <svg class="product-dropdown__caret absolute right-[10px] top-1/2 -translate-y-1/2 size-[9px] text-primary transition-transform"
               viewBox="0 0 9 6" fill="currentColor" aria-hidden="true">
            <path d="M0 0l4.5 6L9 0z"/>
          </svg>
        </button>
        <ul class="product-dropdown__menu hidden absolute left-0 right-0 top-[calc(100%+4px)] z-10
                   max-h-[180px] overflow-y-auto rounded-[5px] border border-primary/20 bg-surface
                   shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-1"
            role="listbox">
          ${items}
        </ul>
      </div>
    </div>
  `;
};

export const ProductCard = (product: Product, index: number): string => {
	return `
    <article class="bg-surface rounded-[14px] card-shadow p-6 flex flex-col gap-[23px] transition-colors duration-300"
             data-category="${product.category}"
             data-product-id="${index}"
             data-product-title="${product.title}"
             data-product-price="${product.price}"
             data-product-image="${product.image}">

      <div class="relative h-[260px] w-full overflow-hidden rounded-[8px]">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="size-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        >
        <button type="button"
                class="product-favorite absolute top-3 right-3 grid size-10 place-items-center
                       rounded-full bg-surface/95 backdrop-blur-sm
                       shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                       text-primary transition-all duration-200 hover:scale-110 cursor-pointer"
                data-action="favorite-toggle"
                data-product-id="${index}"
                aria-label="${t("card-add-favorite")}"
                data-i18n-aria-label="card-add-favorite"
                aria-pressed="false">
          <svg class="product-favorite__icon size-5" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true">
            <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z"/>
          </svg>
        </button>
      </div>

      <h3 class="font-sans font-normal text-[20px] leading-[1.2] tracking-[0.04em] text-primary"
          data-i18n-title="${product.title}">
        ${translateTitle(product.title)}
      </h3>

      <dl class="grid grid-cols-[1fr_auto] gap-x-6 gap-y-[5px] font-sans text-[13px] leading-[1.3] text-primary">
        <dt data-i18n="card-brand">${t("card-brand")}</dt><dd class="text-right">${product.brand}</dd>
        <dt data-i18n="${SPEC_LABEL_I18N_KEY[product.specs[0].label] ?? ""}">${t(SPEC_LABEL_I18N_KEY[product.specs[0].label] ?? product.specs[0].label)}</dt><dd class="text-right">${product.specs[0].value}</dd>
        <dt data-i18n="${SPEC_LABEL_I18N_KEY[product.specs[1].label] ?? ""}">${t(SPEC_LABEL_I18N_KEY[product.specs[1].label] ?? product.specs[1].label)}</dt><dd class="text-right">${product.specs[1].value}</dd>
      </dl>

      <div class="flex items-end gap-[7px] font-sans">
        <span class="text-[13px] leading-[1.3] text-text-third" data-i18n="product-price-from">${t("product-price-from")}</span>
        <span class="text-[20px] leading-none text-primary">${product.price}</span>
        <span class="text-[20px] leading-none text-primary tracking-[-0.05em]">₽ / м²</span>
      </div>

      <div class="flex flex-col gap-[15px]">
        ${Dropdown(t("calc-color-label"), product.color, COLOR_OPTIONS, "color")}
        ${Dropdown(t("calc-thickness-label"), product.thickness, THICKNESS_OPTIONS, "thickness")}
        ${Dropdown(t("calc-surface-label"), product.surface, SURFACE_OPTIONS, "surface")}
      </div>

      <div class="flex flex-col gap-[15px] mt-auto">
        <button type="button"
                data-action="calculate"
                class="self-start inline-flex items-center justify-center rounded-full
                       bg-gradient-to-r from-button-first to-button-second
                       px-6 py-[15px] font-sans text-[17px] leading-[1.8] text-primary
                       transition-all duration-300 hover:scale-[1.02] cursor-pointer
                       shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
          <span data-i18n="product-calculate">${t("product-calculate")}</span>
        </button>
        <a href="#product/${index}"
           class="self-start inline-flex items-center justify-center rounded-full
                  bg-bg-first border border-button-first
                  px-6 py-[15px] font-sans text-[17px] leading-[1.8] text-primary
                  transition-colors duration-200 hover:bg-surface cursor-pointer no-underline">
          <span data-i18n="card-more">${t("card-more")}</span>
        </a>
      </div>

    </article>
  `;
};

export const syncFavoriteButtons = (): void => {
	document
		.querySelectorAll<HTMLElement>(".product-favorite")
		.forEach((button) => {
			const id = Number.parseInt(button.dataset.productId ?? "", 10);
			if (Number.isNaN(id)) return;
			const isFav = favorites.has(id);
			const icon = button.querySelector<SVGElement>(".product-favorite__icon");
			if (isFav) {
				button.classList.add("text-button-first");
				button.classList.remove("text-primary");
				icon?.setAttribute("fill", "currentColor");
				button.setAttribute("aria-pressed", "true");
				button.setAttribute("aria-label", t("card-remove-favorite"));
			} else {
				button.classList.remove("text-button-first");
				button.classList.add("text-primary");
				icon?.setAttribute("fill", "none");
				button.setAttribute("aria-pressed", "false");
				button.setAttribute("aria-label", t("card-add-favorite"));
			}
		});
};

export const initProductCards = (): void => {
	const closeAll = (except?: Element): void => {
		document
			.querySelectorAll<HTMLElement>(".product-dropdown")
			.forEach((dropdown) => {
				if (dropdown === except) return;
				const menu = dropdown.querySelector<HTMLElement>(
					".product-dropdown__menu",
				);
				const toggle = dropdown.querySelector<HTMLElement>(
					".product-dropdown__toggle",
				);
				const caret = dropdown.querySelector<HTMLElement>(
					".product-dropdown__caret",
				);
				menu?.classList.add("hidden");
				toggle?.setAttribute("aria-expanded", "false");
				caret?.classList.remove("rotate-180");
			});
	};

	document.addEventListener("click", (event) => {
		const target = event.target as HTMLElement;

		const favBtn = target.closest<HTMLElement>(
			'[data-action="favorite-toggle"]',
		);
		if (favBtn) {
			event.preventDefault();
			event.stopPropagation();
			if (!isAuthenticated()) {
				window.location.hash = "#auth";
				return;
			}
			const id = Number.parseInt(favBtn.dataset.productId ?? "", 10);
			if (Number.isNaN(id)) return;
			const card = favBtn.closest<HTMLElement>("article[data-product-title]");
			const name = translateTitle(
				card?.dataset.productTitle ?? t("card-product-name"),
			);
			void favorites.toggle(id).then((added) => {
				showToast(
					added
						? `«${name}» ${t("card-toast-added")}`
						: `«${name}» ${t("card-toast-removed")}`,
					{ type: added ? "success" : "info" },
				);
			});
			return;
		}

		const toggle = target.closest<HTMLElement>(".product-dropdown__toggle");
		if (toggle) {
			const dropdown = toggle.closest<HTMLElement>(".product-dropdown");
			if (!dropdown) return;
			const menu = dropdown.querySelector<HTMLElement>(
				".product-dropdown__menu",
			);
			const caret = dropdown.querySelector<HTMLElement>(
				".product-dropdown__caret",
			);
			const willOpen = menu?.classList.contains("hidden") ?? false;
			closeAll(willOpen ? dropdown : undefined);
			if (willOpen) {
				menu?.classList.remove("hidden");
				toggle.setAttribute("aria-expanded", "true");
				caret?.classList.add("rotate-180");
			}
			return;
		}

		const option = target.closest<HTMLElement>(".product-dropdown__option");
		if (option) {
			const dropdown = option.closest<HTMLElement>(".product-dropdown");
			const valueEl = dropdown?.querySelector<HTMLElement>(
				".product-dropdown__value",
			);
			const value = option.dataset.value ?? "";
			if (valueEl) {
				const isSurface = dropdown?.dataset.dropdown === "surface";
				valueEl.textContent = isSurface ? translateSurface(value) : value;
				valueEl.dataset.value = value;
				if (isSurface) valueEl.dataset.i18nSurface = value;
			}
			dropdown
				?.querySelectorAll<HTMLElement>(".product-dropdown__option")
				.forEach((opt) => {
					opt.classList.toggle("bg-bg-first", opt === option);
				});
			closeAll();
			return;
		}

		closeAll();
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeAll();
	});

	syncFavoriteButtons();
	favorites.onChange(syncFavoriteButtons);
};
