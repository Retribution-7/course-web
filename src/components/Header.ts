export const Header = (): string => {
  return `
    <header class="bg-white w-full sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div class="container-main">
        <nav class="flex items-center justify-between gap-8 py-10" aria-label="Главная навигация">

          <!-- Логотип -->
          <a href="/" aria-label="Металлобаза Волхонка — на главную" class="shrink-0">
            <img src="/icons/logo.svg" alt="Металлобаза Волхонка" class="h-[82px] w-[100px] object-contain">
          </a>

          <!-- Разделитель + Адрес -->
          <div class="hidden xl:flex items-end gap-6 shrink-0">
            <div class="h-[70px] w-px bg-[#44444E] opacity-20"></div>
            <address class="not-italic text-[17px] leading-[1.8] text-primary font-sans">
              Санкт-Петербург, Горелово,<br>
              Волхонское шоссе, 6
            </address>
          </div>

          <!-- PDF прайс-лист -->
          <a href="#" class="hidden lg:flex items-center gap-5 shrink-0 group" aria-label="Скачать прайс-лист PDF">
            <div class="size-[61px] rounded-full gradient-icon flex items-center justify-center shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0">
              <span class="text-[17px] font-sans text-primary font-normal">PDF</span>
            </div>
            <span class="text-[17px] text-primary font-normal group-hover:underline">Скачать прайс-лист</span>
          </a>

          <!-- Кнопка каталога -->
          <a href="#catalog" class="hidden lg:inline-flex btn-primary text-[17px] px-6 py-5 shrink-0">
            Посмотреть каталог товаров
          </a>

          <!-- Мессенджеры -->
          <div class="hidden xl:flex flex-col items-start gap-3 shrink-0">
            <div class="flex items-center gap-2">
              <span class="size-[6px] rounded-full bg-[#FFC400] shrink-0"></span>
              <span class="text-[13px] text-primary font-normal leading-[1.3]">Задайте вопрос online</span>
            </div>
            <div class="flex items-center gap-[15px]">
              <a href="https://wa.me/78123255055" target="_blank" rel="noopener noreferrer"
                 class="flex items-center justify-center w-[50px] h-[41px] rounded-[8px] shrink-0 transition-opacity hover:opacity-80"
                 style="background: linear-gradient(145deg, rgba(0,215,41,0.3) 0%, rgb(0,215,41) 100%)"
                 aria-label="WhatsApp">
                <img src="/icons/whats-app-logo.svg" alt="WhatsApp" class="size-[19px]">
              </a>
              <a href="https://t.me/metallobaza" target="_blank" rel="noopener noreferrer"
                 class="flex items-center justify-center w-[50px] h-[41px] rounded-[8px] shrink-0 transition-opacity hover:opacity-80"
                 style="background: linear-gradient(145deg, rgba(40,169,234,0.3) 0%, rgb(40,169,234) 100%)"
                 aria-label="Telegram">
                <img src="/icons/telegram-logo.svg" alt="Telegram" class="size-[19px]">
              </a>
              <a href="https://vk.com/metallobaza" target="_blank" rel="noopener noreferrer"
                 class="flex items-center justify-center w-[50px] h-[41px] rounded-[8px] bg-[#0077FF] shrink-0 transition-opacity hover:opacity-80"
                 aria-label="ВКонтакте">
                <img src="/icons/vk-logo.svg" alt="ВКонтакте" class="size-[19px]">
              </a>
            </div>
          </div>

          <!-- Телефон -->
          <div class="flex flex-col items-end shrink-0">
            <a href="tel:+78123255055"
               class="text-[28px] leading-[38px] font-sans font-normal gradient-text hover:opacity-80 transition-opacity">
              +7 (812) 325-50-55
            </a>
            <button class="text-[22px] leading-[30px] text-primary font-sans font-normal hover:underline"
                    onclick="document.getElementById('consultation')?.scrollIntoView({behavior:'smooth'})">
              Перезвоним Вам
            </button>
          </div>

          <!-- Мобильное меню (hamburger) -->
          <button id="mobile-menu-btn" class="xl:hidden flex flex-col gap-[5px] p-2 shrink-0"
                  aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
          </button>

        </nav>

        <!-- Мобильное меню -->
        <div id="mobile-menu" class="hidden xl:hidden border-t border-gray-100 py-6 flex flex-col gap-5">
          <address class="not-italic text-[17px] leading-[1.8] text-primary">
            Санкт-Петербург, Горелово, Волхонское шоссе, 6
          </address>
          <a href="#" class="flex items-center gap-4 text-[17px] text-primary" aria-label="Скачать прайс-лист">
            <div class="size-10 rounded-full gradient-icon flex items-center justify-center">
              <span class="text-xs text-primary">PDF</span>
            </div>
            Скачать прайс-лист
          </a>
          <a href="#catalog" class="btn-primary w-full text-center text-[17px] px-6 py-4">
            Посмотреть каталог товаров
          </a>
          <div class="flex gap-3">
            <a href="https://wa.me/78123255055" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center w-[50px] h-[41px] rounded-[8px]"
               style="background: linear-gradient(145deg, rgba(0,215,41,0.3) 0%, rgb(0,215,41) 100%)"
               aria-label="WhatsApp">
              <img src="/icons/whats-app-logo.svg" alt="WhatsApp" class="size-[19px]">
            </a>
            <a href="https://t.me/metallobaza" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center w-[50px] h-[41px] rounded-[8px]"
               style="background: linear-gradient(145deg, rgba(40,169,234,0.3) 0%, rgb(40,169,234) 100%)"
               aria-label="Telegram">
              <img src="/icons/telegram-logo.svg" alt="Telegram" class="size-[19px]">
            </a>
            <a href="https://vk.com/metallobaza" target="_blank" rel="noopener noreferrer"
               class="flex items-center justify-center w-[50px] h-[41px] rounded-[8px] bg-[#0077FF]"
               aria-label="ВКонтакте">
              <img src="/icons/vk-logo.svg" alt="ВКонтакте" class="size-[19px]">
            </a>
          </div>
          <a href="tel:+78123255055" class="text-[22px] font-sans gradient-text">
            +7 (812) 325-50-55
          </a>
        </div>
      </div>
    </header>
  `;
};

export const initHeader = (): void => {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
};
