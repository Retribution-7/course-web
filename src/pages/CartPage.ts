import { type CartItem, cart } from "../services/cart";
import { t, translateSurface, translateTitle } from "../services/i18n";
import { SCROLL_DELAY_MS } from "../shared/lib/constants";
import { showConfirm } from "../shared/ui/ConfirmModal";
import { EmptyState } from "../shared/ui/EmptyState";
import { showToast } from "../shared/ui/toast";
import { formatRub } from "../shared/utils/format";
import { pluralize } from "../shared/utils/pluralize";
import { createPageRouter } from "../shared/lib/page";

const renderItem = (item: CartItem): string => `
  <article class="bg-surface rounded-[14px] card-shadow p-5 lg:p-6 transition-colors duration-300
                  grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-5 md:gap-6 items-start"
           data-cart-id="${item.id}">

    <div class="h-[120px] w-full md:w-[120px] overflow-hidden rounded-[8px] shrink-0">
      <img src="${item.image}" alt="${item.title}" class="size-full object-cover" loading="lazy">
    </div>

    <div class="flex flex-col gap-2">
      <h3 class="font-sans font-normal text-[18px] lg:text-[20px] leading-[1.2] text-primary">
        ${translateTitle(item.title)}
      </h3>
      <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-sans text-[13px] leading-[1.3] text-primary">
        <dt class="text-text-third">${t("cart-color")}</dt><dd>${item.color}</dd>
        <dt class="text-text-third">${t("cart-thickness")}</dt><dd>${item.thickness}</dd>
        <dt class="text-text-third">${t("cart-surface")}</dt><dd>${translateSurface(item.surface)}</dd>
        <dt class="text-text-third">${t("cart-area")}</dt><dd>${item.area} м²</dd>
        ${item.installation ? `<dt class="text-text-third">${t("cart-installation-label")}</dt><dd>${t("cart-installation-included")}</dd>` : ""}
        ${item.delivery ? `<dt class="text-text-third">${t("cart-delivery-label")}</dt><dd>${t("cart-delivery-included")}</dd>` : ""}
      </dl>
    </div>

    <div class="flex md:flex-col items-center md:items-end justify-between gap-3 md:gap-2 w-full md:w-auto">
      <span class="font-sans text-[20px] lg:text-[24px] leading-none text-primary whitespace-nowrap">
        ${formatRub(item.total)}
      </span>
      <button type="button"
              data-action="cart-remove"
              data-id="${item.id}"
              class="grid size-9 place-items-center rounded-full border border-primary/20
                     text-primary hover:border-button-first hover:text-button-first
                     transition-colors cursor-pointer"
              aria-label="Удалить из корзины">
        <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 4h10M6.5 4V2.5a1 1 0 011-1h1a1 1 0 011 1V4M4.5 4l.5 9a1 1 0 001 1h5a1 1 0 001-1l.5-9M6.5 7v5M9.5 7v5"/>
        </svg>
      </button>
    </div>
  </article>
`;

const renderEmpty = (): string =>
	EmptyState({
		icon: `<img src="/icons/cart.svg" alt="" class="size-10" aria-hidden="true">`,
		title: t("cart-empty-title"),
		description: t("cart-empty-desc"),
		action: `<a href="#catalog"
       data-action="cart-back"
       class="inline-flex items-center justify-center rounded-full
              bg-gradient-to-r from-button-first to-button-second
              px-6 py-[15px] font-sans text-[17px] leading-[1.4] text-primary
              transition-all duration-300 hover:scale-[1.02] cursor-pointer
              shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
      ${t("cart-to-catalog")}
    </a>`,
	});

export const CartPage = (): string => `
  <section id="cart-page"
           class="hidden bg-bg-first py-14 lg:py-20 min-h-[60vh] transition-colors duration-300"
           aria-labelledby="cart-heading">
    <div class="container-main">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <h2 id="cart-heading"
            data-i18n="cart-heading"
            class="font-sans font-normal text-[32px] leading-[1.2] sm:text-[40px] xl:text-[56px] xl:leading-[68px] gradient-text">
          КОРЗИНА
        </h2>
        <a href="#catalog"
           data-action="cart-back"
           data-i18n="cart-back"
           class="font-sans text-[15px] lg:text-[17px] text-primary underline underline-offset-4 hover:text-button-first transition-colors">
          ← Продолжить покупки
        </a>
      </div>

      <div id="cart-content" class="mt-8 lg:mt-12 flex flex-col gap-4 lg:gap-5"></div>

      <div id="cart-summary"
           class="hidden mt-8 lg:mt-12 bg-surface rounded-[14px] card-shadow p-6 lg:p-8 transition-colors duration-300
                  flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div class="flex flex-col gap-1">
          <span class="font-sans text-[13px] leading-[1.3] text-text-third">
            <span id="cart-count"></span>
          </span>
          <span data-i18n="cart-total-label" class="font-sans text-[15px] text-primary">Итого к оплате</span>
          <span id="cart-total" class="font-sans text-[28px] lg:text-[32px] leading-none gradient-text"></span>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <button type="button"
                  data-action="cart-clear"
                  class="inline-flex items-center justify-center rounded-full
                         bg-bg-first border border-button-first
                         px-6 py-[15px] font-sans text-[15px] lg:text-[17px] text-primary
                         transition-colors duration-200 hover:bg-surface cursor-pointer">
            <span data-i18n="cart-clear">Очистить корзину</span>
          </button>
          <button type="button"
                  data-action="cart-checkout"
                  class="inline-flex items-center justify-center rounded-full
                         bg-gradient-to-r from-button-first to-button-second
                         px-8 py-[15px] font-sans text-[15px] lg:text-[17px] text-primary
                         transition-all duration-300 hover:scale-[1.02] cursor-pointer
                         shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
            <span data-i18n="cart-checkout">Оформить заказ</span>
          </button>
        </div>
      </div>
    </div>
  </section>
`;

const pluralCount = (n: number): string =>
	pluralize(n, ["товар", "товара", "товаров"], "item");

const render = (): void => {
	const content = document.getElementById("cart-content");
	const summary = document.getElementById("cart-summary");
	if (!content || !summary) return;

	const items = cart.list();
	if (items.length === 0) {
		content.innerHTML = renderEmpty();
		summary.classList.add("hidden");
		return;
	}

	content.innerHTML = items.map(renderItem).join("");
	summary.classList.remove("hidden");

	const totalEl = document.getElementById("cart-total");
	const countEl = document.getElementById("cart-count");
	if (totalEl) totalEl.textContent = formatRub(cart.total());
	if (countEl) countEl.textContent = pluralCount(items.length);
};

export const initCartPage = (): void => {
	const handleRoute = createPageRouter("cart-page", "#cart", render);
	handleRoute();
	window.addEventListener("hashchange", handleRoute);
	cart.onChange(() => {
		if (window.location.hash === "#cart") render();
	});

	document.addEventListener("click", async (event) => {
		const target = event.target as HTMLElement;

		const remove = target.closest<HTMLElement>('[data-action="cart-remove"]');
		if (remove) {
			const id = remove.dataset.id;
			if (id) void cart.remove(id);
			return;
		}

		if (target.closest('[data-action="cart-clear"]')) {
			if (await showConfirm(t("cart-clear-confirm"))) void cart.clear();
			return;
		}

		if (target.closest('[data-action="cart-checkout"]')) {
			showToast(t("cart-checkout-thanks"), { type: "success" });
			void cart.clear().then(() => {
				window.location.hash = "";
				setTimeout(() => {
					document
						.getElementById("consultation")
						?.scrollIntoView({ behavior: "smooth" });
				}, SCROLL_DELAY_MS);
			});
			return;
		}
	});
};
