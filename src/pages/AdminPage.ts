import { isAdmin, getUser, onAuthChange } from "../services/auth";
import {
  fetchUsers,
  fetchProducts,
  fetchReviews,
  updateUser,
  getAllCartItems,
  postProduct,
  deleteProduct,
  deleteReview,
  type ApiUser,
} from "../services/api";
import type { Product } from "../entities/products";

type AdminTab = "users" | "products" | "reviews";

let currentTab: AdminTab = "users";

const CATEGORY_LABELS: Record<string, string> = {
  "metal-tile": "Металлочерепица",
  "corrugated-sheet": "Профнастил",
  "seam-roofing": "Фальцевая кровля",
};

const ROLE_LABELS: Record<string, string> = {
  customer: "Покупатель",
  admin: "Администратор",
  manager: "Менеджер",
};

const ROLE_COLORS: Record<string, string> = {
  customer: "bg-[#E8F5E9] text-[#2E7D32]",
  admin: "bg-gradient-to-r from-button-first to-button-second text-primary",
  manager: "bg-[#E3F2FD] text-[#1565C0]",
};

const formatPrice = (n: number): string =>
  n.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " ₽";

// ── Static template ───────────────────────────────────────────────────────────

export const AdminPage = (): string => `
  <section id="admin-page"
           class="hidden bg-[#F3F5F9] py-10 lg:py-16 min-h-screen"
           aria-labelledby="admin-heading">
    <div class="container-main">

      <a href="#"
         class="inline-flex items-center gap-2 font-sans text-[14px] text-[#44444E]
                hover:text-[#FFC400] transition-colors mb-6 lg:mb-10">
        <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M10 3l-5 5 5 5"/>
        </svg>
        На главную
      </a>

      <h1 id="admin-heading"
          class="font-sans font-normal text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px]
                 leading-[1.1] gradient-text">
        ПАНЕЛЬ АДМИНИСТРАТОРА
      </h1>

      <div id="admin-stats"
           class="mt-6 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 lg:mb-10">
      </div>

      <div class="flex gap-2 mb-6 overflow-x-auto pb-1" role="tablist" aria-label="Разделы панели">
        <button type="button" data-admin-tab="users" role="tab" aria-selected="true"
                class="admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all">
          Пользователи
        </button>
        <button type="button" data-admin-tab="products" role="tab" aria-selected="false"
                class="admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all">
          Товары
        </button>
        <button type="button" data-admin-tab="reviews" role="tab" aria-selected="false"
                class="admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all">
          Отзывы
        </button>
      </div>

      <div id="admin-content" class="min-h-[400px]"></div>
    </div>
  </section>
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

const StatCard = (label: string, value: string | number, iconHtml: string, bgClass: string): string => `
  <div class="bg-white rounded-[14px] card-shadow p-5 lg:p-6 flex items-center gap-4">
    <div class="grid size-12 lg:size-14 place-items-center rounded-[12px] shrink-0 ${bgClass}">
      ${iconHtml}
    </div>
    <div>
      <p class="font-sans text-[13px] text-[#758499]">${label}</p>
      <p class="font-sans text-[24px] lg:text-[28px] leading-none text-primary mt-0.5">${value}</p>
    </div>
  </div>
`;

const Spinner = (): string => `
  <div class="flex items-center justify-center py-20">
    <div class="w-10 h-10 rounded-full border-2 border-[#FFC400] border-t-transparent animate-spin"></div>
  </div>
`;

const TableWrap = (content: string): string => `
  <div class="bg-white rounded-[14px] card-shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full font-sans text-[14px]">${content}</table>
    </div>
  </div>
`;

const ThRow = (...cols: string[]): string => `
  <thead>
    <tr class="bg-[#F3F5F9]">
      ${cols.map((c) => `<th class="px-4 py-3 text-left font-sans text-[12px] uppercase tracking-[0.06em] text-[#758499] whitespace-nowrap">${c}</th>`).join("")}
    </tr>
  </thead>
`;

const showLoading = (): void => {
  const el = document.getElementById("admin-content");
  if (el) el.innerHTML = Spinner();
};

// ── Stats ─────────────────────────────────────────────────────────────────────

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
        "Пользователей",
        users.length,
        `<svg viewBox="0 0 24 24" class="size-6 text-primary" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`,
        "gradient-icon shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]",
      )}
      ${StatCard(
        "Товаров в каталоге",
        products.length,
        `<svg viewBox="0 0 24 24" class="size-6 text-[#2E7D32]" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
        "bg-[#E8F5E9]",
      )}
      ${StatCard(
        "Отзывов",
        reviews.length,
        `<svg viewBox="0 0 24 24" class="size-6 text-[#E65100]" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        "bg-[#FFF3E0]",
      )}
      ${StatCard(
        "Выручка (корзины)",
        formatPrice(revenue),
        `<svg viewBox="0 0 24 24" class="size-6 text-[#1565C0]" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
        "bg-[#E3F2FD]",
      )}
    `;
  } catch {
    el.innerHTML = "";
  }
};

// ── Tab Styles ────────────────────────────────────────────────────────────────

const updateTabStyles = (active: AdminTab): void => {
  document.querySelectorAll<HTMLButtonElement>("[data-admin-tab]").forEach((btn) => {
    const isActive = btn.dataset.adminTab === active;
    btn.setAttribute("aria-selected", String(isActive));
    btn.className = [
      "admin-tab-btn shrink-0 px-5 py-2.5 rounded-full font-sans text-[15px] cursor-pointer transition-all",
      isActive
        ? "bg-gradient-to-r from-button-first to-button-second shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] text-primary border border-[rgba(255,196,0,0.4)]"
        : "bg-white border border-[#ddd] text-[#44444E] hover:border-[#FFC400]",
    ].join(" ");
  });
};

// ── Users Tab ─────────────────────────────────────────────────────────────────

const RoleBadge = (role: string): string => {
  const label = ROLE_LABELS[role] ?? role;
  const cls = ROLE_COLORS[role] ?? "bg-gray-100 text-gray-600";
  return `<span class="inline-block px-2.5 py-0.5 rounded-full text-[12px] ${cls}">${label}</span>`;
};

const renderUsersTab = async (): Promise<void> => {
  const el = document.getElementById("admin-content");
  if (!el) return;
  showLoading();
  try {
    const users = await fetchUsers();
    const currentPhone = getUser()?.phone ?? "";

    const rows = users.map((u) => {
      const isSelf = u.phone === currentPhone;
      const nextRole = u.role === "admin" ? "customer" : "admin";
      const btnLabel = u.role === "admin" ? "Сделать покупателем" : "Сделать админом";
      return `
        <tr class="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors">
          <td class="px-4 py-3 text-[#758499]">#${u.id}</td>
          <td class="px-4 py-3">
            <div class="text-primary">${u.lastName} ${u.firstName}</div>
            <div class="text-[12px] text-[#758499]">@${u.nickname ?? "—"}</div>
          </td>
          <td class="px-4 py-3 text-[#44444E] whitespace-nowrap">${u.phone}</td>
          <td class="px-4 py-3 text-[#44444E] break-all">${u.email}</td>
          <td class="px-4 py-3">${RoleBadge(u.role ?? "customer")}</td>
          <td class="px-4 py-3 text-[#758499] whitespace-nowrap">
            ${u.createdAt ? new Date(u.createdAt).toLocaleDateString("ru-RU") : "—"}
          </td>
          <td class="px-4 py-3">
            ${
              isSelf
                ? `<span class="text-[12px] text-[#758499] italic">Вы</span>`
                : `<button type="button"
                           data-change-role="${u.id}"
                           data-next-role="${nextRole}"
                           class="text-[13px] px-3 py-1.5 rounded-full border border-[#FFC400]
                                  bg-white text-[#44444E] hover:bg-[#FFFBEF] transition-colors cursor-pointer">
                     ${btnLabel}
                   </button>`
            }
          </td>
        </tr>`;
    }).join("");

    el.innerHTML = `
      <div class="mb-5">
        <h3 class="font-sans font-normal text-[20px] text-primary">Все пользователи (${users.length})</h3>
      </div>
      ${TableWrap(`
        ${ThRow("ID", "Пользователь", "Телефон", "E-mail", "Роль", "Дата регистрации", "Действия")}
        <tbody>
          ${rows || `<tr><td colspan="7" class="px-4 py-8 text-center text-[#758499]">Нет пользователей</td></tr>`}
        </tbody>
      `)}
    `;

    el.querySelectorAll<HTMLButtonElement>("[data-change-role]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.changeRole);
        const nextRole = btn.dataset.nextRole ?? "customer";
        btn.disabled = true;
        try {
          await updateUser(id, { role: nextRole });
          void renderUsersTab();
        } catch {
          alert("Ошибка изменения роли");
          btn.disabled = false;
        }
      });
    });
  } catch {
    el.innerHTML = `<div class="p-8 text-center text-red-500">Ошибка загрузки пользователей</div>`;
  }
};

// ── Products Tab ──────────────────────────────────────────────────────────────

const INPUT_CLS =
  "h-11 rounded-[8px] border border-[#ddd] px-3 font-sans text-[14px] " +
  "focus:outline-none focus:border-[#FFC400] transition-colors bg-white w-full";

const ProductAddFormHTML = (): string => `
  <div id="product-add-form" class="hidden bg-white rounded-[14px] card-shadow p-6 mb-5">
    <h3 class="font-sans font-normal text-[20px] text-primary mb-5">Новый товар</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Название <span class="text-red-500">*</span></label>
        <input id="pf-title" type="text" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Бренд</label>
        <input id="pf-brand" type="text" value="Grande Line" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Категория <span class="text-red-500">*</span></label>
        <select id="pf-category" class="${INPUT_CLS}">
          <option value="metal-tile">Металлочерепица</option>
          <option value="corrugated-sheet">Профнастил</option>
          <option value="seam-roofing">Фальцевая кровля</option>
        </select>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Цена, ₽/м² <span class="text-red-500">*</span></label>
        <input id="pf-price" type="number" min="1" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Цвет (RAL)</label>
        <input id="pf-color" type="text" placeholder="RAL 3005" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Толщина, мм</label>
        <input id="pf-thickness" type="text" placeholder="0,5" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Покрытие</label>
        <input id="pf-surface" type="text" placeholder="Полиэстер" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">URL изображения <span class="text-red-500">*</span></label>
        <input id="pf-image" type="text" placeholder="/images/metal-tiles/..." class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Характеристика 1 — название</label>
        <input id="pf-spec1-label" type="text" placeholder="Высота волны, мм" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Характеристика 1 — значение</label>
        <input id="pf-spec1-value" type="text" placeholder="39" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Характеристика 2 — название</label>
        <input id="pf-spec2-label" type="text" placeholder="Высота ступеньки, мм" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-[#44444E]">Характеристика 2 — значение</label>
        <input id="pf-spec2-value" type="text" placeholder="14" class="${INPUT_CLS}" />
      </div>
    </div>
    <p id="product-form-error" class="hidden mt-3 text-red-500 font-sans text-[13px]"></p>
    <div class="flex flex-wrap gap-3 mt-6">
      <button type="button" id="save-product-btn"
              class="inline-flex items-center justify-center rounded-full
                     bg-gradient-to-r from-button-first to-button-second
                     px-6 py-3 font-sans text-[15px] text-[#44444E]
                     shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                     hover:scale-[1.02] transition-all cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
        Сохранить
      </button>
      <button type="button" id="cancel-product-btn"
              class="inline-flex items-center justify-center rounded-full
                     border border-[#ddd] bg-white px-6 py-3
                     font-sans text-[15px] text-[#44444E]
                     hover:border-[#FFC400] transition-colors cursor-pointer">
        Отменить
      </button>
    </div>
  </div>
`;

const wireProductForm = (): void => {
  const form = document.getElementById("product-add-form");
  const toggleBtn = document.getElementById("toggle-add-product");
  const cancelBtn = document.getElementById("cancel-product-btn");
  const saveBtn = document.getElementById("save-product-btn") as HTMLButtonElement | null;
  const errEl = document.getElementById("product-form-error");

  toggleBtn?.addEventListener("click", () => {
    form?.classList.toggle("hidden");
  });

  cancelBtn?.addEventListener("click", () => {
    form?.classList.add("hidden");
  });

  saveBtn?.addEventListener("click", async () => {
    const val = (id: string): string =>
      (document.getElementById(id) as HTMLInputElement | null)?.value.trim() ?? "";

    const title = val("pf-title");
    const price = val("pf-price");
    const image = val("pf-image");
    const category = val("pf-category") as Product["category"];

    if (!title || !price || !image) {
      if (errEl) {
        errEl.textContent = "Заполните обязательные поля: Название, Цена и URL изображения";
        errEl.classList.remove("hidden");
      }
      return;
    }
    errEl?.classList.add("hidden");

    const newProduct: Omit<Product, "id"> = {
      title,
      image,
      price,
      brand: val("pf-brand") || "Grande Line",
      category,
      color: val("pf-color") || "—",
      thickness: val("pf-thickness") || "0,5",
      surface: val("pf-surface") || "Полиэстер",
      specs: [
        { label: val("pf-spec1-label") || "Характеристика 1", value: val("pf-spec1-value") || "—" },
        { label: val("pf-spec2-label") || "Характеристика 2", value: val("pf-spec2-value") || "—" },
      ],
    };

    if (saveBtn) saveBtn.disabled = true;
    try {
      await postProduct(newProduct);
      void renderProductsTab();
      void loadStats();
    } catch {
      alert("Ошибка при добавлении товара");
      if (saveBtn) saveBtn.disabled = false;
    }
  });
};

const renderProductsTab = async (): Promise<void> => {
  const el = document.getElementById("admin-content");
  if (!el) return;
  showLoading();
  try {
    const products = await fetchProducts();

    const rows = products.map((p) => `
      <tr class="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors">
        <td class="px-4 py-3 text-[#758499]">#${p.id ?? "—"}</td>
        <td class="px-4 py-3">
          <img src="${p.image}" alt="${p.title}"
               class="w-12 h-12 object-cover rounded-[8px]" loading="lazy">
        </td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${p.title}</td>
        <td class="px-4 py-3 text-[#44444E] whitespace-nowrap">${CATEGORY_LABELS[p.category] ?? p.category}</td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${p.price} ₽/м²</td>
        <td class="px-4 py-3 text-[#44444E]">${p.brand}</td>
        <td class="px-4 py-3 text-[#44444E]">${p.color}</td>
        <td class="px-4 py-3 text-[#44444E]">${p.thickness}</td>
        <td class="px-4 py-3 text-[#44444E]">${p.surface}</td>
        <td class="px-4 py-3">
          <button type="button"
                  data-delete-product="${p.id}"
                  class="text-[13px] px-3 py-1.5 rounded-full border border-red-300
                         bg-white text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            Удалить
          </button>
        </td>
      </tr>
    `).join("");

    el.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <h3 class="font-sans font-normal text-[20px] text-primary">Все товары (${products.length})</h3>
        <button type="button" id="toggle-add-product"
                class="inline-flex items-center gap-2 rounded-full
                       bg-gradient-to-r from-button-first to-button-second
                       px-5 py-2.5 font-sans text-[15px] text-[#44444E]
                       shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                       hover:scale-[1.02] transition-all cursor-pointer">
          <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" aria-hidden="true">
            <line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/>
          </svg>
          Добавить товар
        </button>
      </div>
      ${ProductAddFormHTML()}
      ${TableWrap(`
        ${ThRow("ID", "Фото", "Название", "Категория", "Цена", "Бренд", "Цвет", "Толщина", "Покрытие", "Действия")}
        <tbody>
          ${rows || `<tr><td colspan="10" class="px-4 py-8 text-center text-[#758499]">Нет товаров</td></tr>`}
        </tbody>
      `)}
    `;

    wireProductForm();

    el.querySelectorAll<HTMLButtonElement>("[data-delete-product]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.deleteProduct);
        if (!confirm("Удалить этот товар из каталога?")) return;
        try {
          await deleteProduct(id);
          void renderProductsTab();
          void loadStats();
        } catch {
          alert("Ошибка при удалении товара");
        }
      });
    });
  } catch {
    el.innerHTML = `<div class="p-8 text-center text-red-500">Ошибка загрузки товаров</div>`;
  }
};

// ── Reviews Tab ───────────────────────────────────────────────────────────────

const Stars = (rating: number): string =>
  Array.from({ length: 5 }, (_, i) =>
    `<span class="${i < Math.round(rating) ? "text-[#FFC400]" : "text-gray-300"}">★</span>`,
  ).join("");

const renderReviewsTab = async (): Promise<void> => {
  const el = document.getElementById("admin-content");
  if (!el) return;
  showLoading();
  try {
    const reviews = await fetchReviews();

    const rows = reviews.map((r) => `
      <tr class="border-t border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors">
        <td class="px-4 py-3 text-[#758499]">#${r.id}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <img src="${r.avatar}" alt=""
                 class="size-9 rounded-full object-cover shrink-0" loading="lazy">
            <span class="text-primary whitespace-nowrap">${r.name}</span>
          </div>
        </td>
        <td class="px-4 py-3 text-[#44444E] whitespace-nowrap">${r.date}</td>
        <td class="px-4 py-3 text-[16px] leading-none">${Stars(r.rating)}</td>
        <td class="px-4 py-3 text-[#44444E] whitespace-nowrap">${r.product ?? "—"}</td>
        <td class="px-4 py-3 text-[#44444E] max-w-[260px]">
          <span class="line-clamp-2">${r.text}</span>
        </td>
        <td class="px-4 py-3">
          <button type="button"
                  data-delete-review="${r.id}"
                  class="text-[13px] px-3 py-1.5 rounded-full border border-red-300
                         bg-white text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            Удалить
          </button>
        </td>
      </tr>
    `).join("");

    el.innerHTML = `
      <div class="mb-5">
        <h3 class="font-sans font-normal text-[20px] text-primary">Все отзывы (${reviews.length})</h3>
      </div>
      ${TableWrap(`
        ${ThRow("ID", "Автор", "Дата", "Оценка", "Товар", "Текст", "Действия")}
        <tbody>
          ${rows || `<tr><td colspan="7" class="px-4 py-8 text-center text-[#758499]">Нет отзывов</td></tr>`}
        </tbody>
      `)}
    `;

    el.querySelectorAll<HTMLButtonElement>("[data-delete-review]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.deleteReview);
        if (!confirm("Удалить этот отзыв?")) return;
        try {
          await deleteReview(id);
          void renderReviewsTab();
          void loadStats();
        } catch {
          alert("Ошибка при удалении отзыва");
        }
      });
    });
  } catch {
    el.innerHTML = `<div class="p-8 text-center text-red-500">Ошибка загрузки отзывов</div>`;
  }
};

// ── Tab Switching ─────────────────────────────────────────────────────────────

const switchTab = (tab: AdminTab): void => {
  currentTab = tab;
  updateTabStyles(tab);
  if (tab === "users") void renderUsersTab();
  else if (tab === "products") void renderProductsTab();
  else void renderReviewsTab();
};

// ── Page lifecycle ────────────────────────────────────────────────────────────

const showPage = (show: boolean): void => {
  const page = document.getElementById("admin-page");
  if (!page) return;
  page.classList.toggle("hidden", !show);
  if (show) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    void loadStats();
    switchTab(currentTab);
  }
};

const handleRoute = (): void => {
  showPage(window.location.hash === "#admin");
};

export const initAdminPage = (): void => {
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

  document.querySelectorAll<HTMLButtonElement>("[data-admin-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.adminTab as AdminTab);
    });
  });
};
