import {
	fetchProducts,
	fetchReviews,
	fetchUsers,
	getAllCartItems,
} from "../../services/api";
import { isAdmin, onAuthChange } from "../../services/auth";
import { t } from "../../services/i18n";
import { BackLink } from "../../shared/ui/BackLink";
import { createPageRouter } from "../../shared/lib/page";
import { renderUsersTab } from "./UsersTab";
import { renderProductsTab } from "./ProductsTab";
import { renderReviewsTab } from "./ReviewsTab";
import { StatCard } from "./shared";

type AdminTab = "users" | "products" | "reviews";

let currentTab: AdminTab = "users";

const formatPrice = (n: number): string =>
	`${n.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽`;

export const AdminPage = (): string => `
  <section id="admin-page"
           class="hidden bg-bg-first py-10 lg:py-16 min-h-screen transition-colors duration-300"
           aria-labelledby="admin-heading">
    <div class="container-main">

      ${BackLink("#", "admin-home", "На главную")}

      <h1 id="admin-heading"
          data-i18n="admin-heading"
          class="font-sans font-normal text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px]
                 leading-[1.1] gradient-text">
        ПАНЕЛЬ АДМИНИСТРАТОРА
      </h1>

      <div id="admin-stats"
           class="mt-6 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-10">
      </div>

      <div class="max-sm:flex-wrap flex gap-2 mb-6 overflow-x-auto pb-1" role="tablist">
        <button type="button" data-admin-tab="users" role="tab" aria-selected="true"
                class="admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all">
          <span data-i18n="admin-tab-users">Пользователи</span>
        </button>
        <button type="button" data-admin-tab="products" role="tab" aria-selected="false"
                class="admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all">
          <span data-i18n="admin-tab-products">Товары</span>
        </button>
        <button type="button" data-admin-tab="reviews" role="tab" aria-selected="false"
                class="admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all">
          <span data-i18n="admin-tab-reviews">Отзывы</span>
        </button>
      </div>

      <div id="admin-content" class="min-h-[400px]"></div>
    </div>
  </section>
`;

const loadStats = async (): Promise<void> => {
	const el = document.getElementById("admin-stats");
	if (!el) return;
	try {
		const [users, products, reviews, cart] = await Promise.all([
			fetchUsers(),
			fetchProducts(),
			fetchReviews(),
			getAllCartItems(),
		]);
		const revenue = cart.reduce((s, i) => s + i.total, 0);
		el.innerHTML = `
      ${StatCard(
				t("admin-stat-users"),
				users.length,
				`<svg viewBox="0 0 24 24" class="size-6 text-primary" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`,
				"gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]",
			)}
      ${StatCard(
				t("admin-stat-products"),
				products.length,
				`<svg viewBox="0 0 24 24" class="size-6 text-[#2E7D32]" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
				"bg-[#E8F5E9]",
			)}
      ${StatCard(
				t("admin-stat-reviews"),
				reviews.length,
				`<svg viewBox="0 0 24 24" class="size-6 text-[#E65100]" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
				"bg-[#FFF3E0]",
			)}
      ${StatCard(
				t("admin-stat-revenue"),
				formatPrice(revenue),
				`<svg viewBox="0 0 24 24" class="size-6 text-[#1565C0]" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
				"bg-[#E3F2FD]",
			)}
    `;
	} catch {
		el.innerHTML = "";
	}
};

const updateTabStyles = (active: AdminTab): void => {
	document
		.querySelectorAll<HTMLButtonElement>("[data-admin-tab]")
		.forEach((btn) => {
			const isActive = btn.dataset.adminTab === active;
			btn.setAttribute("aria-selected", String(isActive));
			btn.className = [
				"admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all",
				isActive
					? "bg-gradient-to-r from-button-first to-button-second shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] text-primary border border-[rgba(255,196,0,0.4)]"
					: "bg-surface border border-primary/20 text-primary hover:border-button-first",
			].join(" ");
		});
};

const switchTab = (tab: AdminTab): void => {
	currentTab = tab;
	updateTabStyles(tab);
	if (tab === "users") void renderUsersTab();
	else if (tab === "products") void renderProductsTab();
	else void renderReviewsTab();
};

const onAdminShow = (): void => {
	void loadStats();
	switchTab(currentTab);
};

export const initAdminPage = (): void => {
	const handleRoute = createPageRouter("admin-page", "#admin", onAdminShow);
	handleRoute();
	window.addEventListener("hashchange", handleRoute);

	onAuthChange(() => {
		if (window.location.hash === "#admin") {
			if (!isAdmin()) {
				window.location.hash = "";
			} else {
				void loadStats();
			}
		}
	});

	document
		.querySelectorAll<HTMLButtonElement>("[data-admin-tab]")
		.forEach((btn) => {
			btn.addEventListener("click", () => {
				switchTab(btn.dataset.adminTab as AdminTab);
			});
		});
};
