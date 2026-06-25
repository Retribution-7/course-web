import { isAdmin, isAuthenticated, onAuthChange } from "../services/auth";
import { cart } from "../services/cart";
import { favorites } from "../services/favorites";
import { getCurrentLang, getTranslate, type Lang } from "../services/i18n";
import { MessengerLinks } from "../shared/ui/MessengerLinks";
import { A11yToggle } from "./A11yPanel";

const CartIcon = (extraClass = ""): string => `
  <a href="#cart"
     class="cart-link relative grid place-items-center size-11 rounded-full
            gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Открыть корзину">
    <img src="/icons/cart.svg" alt="" class="size-5" aria-hidden="true">
    <span data-cart-badge
          class="cart-badge absolute -top-1 -right-1 hidden min-w-[20px] h-5 px-1.5
                 rounded-full bg-button-first text-primary font-sans text-[12px] leading-5
                 text-center font-medium">0</span>
  </a>
`;

const FavoritesIcon = (extraClass = ""): string => `
  <a href="#favorites"
     class="favorites-link relative grid place-items-center size-11 rounded-full
            border border-button-first bg-surface shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Открыть избранное">
    <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor"
         stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z"/>
    </svg>
    <span data-favorites-badge
          class="favorites-badge absolute -top-1 -right-1 hidden min-w-[20px] h-5 px-1.5
                 rounded-full bg-button-first text-primary font-sans text-[12px] leading-5
                 text-center font-medium">0</span>
  </a>
`;

const AuthIcon = (extraClass = ""): string => `
  <a href="#auth"
     data-auth-link
     class="auth-link grid place-items-center size-11 rounded-full
            border border-button-first bg-surface shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Войти или зарегистрироваться">
    <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor" stroke-width="1.6">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
    </svg>
  </a>
`;

const AdminIcon = (extraClass = ""): string => `
  <a href="#admin"
     data-admin-link
     style="display:none"
     class="place-items-center size-11 rounded-full
            gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0
            transition-transform hover:scale-105 ${extraClass}"
     aria-label="Панель администратора">
    <svg viewBox="0 0 24 24" class="size-5 text-white" fill="none" stroke="currentColor"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
    </svg>
  </a>
`;

const ThemeToggle = (): string => `
  <button type="button" data-theme-btn
          class="relative grid place-items-center size-11 rounded-full
                 bg-bg-first border border-button-first shrink-0
                 transition-transform hover:scale-105"
          aria-label="Переключить тему">
    <svg data-theme-icon-light class="size-5 text-primary transition-opacity duration-300" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <svg data-theme-icon-dark class="size-5 text-primary transition-opacity duration-300 hidden" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
`;

const LangToggle = (): string => `
  <div class="relative flex items-center bg-bg-first rounded-full p-0.5 shrink-0"
       role="group" aria-label="Language / Язык">
    <div data-lang-indicator
         class="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full
                bg-gradient-to-r from-button-first to-button-second
                shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                transition-transform duration-300 pointer-events-none"></div>
    <button type="button" data-lang-btn="ru"
            class="lang-btn relative z-10 w-9 h-8 font-sans text-[13px] font-medium text-primary cursor-pointer">
      RU
    </button>
    <button type="button" data-lang-btn="en"
            class="lang-btn relative z-10 w-9 h-8 font-sans text-[13px] font-medium text-primary cursor-pointer">
      EN
    </button>
  </div>
`;

export const Header = (): string => {
	return `
    <header class="bg-surface w-full sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-colors duration-300">
      <div class="container-main">
        <nav class="flex items-center justify-between gap-6 py-6 2xl:py-10" aria-label="Главная навигация">

          <!-- Логотип -->
          <a href="/" aria-label="Металлобаза Волхонка — на главную" class="shrink-0">
            <img src="/icons/logo.svg" alt="Металлобаза Волхонка" class="h-[60px] w-auto 2xl:h-[82px] 2xl:w-[100px] object-contain">
          </a>

          <!-- Разделитель + Адрес -->
          <div class="hidden 3xl:flex items-end gap-6 shrink-0">
            <div class="h-[70px] w-px bg-primary opacity-20"></div>
            <address class="not-italic text-[17px] leading-[1.8] text-primary font-sans">
              Санкт-Петербург, Горелово,<br>
              Волхонское шоссе, 6
            </address>
          </div>

          <!-- PDF прайс-лист -->
          <a href="#" class="hidden 3xl:flex items-center gap-5 shrink-0 group" aria-label="Скачать прайс-лист PDF">
            <div class="size-[61px] rounded-full gradient-icon flex items-center justify-center shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0">
              <span class="text-[17px] font-sans text-primary font-normal">PDF</span>
            </div>
            <span class="text-[17px] text-primary font-normal group-hover:underline" data-i18n="header-pdf-download">Скачать прайс-лист</span>
          </a>

          <!-- Кнопка каталога -->
          <a href="#catalog" class="hidden 2xl:inline-flex btn-primary text-[17px] px-6 py-5 shrink-0" data-i18n="header-catalog-btn"
             onclick="document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'}); return false;">
            Посмотреть каталог товаров
          </a>

          <!-- Мессенджеры -->
          <div class="hidden 2xl:flex flex-col items-start gap-3 shrink-0">
            <div class="flex items-center gap-2">
              <span class="size-[6px] rounded-full bg-button-first shrink-0"></span>
              <span class="text-[13px] text-primary font-normal leading-[1.3]" data-i18n="header-ask-online">Задайте вопрос online</span>
            </div>
            <div class="flex items-center gap-[15px]">
              ${MessengerLinks()}
            </div>
          </div>

          <!-- Переключатель языка + темы + Доступность + Аккаунт + избранное + корзина (десктоп) -->
          <div class="hidden 2xl:flex items-center gap-3 shrink-0">
            ${A11yToggle()}
            ${LangToggle()}
            ${ThemeToggle()}
            ${AdminIcon()}
            ${AuthIcon()}
            ${FavoritesIcon()}
            ${CartIcon()}
          </div>

          <!-- Аккаунт + избранное + корзина (мобильный/планшет, прячем ниже 440px) -->
          <div class="2xl:hidden ml-auto hidden min-[440px]:flex items-center gap-2 shrink-0">
            ${AdminIcon()}
            ${AuthIcon()}
            ${FavoritesIcon()}
            ${CartIcon()}
          </div>

          <!-- Иконка телефона (мобильный/планшет) -->
          <a href="tel:+78123255055"
             class="2xl:hidden flex items-center justify-center size-11 rounded-full gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] shrink-0 ml-auto min-[440px]:ml-0"
             aria-label="Позвонить +7 (812) 325-50-55">
            <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.6.2-1-.4-1.2-.6-2.4-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.5-.5-.9-1-.9z"/>
            </svg>
          </a>

          <!-- Мобильное меню (hamburger) -->
          <button id="mobile-menu-btn" class="3xl:hidden flex flex-col gap-[5px] p-2 shrink-0"
                  aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
            <span class="block w-6 h-0.5 bg-primary transition-all"></span>
          </button>

        </nav>

        <!-- Мобильное меню (drawer) -->
        <div id="mobile-menu" class="hidden 3xl:hidden border-t border-gray-100 py-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-80px)]">

          <!-- Аккаунт + избранное + корзина (только когда не помещаются в шапку, т.е. ниже 440px) -->
          <div class="min-[440px]:hidden flex flex-col gap-3">
            <a href="#admin" data-admin-link
               style="display:none"
               class="flex items-center gap-4 text-[17px] text-primary"
               aria-label="Панель администратора">
              <div class="size-10 rounded-full gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" class="size-5 text-white" fill="none" stroke="currentColor"
                     stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
                </svg>
              </div>
              <span data-i18n="header-admin">Панель администратора</span>
            </a>
            <a href="#auth" data-auth-link
               class="flex items-center gap-4 text-[17px] text-primary"
               aria-label="Войти или зарегистрироваться">
              <div class="size-10 rounded-full border border-button-first bg-surface grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <span data-i18n="header-account">Личный кабинет</span>
            </a>
            <a href="#favorites"
               class="flex items-center gap-4 text-[17px] text-primary">
              <div class="relative size-10 rounded-full border border-button-first bg-surface grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor"
                     stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z"/>
                </svg>
                <span data-favorites-badge
                      class="absolute -top-1 -right-1 hidden min-w-[20px] h-5 px-1.5 rounded-full bg-button-first text-primary font-sans text-[12px] leading-5 text-center font-medium">0</span>
              </div>
              <span data-i18n="header-favorites">Избранное</span>
            </a>
            <a href="#cart"
               class="flex items-center gap-4 text-[17px] text-primary">
              <div class="relative size-10 rounded-full gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)] grid place-items-center shrink-0">
                <img src="/icons/cart.svg" alt="" class="size-5" aria-hidden="true">
                <span data-cart-badge
                      class="absolute -top-1 -right-1 hidden min-w-[20px] h-5 px-1.5 rounded-full bg-button-first text-primary font-sans text-[12px] leading-5 text-center font-medium">0</span>
              </div>
              <span data-i18n="header-cart">Корзина</span>
            </a>
          </div>

          <address class="not-italic text-[17px] leading-[1.6] text-primary">
            Санкт-Петербург, Горелово,<br>Волхонское шоссе, 6
          </address>
          <a href="#" class="flex items-center gap-4 text-[17px] text-primary" aria-label="Скачать прайс-лист">
            <div class="size-10 rounded-full gradient-icon flex items-center justify-center shrink-0">
              <span class="text-xs text-primary">PDF</span>
            </div>
            <span data-i18n="header-pdf-download">Скачать прайс-лист</span>
          </a>
          <a href="#catalog" class="btn-primary w-full text-center text-[17px] px-6 py-4" data-i18n="header-catalog-btn"
             onclick="document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'}); return false;">
            Посмотреть каталог товаров
          </a>
          <div class="flex gap-3">
            ${MessengerLinks(true)}
          </div>
          <button type="button"
                  class="text-[17px] text-left text-primary font-sans font-normal underline underline-offset-2"
                  onclick="document.getElementById('consultation')?.scrollIntoView({behavior:'smooth'}); document.getElementById('mobile-menu')?.classList.add('hidden');"
                  data-i18n="header-callback">
            Перезвоним Вам
          </button>

          <!-- Переключатель языка, темы и доступности в мобильном меню -->
          <div class="flex items-center gap-3 flex-wrap">
            ${A11yToggle()}
            ${LangToggle()}
            ${ThemeToggle()}
          </div>

        </div>
      </div>
    </header>
  `;
};


const syncCartBadges = (): void => {
	const count = cart.count();
	document
		.querySelectorAll<HTMLElement>("[data-cart-badge]")
		.forEach((badge) => {
			badge.textContent = String(count);
			badge.classList.toggle("hidden", count === 0);
		});
};


const syncFavoritesBadges = (): void => {
	const count = favorites.count();
	document
		.querySelectorAll<HTMLElement>("[data-favorites-badge]")
		.forEach((badge) => {
			badge.textContent = String(count);
			badge.classList.toggle("hidden", count === 0);
		});
};


const syncAuthLink = (): void => {
	const auth = isAuthenticated();
	document
		.querySelectorAll<HTMLAnchorElement>("[data-auth-link]")
		.forEach((link) => {
			link.href = auth ? "#account" : "#auth";
			link.setAttribute(
				"aria-label",
				auth ? "Личный кабинет" : "Войти или зарегистрироваться",
			);
		});
};


const syncAdminLink = (): void => {
	const admin = isAdmin();
	document.querySelectorAll<HTMLElement>("[data-admin-link]").forEach((el) => {
		el.style.display = admin ? "grid" : "none";
	});
};


const updateLangToggle = (lang: Lang): void => {
	const isEn = lang === "en";
	document
		.querySelectorAll<HTMLElement>("[data-lang-indicator]")
		.forEach((el) => {
			el.style.transform = isEn ? "translateX(100%)" : "translateX(0)";
		});
	document
		.querySelectorAll<HTMLButtonElement>("[data-lang-btn]")
		.forEach((btn) => {
			btn.classList.toggle("active", btn.dataset.langBtn === lang);
		});
};


const updateThemeIcons = (isDark: boolean): void => {
	document
		.querySelectorAll<HTMLElement>("[data-theme-icon-light]")
		.forEach((el) => {
			el.classList.toggle("hidden", isDark);
		});
	document
		.querySelectorAll<HTMLElement>("[data-theme-icon-dark]")
		.forEach((el) => {
			el.classList.toggle("hidden", !isDark);
		});
};


export const initTheme = (): void => {
	const saved = localStorage.getItem("theme");
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const isDark = saved === "dark" || (!saved && prefersDark);
	document.documentElement.classList.toggle("dark", isDark);
	updateThemeIcons(isDark);
};


export const initHeader = (): void => {
	syncCartBadges();
	syncFavoritesBadges();
	syncAuthLink();
	syncAdminLink();
	cart.onChange(syncCartBadges);
	favorites.onChange(syncFavoritesBadges);
	onAuthChange(syncAuthLink);
	onAuthChange(syncAdminLink);

	updateLangToggle(getCurrentLang());

	document
		.querySelectorAll<HTMLButtonElement>("[data-lang-btn]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				const lang = btn.dataset.langBtn as Lang;
				getTranslate(lang);
				updateLangToggle(lang);
			});
		});

	document
		.querySelectorAll<HTMLButtonElement>("[data-theme-btn]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				const isDark = document.documentElement.classList.toggle("dark");
				localStorage.setItem("theme", isDark ? "dark" : "light");
				updateThemeIcons(isDark);
			});
		});

	const btn = document.getElementById("mobile-menu-btn");
	const menu = document.getElementById("mobile-menu");
	if (!btn || !menu) return;

	btn.addEventListener("click", () => {
		const isOpen = !menu.classList.contains("hidden");
		menu.classList.toggle("hidden", isOpen);
		btn.setAttribute("aria-expanded", String(!isOpen));
	});
};
