import { ProductCard, syncFavoriteButtons } from "../entities/ProductCard";
import { fetchProductsByIds } from "../services/api";
import { favorites } from "../services/favorites";
import type { Product } from "../entities/products";
import { t, getCurrentLang } from "../services/i18n";

const renderEmpty = (): string => `
  <div class="bg-surface rounded-[14px] card-shadow p-10 lg:p-16 text-center transition-colors duration-300">
    <div class="mx-auto mb-6 grid size-20 place-items-center rounded-full gradient-icon
                shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)]
                border border-[rgba(255,196,0,0.3)]">
      <svg viewBox="0 0 24 24" class="size-10 text-primary" fill="none" stroke="currentColor"
           stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z"/>
      </svg>
    </div>
    <h3 class="font-sans font-normal text-[24px] leading-[1.2] gradient-text">
      ${t("favorites-empty-title")}
    </h3>
    <p class="mt-3 font-sans text-[14px] sm:text-[15px] leading-[1.5] text-primary">
      ${t("favorites-empty-desc")}
    </p>
    <a href="#catalog"
       class="mt-8 inline-flex items-center justify-center rounded-full
              bg-gradient-to-r from-button-first to-button-second
              px-6 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-primary
              transition-all duration-300 hover:scale-[1.02] cursor-pointer
              shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] no-underline">
      ${t("favorites-to-catalog")}
    </a>
  </div>
`;

const pluralItems = (n: number): string => {
  if (getCurrentLang() === "en") return `${n} item${n !== 1 ? "s" : ""}`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} товар`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} товара`;
  return `${n} товаров`;
};

export const FavoritesPage = (): string => `
  <section id="favorites-page"
           class="hidden bg-bg-first py-10 lg:py-16 min-h-[60vh] transition-colors duration-300"
           aria-labelledby="favorites-heading">
    <div class="container-main">

      <a href="#catalog"
         class="inline-flex items-center gap-2 font-sans text-[14px] lg:text-[15px]
                text-primary hover:text-button-first transition-colors mb-6 lg:mb-10">
        <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M10 3l-5 5 5 5"/>
        </svg>
        <span data-i18n="favorites-to-catalog">В каталог</span>
      </a>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6 mb-6 lg:mb-10">
        <div>
          <h1 id="favorites-heading"
              data-i18n="favorites-heading"
              class="font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[48px] xl:text-[56px] xl:leading-[1.15] gradient-text">
            ИЗБРАННОЕ
          </h1>
          <p id="favorites-summary"
             class="mt-2 font-sans text-[14px] sm:text-[15px] leading-[1.4] text-primary"></p>
        </div>
        <button type="button"
                id="favorites-clear"
                data-i18n="favorites-clear-btn"
                class="hidden self-start sm:self-auto inline-flex items-center justify-center rounded-full
                       bg-bg-first border border-button-first
                       px-5 lg:px-6 py-2.5 lg:py-3 font-sans text-[14px] lg:text-[15px] text-primary
                       hover:bg-surface transition-colors cursor-pointer">
          Очистить
        </button>
      </div>

      <div id="favorites-content"></div>
    </div>
  </section>
`;

const render = async (): Promise<void> => {
  const content = document.getElementById("favorites-content");
  const summary = document.getElementById("favorites-summary");
  const clearBtn = document.getElementById("favorites-clear");
  if (!content || !summary || !clearBtn) return;

  const ids = favorites.list();

  if (ids.length === 0) {
    content.innerHTML = renderEmpty();
    summary.textContent = t("favorites-nothing");
    clearBtn.classList.add("hidden");
    return;
  }

  content.innerHTML = `
    <div class="col-span-full flex justify-center py-16">
      <span class="font-sans text-[15px] text-text-third">${t("favorites-loading")}</span>
    </div>
  `;

  let items: Product[];
  try {
    items = await fetchProductsByIds(ids);
  } catch {
    content.innerHTML = `
      <div class="col-span-full text-center py-16 font-sans text-[15px] text-text-third">
        ${t("favorites-error")}
      </div>
    `;
    return;
  }

  if (items.length === 0) {
    content.innerHTML = renderEmpty();
    summary.textContent = t("favorites-nothing");
    clearBtn.classList.add("hidden");
    return;
  }

  content.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      ${items.map((p) => ProductCard(p, p.id ?? 0)).join("")}
    </div>
  `;
  const n = items.length;
  summary.textContent = getCurrentLang() === "en"
    ? `${n} item${n !== 1 ? "s" : ""} in favorites`
    : `${pluralItems(n)} в избранном`;
  clearBtn.classList.remove("hidden");
  syncFavoriteButtons();
};

const showPage = (show: boolean): void => {
  const page = document.getElementById("favorites-page");
  if (!page) return;
  page.classList.toggle("hidden", !show);
  if (show) {
    void render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleRoute = (): void => {
  showPage(window.location.hash === "#favorites");
};

export const initFavoritesPage = (): void => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);
  favorites.onChange(() => {
    if (window.location.hash === "#favorites") void render();
  });

  document.getElementById("favorites-clear")?.addEventListener("click", () => {
    if (confirm(t("favorites-clear-confirm"))) favorites.clear();
  });
};
