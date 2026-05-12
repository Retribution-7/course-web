interface Review {
  name: string;
  date: string;
  avatar: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Serg",
    date: "27.07.2022",
    avatar: "/images/customers/customer-1.svg",
    text: "Долго думал где покупать арматуру на фундамент, по рекомендации друзей заказывал на этой металлобазе. Менеджер Дмитрий все четко посчитал, цена меня устроила. Доставка была в срок. Буду и дальше с ним работать.",
  },
  {
    name: "Квартира дом",
    date: "21.01.2022",
    avatar: "/images/customers/customer-2.svg",
    text: "Рекомендую! Прекрасная компания. Обращаюсь не в первый раз. Менеджеры клиентоориентированы. Приятно, когда тебя и твои запросы понимают. Всегда гуманные цены. Профлист качественный, снегозадержатели супер. Спасибо!",
  },
  {
    name: "Вячеслав Е",
    date: "10.12.2022",
    avatar: "/images/customers/customer-3.svg",
    text: "Все чётко. Приняли заказ по телефону, пока ехал подготовили все документы отправили на WhatsApp точку чтобы не заблудился. Приехал, оплатил, забрал 10 минут максимум.",
  },
];

const renderReviewCard = (review: Review, idx: number): string => `
  <article
    class="testimonial-slide bg-white rounded-[14px] card-shadow p-[40px] flex flex-col gap-[25px]"
    data-slide="${idx}">

    <!-- Шапка: аватар + имя + дата -->
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

    <!-- Яндекс Карты -->
    <div>
      <img src="/icons/yandex-logo.png" alt="Яндекс Карты — 5 звёзд" class="h-[23px] object-contain">
    </div>

    <!-- Текст отзыва -->
    <p class="font-sans font-normal text-[22px] leading-[30px] text-primary opacity-80">${review.text}</p>

  </article>
`;

export const Testimonials = (): string => {
  return `
    <section class="bg-[#F7F9FD] py-14 lg:py-20 xl:py-[100px]" id="testimonials" aria-labelledby="testimonials-heading">
      <div class="container-main flex flex-col gap-8 xl:gap-[29px]">

        <!-- Заголовок + кнопки навигации -->
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h2 id="testimonials-heading" class="font-sans font-normal text-[26px] leading-[1.2] sm:text-[36px] xl:text-[56px] xl:leading-[68px]">
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

        <!-- Карточки отзывов: 3 колонки на десктопе, слайдер на мобильном -->
        <div class="relative overflow-hidden">
          <div
            id="testimonials-track"
            class="flex gap-[41px] transition-transform duration-500 ease-in-out">
            ${reviews.map(renderReviewCard).join("")}
          </div>
        </div>

        <!-- Точки навигации (мобильный) -->
        <div class="flex gap-2 justify-center lg:hidden" role="group" aria-label="Страница отзывов">
          ${reviews
            .map(
              (_, i) => `
            <button
              class="testimonial-dot h-2 rounded-full transition-all duration-300 cursor-pointer
                     ${i === 0 ? "bg-[#FFC400] w-6" : "bg-[rgba(68,68,78,0.2)] w-2"}"
              data-dot="${i}"
              aria-label="Отзыв ${i + 1}"
              ${i === 0 ? 'aria-current="true"' : ""}>
            </button>
          `,
            )
            .join("")}
        </div>

      </div>
    </section>
  `;
};

export const initTestimonials = (): void => {
  const track = document.getElementById("testimonials-track");
  const slides = track?.querySelectorAll<HTMLElement>(".testimonial-slide");
  const dots = document.querySelectorAll<HTMLButtonElement>(".testimonial-dot");
  const prevBtn = document.getElementById("testimonials-prev") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("testimonials-next") as HTMLButtonElement | null;

  if (!track || !slides?.length) return;

  let current = 0;

  const getSlideWidth = (): number => {
    const isDesktop = window.innerWidth >= 1024;
    // Desktop: show all 3, no sliding needed
    if (isDesktop) return 0;
    // Mobile/tablet: each slide = track width + gap
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
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) return; // no slide on desktop — all visible

    const total = slides.length;
    current = Math.max(0, Math.min(idx, total - 1));
    const slideWidth = getSlideWidth();
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    updateDots(current);

    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
  };

  const applyDesktopLayout = (): void => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      track.style.transform = "";
      track.style.flexWrap = "nowrap";
      // Make each slide flex-1 for equal columns
      slides.forEach((s) => {
        s.style.flex = "1 1 0%";
        s.style.minWidth = "0";
      });
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
    } else {
      slides.forEach((s) => {
        s.style.flex = "0 0 100%";
        s.style.minWidth = "100%";
      });
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === slides.length - 1;
      goTo(current);
    }
  };

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  // Keyboard navigation
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  applyDesktopLayout();
  window.addEventListener("resize", applyDesktopLayout);
};
