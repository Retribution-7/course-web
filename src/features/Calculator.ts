import { isAuthenticated } from "../services/auth";
import { cart } from "../services/cart";
import { t, translateTitle } from "../services/i18n";
import { showToast } from "../shared/ui/toast";

const THICKNESS_MULTIPLIER: Record<string, number> = {
  "0,35": 0.85,
  "0,4": 0.9,
  "0,45": 0.95,
  "0,5": 1.0,
  "0,55": 1.08,
  "0,7": 1.25,
  "0,8": 1.4,
};

const SURFACE_MULTIPLIER: Record<string, number> = {
  Полиэстер: 1.0,
  Матовая: 1.15,
  Глянцевая: 1.2,
  Структурная: 1.3,
};

const DELIVERY_FEE = 3500;
const INSTALLATION_PER_M2 = 450;

const formatRub = (value: number): string =>
  `${Math.round(value).toLocaleString("ru-RU")} ₽`;

const formatMultiplier = (m: number): string =>
  m === 1 ? "×1.00" : `×${m.toFixed(2)}`;

export const Calculator = (): string => `
  <div id="calc-modal"
       class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 p-4"
       role="dialog"
       aria-modal="true"
       aria-labelledby="calc-title">
    <div class="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[14px] bg-white p-6 lg:p-8 card-shadow">

      <button type="button"
              id="calc-close"
              class="absolute right-4 top-4 grid size-8 place-items-center rounded-full
                     text-[#44444E] hover:bg-[#F3F5F9] transition-colors cursor-pointer"
              aria-label="${t("calc-close-btn")}"
              data-i18n-aria-label="calc-close-btn">
        <svg viewBox="0 0 14 14" class="size-4" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 1l12 12M13 1L1 13"/>
        </svg>
      </button>

      <h3 id="calc-title"
          data-i18n="calc-title"
          class="font-sans font-normal text-[24px] leading-[1.2] lg:text-[28px] gradient-text pr-10">
        Расчёт стоимости
      </h3>
      <p id="calc-subtitle"
         class="mt-2 font-sans text-[15px] leading-[1.3] text-[#44444E]"></p>

      <dl class="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 font-sans text-[13px] leading-[1.3] text-[#44444E]">
        <dt data-i18n="calc-color-label">Цвет</dt><dd id="calc-color" class="text-right"></dd>
        <dt data-i18n="calc-thickness-label">Толщина</dt><dd id="calc-thickness" class="text-right"></dd>
        <dt data-i18n="calc-surface-label">Поверхность</dt><dd id="calc-surface" class="text-right"></dd>
      </dl>

      <div class="mt-6">
        <label for="calc-area"
               data-i18n="calc-area-label"
               class="block font-sans text-[13px] leading-[1.3] text-[#44444E]">
          Площадь крыши, м²
        </label>
        <div class="mt-2 flex items-center gap-3">
          <button type="button"
                  id="calc-area-minus"
                  class="grid size-10 place-items-center rounded-full border border-[#ddd]
                         font-sans text-[20px] text-[#44444E] cursor-pointer
                         hover:border-[#FFC400] transition-colors"
                  aria-label="${t("calc-area-decrease")}"
                  data-i18n-aria-label="calc-area-decrease">−</button>
          <input id="calc-area"
                 type="number"
                 min="1"
                 max="10000"
                 step="1"
                 value="100"
                 inputmode="numeric"
                 class="h-10 w-full flex-1 rounded-[5px] border border-[#ddd] bg-white
                        px-3 text-center font-sans text-[16px] text-[#44444E]
                        focus:outline-none focus:border-[#FFC400]" />
          <button type="button"
                  id="calc-area-plus"
                  class="grid size-10 place-items-center rounded-full border border-[#ddd]
                         font-sans text-[20px] text-[#44444E] cursor-pointer
                         hover:border-[#FFC400] transition-colors"
                  aria-label="${t("calc-area-increase")}"
                  data-i18n-aria-label="calc-area-increase">+</button>
        </div>
      </div>

      <label class="mt-5 flex items-center gap-2 cursor-pointer">
        <input id="calc-installation"
               type="checkbox"
               class="size-4 accent-[#FFC400]" />
        <span data-i18n="calc-installation-label"
              class="font-sans text-[14px] leading-[1.3] text-[#44444E]">
          Включить монтаж (${INSTALLATION_PER_M2} ₽/м²)
        </span>
      </label>
      <label class="mt-2 flex items-center gap-2 cursor-pointer">
        <input id="calc-delivery"
               type="checkbox"
               class="size-4 accent-[#FFC400]" />
        <span data-i18n="calc-delivery-label"
              class="font-sans text-[14px] leading-[1.3] text-[#44444E]">
          Доставка (${DELIVERY_FEE.toLocaleString("ru-RU")} ₽)
        </span>
      </label>

      <div class="mt-6 rounded-[10px] bg-[#F3F5F9] p-4 font-sans text-[13px] leading-[1.4] text-[#44444E]">
        <div class="flex justify-between gap-4">
          <span data-i18n="calc-base-price">Базовая цена</span>
          <span id="calc-base"></span>
        </div>
        <div class="flex justify-between gap-4">
          <span data-i18n="calc-mult-thickness">Коэф. толщины</span>
          <span id="calc-mult-thickness"></span>
        </div>
        <div class="flex justify-between gap-4">
          <span data-i18n="calc-mult-surface">Коэф. поверхности</span>
          <span id="calc-mult-surface"></span>
        </div>
        <div class="my-2 h-px bg-[#ddd]"></div>
        <div class="flex justify-between gap-4">
          <span data-i18n="calc-material-label">Материал</span>
          <span id="calc-material"></span>
        </div>
        <div id="calc-row-installation" class="flex justify-between gap-4 hidden">
          <span data-i18n="calc-installation-row">Монтаж</span>
          <span id="calc-installation-sum"></span>
        </div>
        <div id="calc-row-delivery" class="flex justify-between gap-4 hidden">
          <span data-i18n="calc-delivery-row">Доставка</span>
          <span id="calc-delivery-sum"></span>
        </div>
      </div>

      <div class="mt-4 flex items-baseline justify-between gap-4">
        <span data-i18n="calc-total-label" class="font-sans text-[15px] text-[#44444E]">Итого</span>
        <span id="calc-total"
              class="font-sans text-[28px] leading-none text-primary"></span>
      </div>

      <button type="button"
              id="calc-add-to-cart"
              class="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full
                     bg-gradient-to-r from-button-first to-button-second
                     px-6 py-[15px] font-sans text-[17px] leading-[1.4] text-[#44444E]
                     transition-all duration-300 hover:scale-[1.02] cursor-pointer
                     shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
        <img src="/icons/cart.svg" alt="" class="size-5" aria-hidden="true">
        <span data-i18n="calc-add-to-cart">В корзину</span>
      </button>

    </div>
  </div>
`;

const parseNumber = (value: string): number =>
  Number(value.replace(",", ".").replace(/[^\d.]/g, "")) || 0;

const getThicknessMult = (value: string): number =>
  THICKNESS_MULTIPLIER[value] ?? 1;

const getSurfaceMult = (value: string): number =>
  SURFACE_MULTIPLIER[value] ?? 1;

interface CalcState {
  title: string;
  image: string;
  color: string;
  basePrice: number;
  thickness: string;
  surface: string;
}

const state: CalcState = {
  title: "",
  image: "",
  color: "",
  basePrice: 0,
  thickness: "",
  surface: "",
};

const recalc = (): void => {
  const areaInput = document.getElementById("calc-area") as HTMLInputElement | null;
  const installEl = document.getElementById("calc-installation") as HTMLInputElement | null;
  const deliveryEl = document.getElementById("calc-delivery") as HTMLInputElement | null;
  if (!areaInput) return;

  const area = Math.max(1, Math.min(10000, parseNumber(areaInput.value)));
  const tMult = getThicknessMult(state.thickness);
  const sMult = getSurfaceMult(state.surface);

  const adjustedPrice = state.basePrice * tMult * sMult;
  const material = adjustedPrice * area;
  const installation = installEl?.checked ? area * INSTALLATION_PER_M2 : 0;
  const delivery = deliveryEl?.checked ? DELIVERY_FEE : 0;
  const total = material + installation + delivery;

  const set = (id: string, text: string) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  set("calc-base", `${state.basePrice} ₽/м²`);
  set("calc-mult-thickness", formatMultiplier(tMult));
  set("calc-mult-surface", formatMultiplier(sMult));
  set("calc-material", formatRub(material));
  set("calc-installation-sum", formatRub(installation));
  set("calc-delivery-sum", formatRub(delivery));
  set("calc-total", formatRub(total));

  document
    .getElementById("calc-row-installation")
    ?.classList.toggle("hidden", !installEl?.checked);
  document
    .getElementById("calc-row-delivery")
    ?.classList.toggle("hidden", !deliveryEl?.checked);
};

const openModal = (article: HTMLElement): void => {
  const modal = document.getElementById("calc-modal");
  if (!modal) return;

  const title = article.dataset.productTitle ?? "";
  const image = article.dataset.productImage ?? "";
  const price = parseNumber(article.dataset.productPrice ?? "0");

  const values = article.querySelectorAll<HTMLElement>(".product-dropdown__value");
  const color = values[0]?.dataset.value ?? values[0]?.textContent?.trim() ?? "";
  const thickness = values[1]?.dataset.value ?? values[1]?.textContent?.trim() ?? "";
  const surface = values[2]?.dataset.value ?? values[2]?.textContent?.trim() ?? "";

  state.title = title;
  state.image = image;
  state.color = color;
  state.basePrice = price;
  state.thickness = thickness;
  state.surface = surface;

  const setText = (id: string, text: string) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  setText("calc-subtitle", title);
  setText("calc-color", color);
  setText("calc-thickness", thickness);
  setText("calc-surface", surface);

  const areaInput = document.getElementById("calc-area") as HTMLInputElement | null;
  if (areaInput) areaInput.value = "100";
  const install = document.getElementById("calc-installation") as HTMLInputElement | null;
  const delivery = document.getElementById("calc-delivery") as HTMLInputElement | null;
  if (install) install.checked = false;
  if (delivery) delivery.checked = false;

  recalc();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

const closeModal = (): void => {
  const modal = document.getElementById("calc-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
};

export const initCalculator = (): void => {
  const modal = document.getElementById("calc-modal");
  if (!modal) return;

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const trigger = target.closest<HTMLElement>('[data-action="calculate"]');
    if (trigger) {
      const article = trigger.closest<HTMLElement>("article[data-product-title]");
      if (article) openModal(article);
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.getElementById("calc-close")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  document.getElementById("calc-area")?.addEventListener("input", recalc);
  document.getElementById("calc-installation")?.addEventListener("change", recalc);
  document.getElementById("calc-delivery")?.addEventListener("change", recalc);

  document.getElementById("calc-area-minus")?.addEventListener("click", () => {
    const input = document.getElementById("calc-area") as HTMLInputElement | null;
    if (!input) return;
    const next = Math.max(1, parseNumber(input.value) - 10);
    input.value = String(next);
    recalc();
  });
  document.getElementById("calc-area-plus")?.addEventListener("click", () => {
    const input = document.getElementById("calc-area") as HTMLInputElement | null;
    if (!input) return;
    const next = Math.min(10000, parseNumber(input.value) + 10);
    input.value = String(next);
    recalc();
  });

  document.getElementById("calc-add-to-cart")?.addEventListener("click", () => {
    if (!isAuthenticated()) {
      closeModal();
      window.location.hash = "#auth";
      return;
    }
    const areaInput = document.getElementById("calc-area") as HTMLInputElement | null;
    const installEl = document.getElementById("calc-installation") as HTMLInputElement | null;
    const deliveryEl = document.getElementById("calc-delivery") as HTMLInputElement | null;
    if (!areaInput) return;

    const area = Math.max(1, Math.min(10000, parseNumber(areaInput.value)));
    const tMult = getThicknessMult(state.thickness);
    const sMult = getSurfaceMult(state.surface);
    const pricePerM2 = state.basePrice * tMult * sMult;
    const installation = installEl?.checked ?? false;
    const delivery = deliveryEl?.checked ?? false;
    const total =
      pricePerM2 * area +
      (installation ? area * INSTALLATION_PER_M2 : 0) +
      (delivery ? DELIVERY_FEE : 0);

    cart.add({
      title: state.title,
      image: state.image,
      color: state.color,
      thickness: state.thickness,
      surface: state.surface,
      area,
      pricePerM2,
      installation,
      delivery,
      total,
    });

    showToast(`«${translateTitle(state.title)}» ${t("calc-toast-cart-added")}`, { type: "success" });
    closeModal();
    window.location.hash = "#cart";
  });
};
