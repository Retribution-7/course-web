import { type Review, reviewDateMs } from "../entities/reviews";
import { fetchReviews } from "../services/api";
import { getCurrentLang, t } from "../services/i18n";

type SortOrder = "newest" | "oldest" | "rating";
type RatingFilter = "all" | "5" | "4plus" | "3plus";

interface FilterState {
  search: string;
  sort: SortOrder;
  rating: RatingFilter;
  page: number;
}

const PAGE_SIZE = 6;

const state: FilterState = {
  search: "",
  sort: "newest",
  rating: "all",
  page: 1,
};

let cachedReviews: Review[] = [];

const Stars = (rating: number): string => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  const ariaLabel =
    getCurrentLang() === "en"
      ? `Rating: ${full} out of 5`
      : `Оценка: ${full} из 5`;
  return `
    <div class="flex items-center gap-0.5" aria-label="${ariaLabel}">
      ${Array.from({ length: 5 })
        .map(
          (_, i) => `
        <svg viewBox="0 0 20 20"
             class="size-[14px] sm:size-4 ${i < full ? "text-button-first" : "text-border-light dark:text-border-dark"}"
             fill="currentColor"
             aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L10 14.9l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z"/>
        </svg>
      `,
        )
        .join("")}
    </div>
  `;
};

const renderCard = (review: Review): string => `
  <article class="bg-surface rounded-[14px] card-shadow p-5 sm:p-6 lg:p-7
                  flex flex-col gap-4 h-full transition-colors duration-300">
    <div class="flex items-center gap-3 sm:gap-4">
      <img src="${review.avatar}"
           alt=""
           class="size-12 sm:size-14 rounded-full object-cover shrink-0 bg-bg-first"
           loading="lazy"
           aria-hidden="true">
      <div class="flex-1 min-w-0">
        <h3 class="font-sans font-normal text-[16px] sm:text-[18px] leading-[1.2] text-primary truncate">
          ${review.name}
        </h3>
        <p class="font-sans text-[13px] leading-[1.3] text-text-third mt-1">${review.date}</p>
      </div>
      ${Stars(review.rating)}
    </div>

    <p class="font-sans text-[14px] sm:text-[15px] leading-[1.55] text-text-secondary flex-1">
      ${review.text}
    </p>

    ${
      review.product
        ? `<div class="pt-3 border-t border-border-light dark:border-border-dark">
             <span class="inline-flex items-center gap-1.5 font-sans text-[12px] text-text-third">
               <span class="size-1.5 rounded-full bg-button-first"></span>
               ${review.product}
             </span>
           </div>`
        : ""
    }
  </article>
`;

const renderEmpty = (): string => `
  <div class="bg-surface rounded-[14px] card-shadow p-10 lg:p-16 text-center transition-colors duration-300">
    <h3 class="font-sans font-normal text-[22px] leading-[1.2] gradient-text">
      ${t("reviews-empty-title")}
    </h3>
    <p class="mt-3 font-sans text-[14px] leading-[1.5] text-text-secondary">
      ${t("reviews-empty-desc")}
    </p>
    <button type="button"
            data-action="reviews-reset"
            class="mt-6 inline-flex items-center justify-center rounded-full
                   bg-surface-hover border border-button-first
                   px-6 py-3 font-sans text-[14px] lg:text-[15px] text-text-secondary
                   hover:bg-surface transition-colors cursor-pointer">
      ${t("reviews-reset")}
    </button>
  </div>
`;

export const ReviewsPage = (): string => `
  <section id="reviews-page"
           class="hidden bg-bg-first py-10 lg:py-16 min-h-[60vh] transition-colors duration-300"
           aria-labelledby="reviews-heading">
    <div class="container-main">

      <a href="#testimonials"
         class="inline-flex items-center gap-2 font-sans text-[14px] lg:text-[15px]
                text-text-secondary hover:text-button-first transition-colors mb-6 lg:mb-10">
        <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M10 3l-5 5 5 5"/>
        </svg>
        <span data-i18n="reviews-back">Назад</span>
      </a>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6 mb-6 lg:mb-10">
        <div>
          <h1 id="reviews-heading"
              data-i18n="reviews-heading"
              class="font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[48px] xl:text-[56px] xl:leading-[1.15] gradient-text">
            ВСЕ ОТЗЫВЫ
          </h1>
          <p class="mt-2 font-sans text-[14px] sm:text-[15px] leading-[1.4] text-text-secondary">
            <span id="reviews-summary"></span>
          </p>
        </div>
        <div class="flex items-baseline gap-2 font-sans text-[14px] text-text-third">
          <span class="text-[24px] sm:text-[28px] leading-none text-primary" id="reviews-avg-rating"></span>
          <span data-i18n="reviews-avg-label">средняя оценка</span>
        </div>
      </div>

      <div class="bg-surface rounded-[14px] card-shadow p-4 sm:p-5 lg:p-6 mb-6 lg:mb-8
                  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-3 lg:gap-4 transition-colors duration-300">
        <div class="relative">
          <label for="reviews-search" class="sr-only">Поиск по отзывам</label>
          <input id="reviews-search"
                 type="search"
                 placeholder="Поиск по имени или тексту"
                 data-i18n-placeholder="reviews-search-placeholder"
                 class="h-11 w-full rounded-[8px] border border-border-input bg-surface px-3 pl-10
                        font-sans text-[14px] lg:text-[15px] text-primary
                        focus:outline-none focus:border-button-first transition-colors" />
          <svg viewBox="0 0 16 16"
               class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-third pointer-events-none"
               fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="7" cy="7" r="5"/>
            <path d="M11 11l3 3"/>
          </svg>
        </div>

        <div>
          <label for="reviews-rating" class="sr-only">Фильтр по рейтингу</label>
          <select id="reviews-rating"
                  class="h-11 w-full rounded-[8px] border border-border-input bg-surface px-3
                         font-sans text-[14px] lg:text-[15px] text-primary
                         focus:outline-none focus:border-button-first transition-colors cursor-pointer">
            <option value="all" data-i18n="reviews-rating-all">Все рейтинги</option>
            <option value="5" data-i18n="reviews-rating-5">Только 5 звёзд</option>
            <option value="4plus" data-i18n="reviews-rating-4plus">4 и выше</option>
            <option value="3plus" data-i18n="reviews-rating-3plus">3 и выше</option>
          </select>
        </div>

        <div>
          <label for="reviews-sort" class="sr-only">Сортировка</label>
          <select id="reviews-sort"
                  class="h-11 w-full rounded-[8px] border border-border-input bg-surface px-3
                         font-sans text-[14px] lg:text-[15px] text-primary
                         focus:outline-none focus:border-button-first transition-colors cursor-pointer">
            <option value="newest" data-i18n="reviews-sort-newest">Сначала новые</option>
            <option value="oldest" data-i18n="reviews-sort-oldest">Сначала старые</option>
            <option value="rating" data-i18n="reviews-sort-rating">По рейтингу</option>
          </select>
        </div>
      </div>

      <div id="reviews-grid"
           class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      </div>

      <div id="reviews-pagination"
           class="hidden mt-8 lg:mt-12 flex flex-wrap items-center justify-center gap-2"
           aria-label="Пагинация"></div>
    </div>
  </section>
`;

const pluralReviews = (n: number): string => {
  if (getCurrentLang() === "en") return `${n} review${n !== 1 ? "s" : ""}`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} отзыв`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return `${n} отзыва`;
  return `${n} отзывов`;
};

const matchesFilters = (review: Review): boolean => {
  if (state.search) {
    const q = state.search.toLowerCase();
    if (
      !review.name.toLowerCase().includes(q) &&
      !review.text.toLowerCase().includes(q) &&
      !(review.product?.toLowerCase().includes(q) ?? false)
    ) {
      return false;
    }
  }
  if (state.rating === "5" && review.rating !== 5) return false;
  if (state.rating === "4plus" && review.rating < 4) return false;
  if (state.rating === "3plus" && review.rating < 3) return false;
  return true;
};

const sortReviews = (list: Review[]): Review[] => {
  const sorted = [...list];
  if (state.sort === "newest") {
    sorted.sort((a, b) => reviewDateMs(b) - reviewDateMs(a));
  } else if (state.sort === "oldest") {
    sorted.sort((a, b) => reviewDateMs(a) - reviewDateMs(b));
  } else {
    sorted.sort(
      (a, b) => b.rating - a.rating || reviewDateMs(b) - reviewDateMs(a),
    );
  }
  return sorted;
};

const renderPagination = (totalPages: number, currentPage: number): string => {
  if (totalPages <= 1) return "";
  const pageBtn = (
    label: string,
    page: number,
    isActive = false,
    isDisabled = false,
  ) => `
    <button type="button"
            data-page="${page}"
            ${isDisabled ? "disabled" : ""}
            class="min-w-[40px] h-10 px-3 rounded-full font-sans text-[14px] lg:text-[15px]
                   transition-colors duration-200 cursor-pointer
                   ${
                     isActive
                       ? "bg-gradient-to-r from-button-first to-button-second text-primary shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]"
                       : "bg-surface border border-button-first text-text-secondary hover:bg-surface-hover"
                   }
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-surface">
      ${label}
    </button>
  `;

  const pages: string[] = [];
  pages.push(pageBtn("←", currentPage - 1, false, currentPage === 1));
  for (let p = 1; p <= totalPages; p++) {
    pages.push(pageBtn(String(p), p, p === currentPage));
  }
  pages.push(pageBtn("→", currentPage + 1, false, currentPage === totalPages));
  return pages.join("");
};

const renderGrid = (): void => {
  const grid = document.getElementById("reviews-grid");
  const summary = document.getElementById("reviews-summary");
  const avg = document.getElementById("reviews-avg-rating");
  const pagination = document.getElementById("reviews-pagination");
  if (!grid || !summary || !avg || !pagination) return;

  const filtered = sortReviews(cachedReviews.filter(matchesFilters));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  state.page = Math.max(1, Math.min(state.page, totalPages));
  const start = (state.page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    grid.classList.add("hidden");
    pagination.classList.add("hidden");
    pagination.innerHTML = "";
    let empty = document.getElementById("reviews-empty");
    if (!empty) {
      empty = document.createElement("div");
      empty.id = "reviews-empty";
      grid.parentElement?.insertBefore(empty, grid);
    }
    empty.innerHTML = renderEmpty();
  } else {
    grid.classList.remove("hidden");
    document.getElementById("reviews-empty")?.remove();
    grid.innerHTML = pageItems.map(renderCard).join("");

    const paginationHtml = renderPagination(totalPages, state.page);
    if (paginationHtml) {
      pagination.classList.remove("hidden");
      pagination.innerHTML = paginationHtml;
    } else {
      pagination.classList.add("hidden");
      pagination.innerHTML = "";
    }
  }

  const fn = filtered.length;
  const total = cachedReviews.length;
  summary.textContent =
    getCurrentLang() === "en"
      ? `Showing ${fn} of ${total} ${fn !== 1 ? "reviews" : "review"}`
      : `Показано ${pluralReviews(fn)} из ${total}`;
  const sum = cachedReviews.reduce((acc, r) => acc + r.rating, 0);
  avg.textContent =
    cachedReviews.length > 0 ? (sum / cachedReviews.length).toFixed(1) : "";
};

const showLoadingState = (): void => {
  const grid = document.getElementById("reviews-grid");
  if (grid) {
    grid.classList.remove("hidden");
    grid.innerHTML = `
      <div class="col-span-full flex justify-center py-16">
        <span class="font-sans text-[15px] text-text-third">${t("reviews-loading")}</span>
      </div>
    `;
  }
};

const showPage = (show: boolean): void => {
  const page = document.getElementById("reviews-page");
  if (!page) return;
  page.classList.toggle("hidden", !show);
  if (!show) return;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (cachedReviews.length > 0) {
    renderGrid();
    return;
  }

  showLoadingState();
  fetchReviews()
    .then((reviews) => {
      cachedReviews = reviews;
      renderGrid();
    })
    .catch(() => {
      const grid = document.getElementById("reviews-grid");
      if (grid)
        grid.innerHTML = `
          <div class="col-span-full text-center py-16 font-sans text-[15px] text-text-third">
            ${t("reviews-error")}
          </div>
        `;
    });
};

const handleRoute = (): void => {
  showPage(window.location.hash === "#reviews");
};

const resetFilters = (): void => {
  state.search = "";
  state.rating = "all";
  state.sort = "newest";
  state.page = 1;
  const search = document.getElementById(
    "reviews-search",
  ) as HTMLInputElement | null;
  const rating = document.getElementById(
    "reviews-rating",
  ) as HTMLSelectElement | null;
  const sort = document.getElementById(
    "reviews-sort",
  ) as HTMLSelectElement | null;
  if (search) search.value = "";
  if (rating) rating.value = "all";
  if (sort) sort.value = "newest";
  renderGrid();
};

export const initReviewsPage = (): void => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);

  document.getElementById("reviews-search")?.addEventListener("input", (e) => {
    state.search = (e.target as HTMLInputElement).value.trim();
    state.page = 1;
    renderGrid();
  });

  document.getElementById("reviews-rating")?.addEventListener("change", (e) => {
    state.rating = (e.target as HTMLSelectElement).value as RatingFilter;
    state.page = 1;
    renderGrid();
  });

  document.getElementById("reviews-sort")?.addEventListener("change", (e) => {
    state.sort = (e.target as HTMLSelectElement).value as SortOrder;
    state.page = 1;
    renderGrid();
  });

  document
    .getElementById("reviews-pagination")
    ?.addEventListener("click", (event) => {
      const btn = (event.target as HTMLElement).closest<HTMLButtonElement>(
        "[data-page]",
      );
      if (!btn || btn.disabled) return;
      const page = Number.parseInt(btn.dataset.page ?? "", 10);
      if (Number.isNaN(page)) return;
      state.page = page;
      renderGrid();
      document
        .getElementById("reviews-grid")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-action="reviews-reset"]')) {
      resetFilters();
    }
  });
};
