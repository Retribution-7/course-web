import {
  initProductCards,
  ProductCard,
  syncFavoriteButtons,
} from "../entities/ProductCard";
import type { ProductFilters } from "../services/api";
import { fetchProducts } from "../services/api";
import { t } from "../services/i18n";
import { SEARCH_DEBOUNCE_MS } from "../shared/lib/constants";

type CategoryKey = "metal-tile" | "corrugated-sheet" | "seam-roofing";
type TabKey = "all" | CategoryKey;

const tabs: { key: TabKey; label: string; i18nKey: string }[] = [
  { key: "all", label: "Все материалы", i18nKey: "catalog-tab-all" },
  {
    key: "metal-tile",
    label: "Металлочерепица",
    i18nKey: "catalog-tab-metal-tile",
  },
  {
    key: "corrugated-sheet",
    label: "Профнастил",
    i18nKey: "catalog-tab-corrugated",
  },
  {
    key: "seam-roofing",
    label: "Фальцевая кровля",
    i18nKey: "catalog-tab-seam",
  },
];

const sortOptions: { value: string; label: string; i18nKey: string }[] = [
  { value: "", label: "По умолчанию", i18nKey: "catalog-sort-default" },
  {
    value: "price:asc",
    label: "Цена: по возрастанию",
    i18nKey: "catalog-sort-price-asc",
  },
  {
    value: "price:desc",
    label: "Цена: по убыванию",
    i18nKey: "catalog-sort-price-desc",
  },
  {
    value: "title:asc",
    label: "Название: А → Я",
    i18nKey: "catalog-sort-name-asc",
  },
  {
    value: "title:desc",
    label: "Название: Я → А",
    i18nKey: "catalog-sort-name-desc",
  },
];

export const Catalog = (): string => `
  <section class="bg-bg-first py-14 lg:py-20 transition-colors duration-300" id="catalog" aria-labelledby="catalog-heading">
    <div class="container-main">

      <h2 id="catalog-heading"
          data-i18n="catalog-heading"
          class="font-sans font-normal text-[32px] leading-[1.2] sm:text-[40px] xl:text-[56px] xl:leading-[68px] gradient-text">
        КАТАЛОГ ТОВАРОВ
      </h2>

      <div class="flex flex-col sm:flex-row gap-3 mt-8 lg:mt-12">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 size-[18px] text-text-third pointer-events-none"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            id="catalog-search"
            type="search"
            placeholder="Поиск по названию..."
            data-i18n-placeholder="catalog-search-placeholder"
            autocomplete="off"
            class="w-full h-[46px] pl-10 pr-4 rounded-full border border-button-first bg-surface
                   font-sans text-[15px] text-primary placeholder-text-third
                   focus:outline-none focus:ring-2 focus:ring-button-first/40
                   transition-shadow"
          />
        </div>
        <select
          id="catalog-sort"
          class="h-[46px] px-4 pr-9 rounded-full border border-button-first bg-surface
                 font-sans text-[15px] text-primary cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-button-first/40
                 appearance-none transition-shadow"
          style="background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M0 0l6 8 6-8z' fill='%2344444E'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 14px center"
          aria-label="Сортировка">
          ${sortOptions.map((o) => `<option value="${o.value}" data-i18n="${o.i18nKey}">${o.label}</option>`).join("")}
        </select>
      </div>

      <div class="flex flex-wrap gap-3 lg:gap-[15px] mt-6 lg:mt-8" role="tablist" aria-label="Категории товаров">
        ${tabs
          .map(
            (tab, idx) => `
          <button
            class="catalog-tab font-sans font-normal text-[15px] sm:text-[17px] xl:text-[22px] xl:leading-[30px] text-primary
                   px-4 py-2.5 lg:px-6 lg:py-[15px] rounded-full border border-button-first bg-surface
                   transition-colors duration-200 cursor-pointer whitespace-nowrap
                   ${idx === 0 ? "active" : ""}"
            data-tab="${tab.key}"
            data-i18n="${tab.i18nKey}"
            id="tab-${tab.key}"
            type="button"
            role="tab"
            aria-selected="${idx === 0 ? "true" : "false"}"
            aria-controls="catalog-grid">
            ${tab.label}
          </button>
        `,
          )
          .join("")}
      </div>

      <div
        id="catalog-grid"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10 mt-14 lg:mt-20 xl:mt-24"
        role="tabpanel">
        <div class="col-span-full flex justify-center items-center py-20">
          <span class="font-sans text-[15px] text-text-third" data-i18n="catalog-loading">Загрузка каталога...</span>
        </div>
      </div>

    </div>
  </section>
`;

let activeTab: TabKey = "all";
let activeSort = "";
let searchQuery = "";
let searchTimer: ReturnType<typeof setTimeout> | undefined;

const renderGrid = async (): Promise<void> => {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  grid.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-20">
      <span class="font-sans text-[15px] text-text-third">${t("catalog-loading")}</span>
    </div>
  `;

  const filters: ProductFilters = {};
  if (activeTab !== "all") filters.category = activeTab;
  if (activeSort) {
    const [field, order] = activeSort.split(":");
    filters._sort = field;
    filters._order = order as "asc" | "desc";
  }
  if (searchQuery.trim()) filters.title_like = searchQuery.trim();

  try {
    const items = await fetchProducts(filters);

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full flex flex-col items-center gap-4 py-20 text-center">
          <svg class="size-12 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span class="font-sans text-[15px] text-text-third">${t("catalog-not-found")}</span>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map((p) => ProductCard(p, p.id ?? 0)).join("");
    syncFavoriteButtons();
  } catch {
    grid.innerHTML = `
      <div class="col-span-full flex flex-col items-center gap-4 py-20 text-center">
        <span class="font-sans text-[15px] text-text-third">${t("catalog-error")}</span>
      </div>
    `;
  }
};

export const initCatalog = (): void => {
  initProductCards();

  document
    .querySelectorAll<HTMLButtonElement>(".catalog-tab")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll<HTMLButtonElement>(".catalog-tab")
          .forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
          });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        activeTab = btn.dataset.tab as TabKey;
        void renderGrid();
      });
    });

  document.getElementById("catalog-search")?.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = (e.target as HTMLInputElement).value;
      void renderGrid();
    }, SEARCH_DEBOUNCE_MS);
  });

  document.getElementById("catalog-sort")?.addEventListener("change", (e) => {
    activeSort = (e.target as HTMLSelectElement).value;
    void renderGrid();
  });

  void renderGrid();
};
