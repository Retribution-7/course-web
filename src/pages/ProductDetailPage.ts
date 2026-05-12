import {
  COLOR_OPTIONS,
  Dropdown,
  ProductCard,
  SURFACE_OPTIONS,
  THICKNESS_OPTIONS,
} from "../entities/ProductCard";
import { products } from "../entities/products";
import type { Product } from "../entities/products";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  "metal-tile": "Металлочерепица",
  "corrugated-sheet": "Профнастил",
  "seam-roofing": "Фальцевая кровля",
};

const CATEGORY_DESCRIPTION: Record<Product["category"], string> = {
  "metal-tile":
    "Современное кровельное покрытие, имитирующее керамическую черепицу. Сочетает эстетику классической кровли с прочностью стали: малый вес, простой монтаж и срок службы до 50 лет. Подходит для скатных крыш частных домов и коммерческих объектов.",
  "corrugated-sheet":
    "Универсальный профилированный лист для кровли, заборов и облицовки фасадов. Высокая жёсткость профиля при малом весе, устойчивость к атмосферным нагрузкам, широкая палитра защитно-декоративных покрытий.",
  "seam-roofing":
    "Премиальная фальцевая кровля со скрытым замковым соединением. Полностью герметичная поверхность без пробитий, эстетичный современный вид, срок службы до 70 лет. Применима на крышах любой геометрии — от плоских до сложных.",
};

const ADVANTAGES: Record<Product["category"], string[]> = {
  "metal-tile": [
    "Гарантия от производителя до 50 лет",
    "Лёгкий вес — без усиления стропил",
    "Готов к монтажу за 1–2 дня",
    "Десятки цветов по каталогу RAL",
  ],
  "corrugated-sheet": [
    "Универсальность: кровля, забор, фасад",
    "Минимальные отходы при раскрое",
    "Огнестойкость и устойчивость к УФ",
    "Доступная цена и быстрая поставка",
  ],
  "seam-roofing": [
    "Скрытый замок — без саморезов в поле кровли",
    "Подходит для уклонов от 3°",
    "Без протечек даже при малых уклонах",
    "Современный архитектурный вид",
  ],
};

const renderDetail = (product: Product, index: number): string => {
  const advantages = ADVANTAGES[product.category]
    .map(
      (text) => `
        <li class="flex items-start gap-3">
          <span class="mt-1 size-2 rounded-full bg-[#FFC400] shrink-0"></span>
          <span class="font-sans text-[14px] lg:text-[15px] leading-[1.5] text-[#44444E]">${text}</span>
        </li>`,
    )
    .join("");

  const related = products
    .map((p, i) => ({ p, i }))
    .filter(({ p, i }) => p.category === product.category && i !== index)
    .slice(0, 3);

  const relatedHtml =
    related.length === 0
      ? ""
      : `
        <section class="mt-14 lg:mt-20">
          <h3 class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[32px] gradient-text">
            Похожие материалы
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-10">
            ${related.map(({ p, i }) => ProductCard(p, i)).join("")}
          </div>
        </section>
      `;

  return `
    <a href="#catalog"
       class="inline-flex items-center gap-2 font-sans text-[14px] lg:text-[15px]
              text-[#44444E] hover:text-[#FFC400] transition-colors mb-6 lg:mb-10">
      <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M10 3l-5 5 5 5"/>
      </svg>
      В каталог
    </a>

    <article class="bg-white rounded-[14px] card-shadow p-5 sm:p-6 lg:p-10"
             data-category="${product.category}"
             data-product-id="${index}"
             data-product-title="${product.title}"
             data-product-price="${product.price}"
             data-product-image="${product.image}">

      <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10">

        <div class="aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full overflow-hidden rounded-[10px]">
          <img src="${product.image}"
               alt="${product.title}"
               class="size-full object-cover"
               loading="lazy">
        </div>

        <div class="flex flex-col gap-5 lg:gap-6">
          <span class="font-sans text-[13px] lg:text-[14px] uppercase tracking-[0.08em] text-[#FFC400]">
            ${CATEGORY_LABEL[product.category]}
          </span>

          <h1 class="font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[44px] xl:text-[52px] gradient-text">
            ${product.title}
          </h1>

          <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-sans">
            <span class="text-[14px] text-[#758499]">от</span>
            <span class="text-[32px] lg:text-[40px] leading-none text-primary">${product.price}</span>
            <span class="text-[18px] lg:text-[20px] text-[#44444E] tracking-[-0.03em]">₽ / м²</span>
            <span class="ml-auto text-[13px] text-[#758499]">Бренд: ${product.brand}</span>
          </div>

          <dl class="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 font-sans text-[14px] leading-[1.4] text-[#44444E] border-t border-b border-[#E5E9EE] py-4">
            <dt class="text-[#758499]">${product.specs[0].label}</dt><dd class="text-right">${product.specs[0].value}</dd>
            <dt class="text-[#758499]">${product.specs[1].label}</dt><dd class="text-right">${product.specs[1].value}</dd>
            <dt class="text-[#758499]">Категория</dt><dd class="text-right">${CATEGORY_LABEL[product.category]}</dd>
          </dl>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
            ${Dropdown("Цвет", product.color, COLOR_OPTIONS, "color")}
            ${Dropdown("Толщина", product.thickness, THICKNESS_OPTIONS, "thickness")}
            ${Dropdown("Поверхность", product.surface, SURFACE_OPTIONS, "surface")}
          </div>

          <div class="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-2">
            <button type="button"
                    data-action="calculate"
                    class="flex-1 inline-flex items-center justify-center rounded-full
                           bg-gradient-to-r from-button-first to-button-second
                           px-6 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-[#44444E]
                           transition-all duration-300 hover:scale-[1.02] cursor-pointer
                           shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
              Рассчитать стоимость
            </button>
            <a href="#consultation"
               class="flex-1 inline-flex items-center justify-center rounded-full
                      bg-[#FAFAFA] border border-[#FFC400]
                      px-6 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-[#44444E]
                      transition-colors duration-200 hover:bg-white cursor-pointer no-underline text-center">
              Заказать звонок
            </a>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 mt-10 lg:mt-14 pt-8 lg:pt-10 border-t border-[#E5E9EE]">
        <div>
          <h2 class="font-sans font-normal text-[20px] lg:text-[24px] leading-[1.2] text-primary mb-3 lg:mb-4">
            Описание
          </h2>
          <p class="font-sans text-[14px] lg:text-[15px] leading-[1.6] text-[#44444E]">
            ${CATEGORY_DESCRIPTION[product.category]}
          </p>
        </div>
        <div>
          <h2 class="font-sans font-normal text-[20px] lg:text-[24px] leading-[1.2] text-primary mb-3 lg:mb-4">
            Преимущества
          </h2>
          <ul class="flex flex-col gap-2.5">
            ${advantages}
          </ul>
        </div>
      </div>
    </article>

    ${relatedHtml}
  `;
};

export const ProductDetailPage = (): string => `
  <section id="product-page"
           class="hidden bg-[#F3F5F9] py-10 lg:py-16 min-h-[60vh]"
           aria-labelledby="product-heading">
    <div class="container-main">
      <div id="product-detail-content"></div>
    </div>
  </section>
`;

const showPage = (show: boolean, productIdx?: number): void => {
  const page = document.getElementById("product-page");
  const content = document.getElementById("product-detail-content");
  if (!page || !content) return;
  page.classList.toggle("hidden", !show);
  if (show && productIdx !== undefined) {
    const product = products[productIdx];
    if (!product) {
      content.innerHTML = `
        <div class="bg-white rounded-[14px] card-shadow p-10 text-center">
          <h3 class="font-sans text-[20px] gradient-text">Товар не найден</h3>
          <a href="#catalog"
             class="mt-4 inline-flex items-center justify-center rounded-full
                    bg-gradient-to-r from-button-first to-button-second
                    px-6 py-[15px] font-sans text-[15px] text-[#44444E]
                    shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] cursor-pointer">
            Вернуться в каталог
          </a>
        </div>
      `;
    } else {
      content.innerHTML = renderDetail(product, productIdx);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const handleRoute = (): void => {
  const match = window.location.hash.match(/^#product\/(\d+)$/);
  if (match) showPage(true, Number.parseInt(match[1], 10));
  else showPage(false);
};

export const initProductDetailPage = (): void => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);
};
