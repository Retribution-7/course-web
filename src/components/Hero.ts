export const Hero = (): string => {
  return `
    <section class="relative min-h-[500px] lg:min-h-[700px] xl:min-h-[961px] overflow-hidden" aria-label="Главный баннер">

      <!-- Фоновое изображение -->
      <img
        src="/images/backgrounds/hero-background.png"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      >

      <!-- Левый блок: заголовок + текст + кнопка -->
      <div class="container-main relative z-10 pt-20 pb-16 lg:pt-[160px] lg:pb-[100px] xl:pt-[267px] xl:pb-[147px]">

        <div class="flex flex-col gap-6 lg:gap-8 xl:gap-[43px] max-w-[899px] xl:max-w-none">

          <h1 class="font-sans font-normal text-[28px] leading-[1.2] sm:text-[36px] lg:text-[44px] lg:leading-[1.2] xl:text-[56px] xl:leading-[68px] text-[#303030]">
            ПРОДАЖА кровельных материалов<br>
            <span class="gradient-text">с доставкой<br>по Санкт-Петербургу<br>и области</span>
            в день заказа
          </h1>

          <p class="font-sans text-[16px] sm:text-[18px] xl:text-[22px] leading-[1.3] text-black max-w-[434px]">
            За 1 минуту пройдите тест и
            <strong class="gradient-text font-normal">рассчитайте стоимость кровли</strong>
            под ваш объект с точностью 97% и получите подарки
          </p>

          <div>
            <button
              class="btn-primary text-[14px] sm:text-[16px] xl:text-[22px] px-6 py-4 sm:px-8 sm:py-5 xl:px-[46px] xl:py-9"
              aria-label="Рассчитать стоимость материалов">
              РАССЧИТАТЬ СТОИМОСТЬ МАТЕРИАЛОВ
            </button>
          </div>

        </div>

      </div>

      <!-- Правое плавающее боковое меню (прижато к правому краю) -->
      <div class="absolute right-0 top-[267px] bottom-[147px] z-10 hidden lg:flex flex-col justify-center gap-[10px] w-[110px]"
           aria-label="Быстрые действия">

        <button
          class="flex flex-col items-center gap-3 w-full h-[105px] px-[15px] pt-5 pb-[13px]
                 rounded-tl-[8px] rounded-bl-[8px] gradient-icon
                 shadow-[inset_0_0_12px_0_rgba(255,255,255,0.3)]
                 transition-opacity hover:opacity-90 cursor-pointer"
          aria-label="Произвести расчёт">
          <img src="/icons/calculatings.svg" alt="" aria-hidden="true" class="w-[37px] h-[32px] object-contain">
          <span class="font-sans text-[10px] leading-none text-white text-center">Произвести расчет</span>
        </button>

        <a
          href="#"
          class="flex flex-col items-center gap-[10px] w-full h-[105px] px-[15px] pt-[15px] pb-[13px]
                 rounded-tl-[8px] rounded-bl-[8px] gradient-icon
                 shadow-[inset_0_0_12px_0_rgba(255,255,255,0.3)]
                 transition-opacity hover:opacity-90"
          aria-label="Скачать прайс-лист">
          <img src="/icons/price-list.svg" alt="" aria-hidden="true" class="w-[47px] h-[39px] object-contain">
          <span class="font-sans text-[10px] leading-none text-white text-center">Скачать прайс-лист</span>
        </a>

        <button
          class="flex flex-col items-center gap-[13px] w-full h-[105px] px-[15px] pt-[15px] pb-[13px]
                 rounded-tl-[8px] rounded-bl-[8px] gradient-icon
                 shadow-[inset_0_0_12px_0_rgba(255,255,255,0.3)]
                 transition-opacity hover:opacity-90 cursor-pointer"
          onclick="document.getElementById('consultation')?.scrollIntoView({behavior:'smooth'})"
          aria-label="Перезвоните мне">
          <img src="/icons/whats-app-logo.svg" alt="" aria-hidden="true" class="w-[37px] h-[36px] object-contain">
          <span class="font-sans text-[10px] leading-none text-white text-center">Перезвоните<br>мне</span>
        </button>

      </div>
    </section>
  `;
};
