import type { Review } from "../entities/reviews";
import { fetchReviews } from "../services/api";
import { t } from "../services/i18n";

const renderReviewCard = (review: Review, idx: number): string => `
  <article
    class="testimonial-slide bg-surface rounded-[14px] card-shadow p-[40px] flex flex-col gap-[25px] transition-colors duration-300"
    data-slide="${idx}">

    <div class="flex items-center gap-[25px]">
      <img
        src="${review.avatar}"
        alt="${review.name}"
        class="size-[70px] rounded-full object-cover shrink-0"
        loading="lazy"
      >
      <div class="flex flex-col">
        <span class="font-sans font-normal text-[22px] leading-[30px] text-123-first">${review.name}</span>
        <span class="font-sans font-normal text-[17px] leading-[1.8] text-123-second">${review.date}</span>
      </div>
    </div>

    <div>
      <img src="/icons/yandex-logo.png" alt="Яндекс Карты — 5 звёзд" class="h-[23px] object-contain">
    </div>

    <p class="font-sans font-normal text-[22px] leading-[30px] text-primary opacity-80">${review.text}</p>

  </article>
`;

const renderDot = (idx: number, active: boolean): string => `
  <button
    class="testimonial-dot h-2 rounded-full transition-all duration-300 cursor-pointer
           ${active ? "bg-button-first w-6" : "bg-primary/20 w-2"}"
    data-dot="${idx}"
    aria-label="Отзыв ${idx + 1}"
    ${active ? 'aria-current="true"' : ""}>
  </button>
`;

export const Testimonials = (): string => `
  <section class="bg-bg-second py-14 lg:py-20 xl:py-[100px] transition-colors duration-300" id="testimonials" aria-labelledby="testimonials-heading">
    <div class="container-main flex flex-col gap-8 xl:gap-[29px]">

      <div class="flex items-start justify-between gap-6">
        <div class="flex-1">
          <h2 id="testimonials-heading"
              data-i18n-html="testimonials-heading"
              class="font-sans font-normal text-[26px] leading-[1.2] sm:text-[36px] xl:text-[56px] xl:leading-[68px]">
            <span class="gradient-text">ЛУЧШЕ ВСЕГО О НАС</span><br>
            РАССКАЖУТ НАШИ КЛИЕНТЫ
          </h2>
        </div>
        <div class="flex items-center gap-[10px] shrink-0 mt-4" aria-label="Навигация по отзывам">
          <button
            id="testimonials-prev"
            class="flex items-center justify-center size-[40px] rounded-full border border-primary/30
                   text-primary text-[18px] transition-all hover:border-button-first cursor-pointer"
            aria-label="Предыдущий отзыв">
            ←
          </button>
          <button
            id="testimonials-next"
            class="flex items-center justify-center size-[70px] rounded-full gradient-icon
                   text-white text-[22px] transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Следующий отзыв">
            →
          </button>
        </div>
      </div>

      <div class="relative overflow-hidden">
        <div
          id="testimonials-track"
          class="flex gap-[41px] transition-transform duration-500 ease-in-out min-h-[200px] items-center">
          <span class="w-full text-center font-sans text-[15px] text-text-third" data-i18n="testimonials-loading">Загрузка отзывов...</span>
        </div>
      </div>

      <div id="testimonials-dots" class="flex gap-2 justify-center lg:hidden" role="group" aria-label="Страница отзывов"></div>

      <div class="flex justify-center mt-4 lg:mt-8">
        <a href="#reviews"
           class="inline-flex items-center gap-2 rounded-full
                  bg-bg-first border border-button-first
                  px-6 py-3 lg:px-8 lg:py-[15px]
                  font-sans text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.4] text-primary
                  transition-colors duration-200 hover:bg-surface cursor-pointer no-underline">
          <span data-i18n="testimonials-all">Все отзывы</span>
          <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path d="M6 3l5 5-5 5"/>
          </svg>
        </a>
      </div>

    </div>
  </section>
`;

const setupSlider = (track: HTMLElement, dotsContainer: HTMLElement): void => {
  const slides = track.querySelectorAll<HTMLElement>(".testimonial-slide");
  const dots =
    dotsContainer.querySelectorAll<HTMLButtonElement>(".testimonial-dot");
  const prevBtn = document.getElementById(
    "testimonials-prev",
  ) as HTMLButtonElement | null;
  const nextBtn = document.getElementById(
    "testimonials-next",
  ) as HTMLButtonElement | null;

  if (!slides.length) return;

  let current = 0;
  const GAP = 41;
  let autoTimer: ReturnType<typeof setInterval> | null = null;

  const getPerView = (): number => (window.innerWidth >= 1024 ? 3 : 1);
  const getMaxIndex = (): number => Math.max(0, slides.length - getPerView());
  const getSlidePx = (): number => (slides[0]?.offsetWidth ?? 0) + GAP;

  const updateDots = (idx: number): void => {
    dots.forEach((dot, i) => {
      const isActive = i === idx;
      dot.classList.toggle("bg-button-first", isActive);
      dot.classList.toggle("w-6", isActive);
      dot.classList.toggle("bg-primary/20", !isActive);
      dot.classList.toggle("w-2", !isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const goTo = (idx: number): void => {
    const total = getMaxIndex() + 1;
    current = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${current * getSlidePx()}px)`;
    updateDots(current);
  };

  const stopAuto = (): void => {
    if (autoTimer !== null) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  const startAuto = (): void => {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  };

  const manualGoTo = (idx: number): void => {
    stopAuto();
    goTo(idx);
    startAuto();
  };

  const applyLayout = (): void => {
    const perView = getPerView();
    if (perView > 1) {
      slides.forEach((s) => {
        s.style.flex = `0 0 calc((100% - ${GAP * (perView - 1)}px) / ${perView})`;
        s.style.minWidth = "0";
      });
    } else {
      slides.forEach((s) => {
        s.style.flex = "0 0 100%";
        s.style.minWidth = "100%";
      });
    }
    current = Math.min(current, getMaxIndex());
    void track.offsetWidth;
    goTo(current);
  };

  prevBtn?.addEventListener("click", () => manualGoTo(current - 1));
  nextBtn?.addEventListener("click", () => manualGoTo(current + 1));
  // biome-ignore lint/suspicious/useIterableCallbackReturn: side-effect only — addEventListener
  dots.forEach((dot, i) => dot.addEventListener("click", () => manualGoTo(i)));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") manualGoTo(current - 1);
    if (e.key === "ArrowRight") manualGoTo(current + 1);
  });

  const section = track.closest("section");
  section?.addEventListener("mouseenter", stopAuto);
  section?.addEventListener("mouseleave", startAuto);
  section?.addEventListener("focusin", stopAuto);
  section?.addEventListener("focusout", startAuto);

  applyLayout();
  startAuto();
  window.addEventListener("resize", () => {
    stopAuto();
    applyLayout();
    startAuto();
  });
};

export const initTestimonials = (): void => {
  fetchReviews()
    .then((all) => {
      const track = document.getElementById("testimonials-track");
      const dotsContainer = document.getElementById("testimonials-dots");
      if (!track || !dotsContainer) return;

      track.innerHTML = all.map(renderReviewCard).join("");
      dotsContainer.innerHTML = all
        .map((_, i) => renderDot(i, i === 0))
        .join("");

      setupSlider(track, dotsContainer);
    })
    .catch(() => {
      const track = document.getElementById("testimonials-track");
      if (track)
        track.innerHTML = `<span class="font-sans text-[15px] text-text-third">${t("testimonials-error")}</span>`;
    });
};
