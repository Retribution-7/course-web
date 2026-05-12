import { reviews, reviewDateMs, type Review } from "../entities/reviews";

type SortOrder = "newest" | "oldest" | "rating";
type RatingFilter = "all" | "5" | "4plus" | "3plus";

interface FilterState {
  search: string;
  sort: SortOrder;
  rating: RatingFilter;
}

const state: FilterState = {
  search: "",
  sort: "newest",
  rating: "all",
};

const Stars = (rating: number): string => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return `
    <div class="flex items-center gap-0.5" aria-label="Оценка: ${full} из 5">
      ${Array.from({ length: 5 })
        .map(
          (_, i) => `
        <svg viewBox="0 0 20 20"
             class="size-[14px] sm:size-4 ${i < full ? "text-[#FFC400]" : "text-[#E5E9EE]"}"
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
  <article class="bg-white rounded-[14px] card-shadow p-5 sm:p-6 lg:p-7
                  flex flex-col gap-4 h-full">
    <div class="flex items-center gap-3 sm:gap-4">
      <img src="${review.avatar}"
           alt=""
           class="size-12 sm:size-14 rounded-full object-cover shrink-0 bg-[#F3F5F9]"
           loading="lazy"
           aria-hidden="true">
      <div class="flex-1 min-w-0">
        <h3 class="font-sans font-normal text-[16px] sm:text-[18px] leading-[1.2] text-primary truncate">
          ${review.name}
        </h3>
        <p class="font-sans text-[13px] leading-[1.3] text-[#758499] mt-1">${review.date}</p>
      </div>
      ${Stars(review.rating)}
    </div>

    <p class="font-sans text-[14px] sm:text-[15px] leading-[1.55] text-[#44444E] flex-1">
      ${review.text}
    </p>

    ${
      review.product
        ? `<div class="pt-3 border-t border-[#E5E9EE]">
             <span class="inline-flex items-center gap-1.5 font-sans text-[12px] text-[#758499]">
               <span class="size-1.5 rounded-full bg-[#FFC400]"></span>
               ${review.product}
             </span>
           </div>`
        : ""
    }
  </article>
`;

const renderEmpty = (): string => `
  <div class="bg-white rounded-[14px] card-shadow p-10 lg:p-16 text-center">
    <h3 class="font-sans font-normal text-[22px] leading-[1.2] gradient-text">
      Ничего не найдено
    </h3>
    <p class="mt-3 font-sans text-[14px] leading-[1.5] text-[#44444E]">
      Попробуйте изменить параметры фильтрации или поиска.
    </p>
    <button type="button"
            data-action="reviews-reset"
            class="mt-6 inline-flex items-center justify-center rounded-full
                   bg-[#FAFAFA] border border-[#FFC400]
                   px-6 py-3 font-sans text-[14px] lg:text-[15px] text-[#44444E]
                   hover:bg-white transition-colors cursor-pointer">
      Сбросить фильтры
    </button>
  </div>
`;

export const ReviewsPage = (): string => `
  <section id="reviews-page"
           class="hidden bg-[#F3F5F9] py-10 lg:py-16 min-h-[60vh]"
           aria-labelledby="reviews-heading">
    <div class="container-main">

      <a href="#testimonials"
         class="inline-flex items-center gap-2 font-sans text-[14px] lg:text-[15px]
                text-[#44444E] hover:text-[#FFC400] transition-colors mb-6 lg:mb-10">
        <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M10 3l-5 5 5 5"/>
        </svg>
        Назад
      </a>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6 mb-6 lg:mb-10">
        <div>
          <h1 id="reviews-heading"
              class="font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[48px] xl:text-[56px] xl:leading-[1.15] gradient-text">
            ВСЕ ОТЗЫВЫ
          </h1>
          <p class="mt-2 font-sans text-[14px] sm:text-[15px] leading-[1.4] text-[#44444E]">
            <span id="reviews-summary"></span>
          </p>
        </div>
        <div class="flex items-baseline gap-2 font-sans text-[14px] text-[#758499]">
          <span class="text-[24px] sm:text-[28px] leading-none text-primary" id="reviews-avg-rating"></span>
          <span>средняя оценка</span>
        </div>
      </div>

      <div class="bg-white rounded-[14px] card-shadow p-4 sm:p-5 lg:p-6 mb-6 lg:mb-8
                  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-3 lg:gap-4">
        <div class="relative">
          <label for="reviews-search" class="sr-only">Поиск по отзывам</label>
          <input id="reviews-search"
                 type="search"
                 placeholder="Поиск по имени или тексту"
                 class="h-11 w-full rounded-[8px] border border-[#ddd] bg-white pl-10 pr-3
                        font-sans text-[14px] lg:text-[15px] text-primary
                        focus:outline-none focus:border-[#FFC400] transition-colors" />
          <svg viewBox="0 0 16 16"
               class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#758499] pointer-events-none"
               fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="7" cy="7" r="5"/>
            <path d="M11 11l3 3"/>
          </svg>
        </div>

        <div>
          <label for="reviews-rating" class="sr-only">Фильтр по рейтингу</label>
          <select id="reviews-rating"
                  class="h-11 w-full rounded-[8px] border border-[#ddd] bg-white px-3
                         font-sans text-[14px] lg:text-[15px] text-primary
                         focus:outline-none focus:border-[#FFC400] transition-colors cursor-pointer">
            <option value="all">Все рейтинги</option>
            <option value="5">Только 5 звёзд</option>
            <option value="4plus">4 и выше</option>
            <option value="3plus">3 и выше</option>
          </select>
        </div>

        <div>
          <label for="reviews-sort" class="sr-only">Сортировка</label>
          <select id="reviews-sort"
                  class="h-11 w-full rounded-[8px] border border-[#ddd] bg-white px-3
                         font-sans text-[14px] lg:text-[15px] text-primary
                         focus:outline-none focus:border-[#FFC400] transition-colors cursor-pointer">
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
      </div>

      <div id="reviews-grid"
           class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      </div>
    </div>
  </section>
`;

const pluralReviews = (n: number): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} отзыв`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} отзыва`;
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
    sorted.sort((a, b) => b.rating - a.rating || reviewDateMs(b) - reviewDateMs(a));
  }
  return sorted;
};

const renderGrid = (): void => {
  const grid = document.getElementById("reviews-grid");
  const summary = document.getElementById("reviews-summary");
  const avg = document.getElementById("reviews-avg-rating");
  if (!grid || !summary || !avg) return;

  const filtered = sortReviews(reviews.filter(matchesFilters));

  if (filtered.length === 0) {
    grid.innerHTML = "";
    grid.classList.add("hidden");
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
    grid.innerHTML = filtered.map(renderCard).join("");
  }

  summary.textContent = `Показано ${pluralReviews(filtered.length)} из ${reviews.length}`;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  avg.textContent = (sum / reviews.length).toFixed(1);
};

const showPage = (show: boolean): void => {
  const page = document.getElementById("reviews-page");
  if (!page) return;
  page.classList.toggle("hidden", !show);
  if (show) {
    renderGrid();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleRoute = (): void => {
  showPage(window.location.hash === "#reviews");
};

const resetFilters = (): void => {
  state.search = "";
  state.rating = "all";
  state.sort = "newest";
  const search = document.getElementById("reviews-search") as HTMLInputElement | null;
  const rating = document.getElementById("reviews-rating") as HTMLSelectElement | null;
  const sort = document.getElementById("reviews-sort") as HTMLSelectElement | null;
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
    renderGrid();
  });

  document.getElementById("reviews-rating")?.addEventListener("change", (e) => {
    state.rating = (e.target as HTMLSelectElement).value as RatingFilter;
    renderGrid();
  });

  document.getElementById("reviews-sort")?.addEventListener("change", (e) => {
    state.sort = (e.target as HTMLSelectElement).value as SortOrder;
    renderGrid();
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-action="reviews-reset"]')) {
      resetFilters();
    }
  });
};
