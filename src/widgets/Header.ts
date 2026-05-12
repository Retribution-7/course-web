import { cart } from "../services/cart";
import { favorites } from "../services/favorites";

const CartIcon = (extraClass = ""): string => `
  <a href="#cart"
     class="cart-link relative grid place-items-center size-11 rounded-full
            gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Открыть корзину">
    <img src="/icons/cart.svg" alt="" class="size-5" aria-hidden="true">
    <span data-cart-badge
          class="cart-badge absolute -top-1 -right-1 hidden min-w-[20px] h-5 px-1.5
                 rounded-full bg-[#FFC400] text-primary font-sans text-[12px] leading-5
                 text-center font-medium">0</span>
  </a>
`;

const FavoritesIcon = (extraClass = ""): string => `
  <a href="#favorites"
     class="favorites-link relative grid place-items-center size-11 rounded-full
            border border-[#FFC400] bg-white shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Открыть избранное">
    <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor"
         stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z"/>
    </svg>
    <span data-favorites-badge
          class="favorites-badge absolute -top-1 -right-1 hidden min-w-[20px] h-5 px-1.5
                 rounded-full bg-[#FFC400] text-primary font-sans text-[12px] leading-5
                 text-center font-medium">0</span>
  </a>
`;

const AuthIcon = (extraClass = ""): string => `
  <a href="#auth"
     class="auth-link grid place-items-center size-11 rounded-full
            border border-[#FFC400] bg-white shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Войти или зарегистрироваться">
    <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor" stroke-width="1.6">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
    </svg>
  </a>
`;

export const Header = (): string => {
  return `
    <header class="bg-white w-full sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div class="container-main">
        <nav class="flex items-center justify-between gap-6 py-6 2xl:py-10" aria-label="Главная навигация">

          <!-- Логотип -->
          <a href="/" aria-label="Металлобаза Волхонка — на главную" class="shrink-0">
            <img src="/icons/logo.svg" alt="Металлобаза Волхонка" class="h-[60px] w-auto 2xl:h-[82px] 2xl:w-[100px] object-contain">
          </a>

          <!-- Разделитель + Адрес -->
          <div class="hidden 2xl:flex items-end gap-6 shrink-0">
            <div class="h-[70px] w-px bg-[#44444E] opacity-20"></div>
            <address class="not-italic text-[17px] leading-[1.8] text-primary font-sans">
              Санкт-Петербург, Горелово,<br>
              Волхонское шоссе, 6
            </address>
          </div>

          <!-- PDF прайс-лист -->
          <a href="#" class="hidden 2xl:flex items-center gap-5 shrink-0 group" aria-label="Скачать прайс-лист PDF">
            <div class="size-[61px] rounded-full gradient-icon flex items-center justify-center shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0">
              <span class="text-[17px] font-sans text-primary font-normal">PDF</span>
            </div>
            <span class="text-[17px] text-primary font-normal group-hover:underline">Скачать прайс-лист</span>
          </a>

          <!-- Кнопка каталога -->
          <a href="#catalog" class="hidden 2xl:inline-flex btn-primary text-[17px] px-6 py-5 shrink-0">
            Посмотреть каталог товаров
          </a>

          <!-- Мессенджеры -->
          <div class="hidden 2xl:flex flex-col items-start gap-3 shrink-0">
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

          <!-- Телефон (только на десктопе) -->
          <div class="hidden 2xl:flex flex-col items-end shrink-0">
            <a href="tel:+78123255055"
               class="text-[28px] leading-[38px] font-sans font-normal gradient-text hover:opacity-80 transition-opacity">
              +7 (812) 325-50-55
            </a>
            <button class="text-[22px] leading-[30px] text-primary font-sans font-normal hover:underline"
                    onclick="document.getElementById('consultation')?.scrollIntoView({behavior:'smooth'})">
              Перезвоним Вам
            </button>
          </div>

          <!-- Аккаунт + избранное + корзина (десктоп) -->
          <div class="hidden 2xl:flex items-center gap-3 shrink-0">
            ${AuthIcon()}
            ${FavoritesIcon()}
            ${CartIcon()}
          </div>

          <!-- Аккаунт + избранное + корзина (мобильный/планшет) -->
          <div class="2xl:hidden ml-auto flex items-center gap-2 shrink-0">
            ${AuthIcon()}
            ${FavoritesIcon()}
            ${CartIcon()}
          </div>

          <!-- Иконка телефона (мобильный/планшет) -->
          <a href="tel:+78123255055"
             class="2xl:hidden flex items-center justify-center size-11 rounded-full gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0"
             aria-label="Позвонить +7 (812) 325-50-55">
            <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.6.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.5-.5-.9-1-.9z"/>
            </svg>
          </a>

          <!-- Мобильное меню (hamburger) -->
          <button id="mobile-menu-btn" class="2xl:hidden flex flex-col gap-[5px] p-2 shrink-0"
                  aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
          </button>

        </nav>

        <!-- Мобильное меню (drawer) -->
        <div id="mobile-menu" class="hidden 2xl:hidden border-t border-gray-100 py-6 flex flex-col gap-5">
          <address class="not-italic text-[17px] leading-[1.6] text-primary">
            Санкт-Петербург, Горелово,<br>Волхонское шоссе, 6
          </address>
          <a href="#" class="flex items-center gap-4 text-[17px] text-primary" aria-label="Скачать прайс-лист">
            <div class="size-10 rounded-full gradient-icon flex items-center justify-center shrink-0">
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
          <button type="button"
                  class="text-[17px] text-left text-primary font-sans font-normal underline underline-offset-2"
                  onclick="document.getElementById('consultation')?.scrollIntoView({behavior:'smooth'}); document.getElementById('mobile-menu')?.classList.add('hidden');">
            Перезвоним Вам
          </button>
        </div>
      </div>
    </header>
  `;
};

const syncCartBadges = (): void => {
  const count = cart.count();
  document.querySelectorAll<HTMLElement>("[data-cart-badge]").forEach((badge) => {
    badge.textContent = String(count);
    badge.classList.toggle("hidden", count === 0);
  });
};

const syncFavoritesBadges = (): void => {
  const count = favorites.count();
  document.querySelectorAll<HTMLElement>("[data-favorites-badge]").forEach((badge) => {
    badge.textContent = String(count);
    badge.classList.toggle("hidden", count === 0);
  });
};

export const initHeader = (): void => {
  syncCartBadges();
  syncFavoritesBadges();
  cart.onChange(syncCartBadges);
  favorites.onChange(syncFavoritesBadges);

  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
};
