import { t } from "../services/i18n";
import { MessengerLinks } from "../shared/ui/MessengerLinks";

export const initFooter = (): void => {
  document.addEventListener("click", (event) => {
    const btn = (event.target as HTMLElement).closest(
      '[data-action="reset-settings"]',
    );
    if (!btn) return;
    if (confirm(t("footer-reset-confirm"))) {
      localStorage.clear();
      localStorage.setItem("theme", "light");
      window.location.hash = "";
      window.location.reload();
    }
  });
};

export const Footer = (): string => {
  return `
    <footer class="bg-surface border-t border-primary/10 transition-colors duration-300" aria-label="Подвал сайта">
      <div class="container-main py-[37px]">

        <!-- Основная строка -->
        <div class="flex flex-wrap items-center justify-between gap-8">

          <!-- Логотип -->
          <a href="/" aria-label="Металлобаза Волхонка — на главную" class="shrink-0">
            <img src="/icons/logo.svg" alt="Металлобаза Волхонка" class="h-[108px] w-[134px] object-contain">
          </a>

          <!-- PDF прайс-лист -->
          <a href="#" class="flex items-center gap-5 shrink-0 group" aria-label="Скачать прайс-лист PDF">
            <div class="size-[61px] rounded-full gradient-icon flex items-center justify-center shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0">
              <span class="text-[17px] font-sans text-primary font-normal">PDF</span>
            </div>
            <span class="text-[17px] text-primary font-normal group-hover:underline" data-i18n="footer-pdf-download">Скачать прайс-лист</span>
          </a>

          <!-- Кнопка каталога -->
          <a href="#catalog" class="btn-primary text-[17px] px-6 py-5 shrink-0" data-i18n="footer-catalog-btn">
            Посмотреть каталог товаров
          </a>

          <!-- Мессенджеры -->
          <div class="flex flex-col items-start gap-3 shrink-0">
            <div class="flex items-center gap-2">
              <span class="size-[6px] rounded-full bg-button-first shrink-0"></span>
              <span class="text-[13px] text-primary font-normal leading-[1.3]" data-i18n="footer-ask-online">Задайте вопрос online</span>
            </div>
            <div class="flex items-center gap-[15px]">
              ${MessengerLinks()}
            </div>
          </div>

          <!-- Телефон -->
          <div class="flex flex-col items-start shrink-0">
            <a href="tel:+78123255055"
               class="text-[28px] leading-[38px] font-sans font-normal gradient-text hover:opacity-80 transition-opacity">
              +7 (812) 325-50-55
            </a>
            <button class="text-[22px] leading-[30px] text-primary font-sans font-normal hover:underline cursor-pointer"
                    onclick="document.getElementById('consultation')?.scrollIntoView({behavior:'smooth'})"
                    data-i18n="footer-callback">
              Перезвоним Вам
            </button>
          </div>

        </div>

        <!-- Нижняя строка: ссылки + копирайт -->
        <div class="mt-[18px] flex flex-col items-center gap-2 border-t border-primary/10 pt-[18px]">
          <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Дополнительные ссылки">
            <a href="#company" class="font-sans font-normal text-[15px] sm:text-[17px] leading-[1.8] text-primary hover:underline"
               data-i18n="footer-company">
              О компании
            </a>
            <span class="hidden sm:inline-block size-1 rounded-full bg-primary/30" aria-hidden="true"></span>
            <a href="#reviews" class="font-sans font-normal text-[15px] sm:text-[17px] leading-[1.8] text-primary hover:underline"
               data-i18n="footer-reviews">
              Отзывы
            </a>
            <span class="hidden sm:inline-block size-1 rounded-full bg-primary/30" aria-hidden="true"></span>
            <a href="#" class="font-sans font-normal text-[15px] sm:text-[17px] leading-[1.8] text-primary hover:underline"
               data-i18n="footer-privacy">
              Политика конфиденциальности
            </a>
            <span class="hidden sm:inline-block size-1 rounded-full bg-primary/30" aria-hidden="true"></span>
            <button type="button" data-action="reset-settings" data-i18n="footer-reset"
                    class="font-sans font-normal text-[15px] sm:text-[17px] leading-[1.8] text-text-third hover:text-button-first hover:underline cursor-pointer transition-colors">
              Сбросить настройки
            </button>
          </nav>
          <p class="font-sans font-normal text-[15px] sm:text-[17px] leading-[1.8] text-primary text-center">
            Copyright © 2010 - 2022 | ООО «СУПЕРМЕТ»
          </p>
        </div>

      </div>
    </footer>
  `;
};
