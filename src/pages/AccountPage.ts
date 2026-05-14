import { cart } from "../services/cart";
import { favorites } from "../services/favorites";
import { getUser, logout, onAuthChange, type RegisteredUser } from "../services/auth";
import { t, getCurrentLang } from "../services/i18n";

const getInitials = (user: RegisteredUser): string => {
  const f = user.firstName.charAt(0).toUpperCase();
  const l = user.lastName.charAt(0).toUpperCase();
  return `${l}${f}` || "?";
};

const formatBirthDate = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const locale = getCurrentLang() === "en" ? "en-US" : "ru-RU";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
};

const formatCreatedAt = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const locale = getCurrentLang() === "en" ? "en-US" : "ru-RU";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
};

const fullName = (user: RegisteredUser): string => {
  const parts = [user.lastName, user.firstName, user.middleName].filter(Boolean);
  return parts.join(" ").trim() || user.nickname;
};

export const AccountPage = (): string => `
  <section id="account-page"
           class="hidden bg-[#F3F5F9] py-10 lg:py-16 min-h-[60vh]"
           aria-labelledby="account-heading">
    <div class="container-main">

      <a href="#"
         class="inline-flex items-center gap-2 font-sans text-[14px] lg:text-[15px]
                text-[#44444E] hover:text-[#FFC400] transition-colors mb-6 lg:mb-10">
        <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M10 3l-5 5 5 5"/>
        </svg>
        <span data-i18n="account-home">На главную</span>
      </a>

      <h1 id="account-heading"
          data-i18n="account-heading"
          class="font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[48px] xl:text-[56px] xl:leading-[1.15] gradient-text">
        ЛИЧНЫЙ КАБИНЕТ
      </h1>

      <div id="account-content" class="mt-6 lg:mt-10"></div>
    </div>
  </section>
`;

const renderProfileCard = (user: RegisteredUser): string => `
  <div class="bg-white rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10
              grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-8 items-start sm:items-center">
    <div class="grid size-[88px] sm:size-[100px] lg:size-[120px] place-items-center
                rounded-full gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                border border-[rgba(255,196,0,0.3)]
                font-sans font-normal text-[28px] sm:text-[32px] lg:text-[40px] text-primary"
         aria-hidden="true">
      ${getInitials(user)}
    </div>
    <div class="flex flex-col gap-2">
      <span class="font-sans text-[13px] uppercase tracking-[0.08em] text-[#FFC400]">
        @${user.nickname}
      </span>
      <h2 class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[32px] gradient-text">
        ${fullName(user)}
      </h2>
      <p class="font-sans text-[14px] lg:text-[15px] leading-[1.4] text-[#758499]">
        ${t("account-member-since")} ${formatCreatedAt(user.createdAt)}
      </p>
    </div>
  </div>
`;

const renderInfoCard = (user: RegisteredUser): string => `
  <div class="bg-white rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10">
    <h3 class="font-sans font-normal text-[20px] lg:text-[24px] leading-[1.2] text-primary mb-5 lg:mb-6">
      ${t("account-personal-data")}
    </h3>
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-4 lg:gap-y-5
               font-sans text-[14px] lg:text-[15px] leading-[1.4]">
      <div class="flex flex-col gap-1">
        <dt class="text-[13px] uppercase tracking-[0.04em] text-[#758499]">${t("account-phone")}</dt>
        <dd class="text-primary">${user.phone}</dd>
      </div>
      <div class="flex flex-col gap-1">
        <dt class="text-[13px] uppercase tracking-[0.04em] text-[#758499]">${t("account-email")}</dt>
        <dd class="text-primary break-all">${user.email}</dd>
      </div>
      <div class="flex flex-col gap-1">
        <dt class="text-[13px] uppercase tracking-[0.04em] text-[#758499]">${t("account-birthdate")}</dt>
        <dd class="text-primary">${formatBirthDate(user.birthDate)}</dd>
      </div>
      <div class="flex flex-col gap-1">
        <dt class="text-[13px] uppercase tracking-[0.04em] text-[#758499]">${t("account-nickname")}</dt>
        <dd class="text-primary">${user.nickname}</dd>
      </div>
    </dl>
  </div>
`;

const renderStatTile = (
  label: string,
  count: number,
  href: string,
  icon: string,
): string => `
  <a href="${href}"
     class="flex items-center gap-4 lg:gap-5 bg-white rounded-[14px] card-shadow p-5 lg:p-6
            hover:scale-[1.02] transition-transform no-underline cursor-pointer">
    <div class="grid size-12 lg:size-14 place-items-center rounded-[12px]
                gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                border border-[rgba(255,196,0,0.3)] shrink-0">
      ${icon}
    </div>
    <div class="flex flex-col">
      <span class="font-sans text-[13px] text-[#758499]">${label}</span>
      <span class="font-sans text-[22px] lg:text-[26px] leading-none text-primary mt-1">
        ${count}
      </span>
    </div>
    <svg viewBox="0 0 16 16" class="ml-auto size-4 text-[#758499]" fill="none"
         stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M6 3l5 5-5 5"/>
    </svg>
  </a>
`;

const renderStats = (): string => `
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
    ${renderStatTile(
      t("account-favorites-stat"),
      favorites.count(),
      "#favorites",
      `<svg viewBox="0 0 24 24" class="size-6 text-primary" fill="none" stroke="currentColor"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
         <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z"/>
       </svg>`,
    )}
    ${renderStatTile(
      t("account-cart-stat"),
      cart.count(),
      "#cart",
      `<img src="/icons/cart.svg" alt="" class="size-6" aria-hidden="true">`,
    )}
  </div>
`;

const renderActions = (): string => `
  <div class="bg-white rounded-[14px] card-shadow p-6 sm:p-8 lg:p-10
              flex flex-col sm:flex-row sm:items-center justify-between gap-5">
    <div>
      <h3 class="font-sans font-normal text-[20px] lg:text-[24px] leading-[1.2] text-primary">
        ${t("account-logout-title")}
      </h3>
      <p class="mt-2 font-sans text-[14px] lg:text-[15px] leading-[1.5] text-[#44444E] max-w-[480px]">
        ${t("account-logout-desc")}
      </p>
    </div>
    <button type="button"
            data-action="logout"
            class="self-start sm:self-auto inline-flex items-center justify-center rounded-full
                   bg-[#FAFAFA] border border-[#FFC400]
                   px-6 lg:px-8 py-[15px] font-sans text-[15px] lg:text-[17px] text-[#44444E]
                   hover:bg-white transition-colors cursor-pointer">
      ${t("account-logout-btn")}
    </button>
  </div>
`;

const render = (): void => {
  const content = document.getElementById("account-content");
  if (!content) return;

  const user = getUser();
  if (!user) {
    content.innerHTML = `
      <div class="bg-white rounded-[14px] card-shadow p-10 text-center">
        <h3 class="font-sans text-[20px] gradient-text">${t("account-login-first")}</h3>
        <a href="#auth"
           class="mt-4 inline-flex items-center justify-center rounded-full
                  bg-gradient-to-r from-button-first to-button-second
                  px-6 py-[15px] font-sans text-[15px] text-[#44444E]
                  shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] cursor-pointer">
          ${t("account-login-link")}
        </a>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="flex flex-col gap-5 lg:gap-6">
      ${renderProfileCard(user)}
      ${renderInfoCard(user)}
      ${renderStats()}
      ${renderActions()}
    </div>
  `;
};

const showPage = (show: boolean): void => {
  const page = document.getElementById("account-page");
  if (!page) return;
  page.classList.toggle("hidden", !show);
  if (show) {
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleRoute = (): void => {
  showPage(window.location.hash === "#account");
};

export const initAccountPage = (): void => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);
  onAuthChange(() => {
    if (window.location.hash === "#account") render();
  });
  cart.onChange(() => {
    if (window.location.hash === "#account") render();
  });
  favorites.onChange(() => {
    if (window.location.hash === "#account") render();
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-action="logout"]')) {
      if (confirm(t("account-logout-confirm"))) {
        logout();
        window.location.hash = "";
      }
    }
  });
};
