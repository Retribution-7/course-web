import { fetchReviews } from "../services/api";
import type { Review } from "../entities/reviews";
import { t } from "../services/i18n";

const renderReviewCard = (review: Review, idx: number): string => `
  <article
    class="testimonial-slide bg-white rounded-[14px] card-shadow p-[40px] flex flex-col gap-[25px]"
    data-slide="${idx}">

    <div class="flex items-center gap-[25px]">
      <img
        src="${review.avatar}"
        alt="${review.name}"
        class="size-[70px] rounded-full object-cover shrink-0"
        loading="lazy"
      >
      <div class="flex flex-col">
        <span class="font-sans font-normal text-[22px] leading-[30px] text-[#2E4156]">${review.name}</span>
        <span class="font-sans font-normal text-[17px] leading-[1.8] text-[#69809F]">${review.date}</span>
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
           ${active ? "bg-[#FFC400] w-6" : "bg-[rgba(68,68,78,0.2)] w-2"}"
    data-dot="${idx}"
    aria-label="Отзыв ${idx + 1}"
    ${active ? 'aria-current="true"' : ""}>
  </button>
`;

export const Testimonials = (): string => `
  <section class="bg-[#F7F9FD] py-14 lg:py-20 xl:py-[100px]" id="testimonials" aria-labelledby="testimonials-heading">
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
            class="flex items-center justify-center size-[40px] rounded-full border border-[rgba(68,68,78,0.3)]
                   text-primary text-[18px] transition-all hover:border-[#FFC400] cursor-pointer"
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
          class="flex gap-[41px] transition-transform duration-500 ease-in-out min-h-[200px] items-center justify-center">
          <span class="font-sans text-[15px] text-[#758499]" data-i18n="testimonials-loading">Загрузка отзывов...</span>
        </div>
      </div>

      <div id="testimonials-dots" class="flex gap-2 justify-center lg:hidden" role="group" aria-label="Страница отзывов"></div>

      <div class="flex justify-center mt-4 lg:mt-8">
        <a href="#reviews"
           class="inline-flex items-center gap-2 rounded-full
                  bg-[#FAFAFA] border border-[#FFC400]
                  px-6 py-3 lg:px-8 lg:py-[15px]
                  font-sans text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.4] text-[#44444E]
                  transition-colors duration-200 hover:bg-white cursor-pointer no-underline">
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
  const dots = dotsContainer.querySelectorAll<HTMLButtonElement>(".testimonial-dot");
  const prevBtn = document.getElementById("testimonials-prev") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("testimonials-next") as HTMLButtonElement | null;

  if (!slides.length) return;

  let current = 0;

  const getSlideWidth = (): number => {
    if (window.innerWidth >= 1024) return 0;
    const gap = 41;
    return (slides[0]?.offsetWidth ?? 0) + gap;
  };

  const updateDots = (idx: number): void => {
    dots.forEach((dot, i) => {
      const isActive = i === idx;
      dot.classList.toggle("bg-[#FFC400]", isActive);
      dot.classList.toggle("w-6", isActive);
      dot.classList.toggle("bg-[rgba(68,68,78,0.2)]", !isActive);
      dot.classList.toggle("w-2", !isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };

  const goTo = (idx: number): void => {
    if (window.innerWidth >= 1024) return;
    current = Math.max(0, Math.min(idx, slides.length - 1));
    track.style.transform = `translateX(-${current * getSlideWidth()}px)`;
    updateDots(current);
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === slides.length - 1;
  };

  const applyLayout = (): void => {
    if (window.innerWidth >= 1024) {
      track.style.transform = "";
      track.style.flexWrap = "nowrap";
      slides.forEach((s) => { s.style.flex = "1 1 0%"; s.style.minWidth = "0"; });
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
    } else {
      slides.forEach((s) => { s.style.flex = "0 0 100%"; s.style.minWidth = "100%"; });
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === slides.length - 1;
      goTo(current);
    }
  };

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  applyLayout();
  window.addEventListener("resize", applyLayout);
};

export const initTestimonials = (): void => {
  fetchReviews()
    .then((all) => {
      const reviews = all.slice(0, 3);
      const track = document.getElementById("testimonials-track");
      const dotsContainer = document.getElementById("testimonials-dots");
      if (!track || !dotsContainer) return;

      track.innerHTML = reviews.map(renderReviewCard).join("");
      dotsContainer.innerHTML = reviews.map((_, i) => renderDot(i, i === 0)).join("");

      setupSlider(track, dotsContainer);
    })
    .catch(() => {
      const track = document.getElementById("testimonials-track");
      if (track) track.innerHTML = `<span class="font-sans text-[15px] text-[#758499]">${t("testimonials-error")}</span>`;
    });
};
