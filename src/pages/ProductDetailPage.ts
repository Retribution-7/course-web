import {
  COLOR_OPTIONS,
  Dropdown,
  ProductCard,
  SURFACE_OPTIONS,
  syncFavoriteButtons,
  THICKNESS_OPTIONS,
} from "../entities/ProductCard";
import type { Product } from "../entities/products";
import { fetchProductById, fetchProducts } from "../services/api";
import { SPEC_LABEL_I18N_KEY, t, translateTitle } from "../services/i18n";
import { catKey } from "../shared/constants/categories";
import { RELATED_PRODUCTS_LIMIT } from "../shared/lib/constants";
import { BackLink } from "../shared/ui/BackLink";

const renderDetail = (
  product: Product,
  index: number,
  related: Product[],
): string => {
  const key = catKey(product.category);
  const advantages = [0, 1, 2, 3]
    .map(
      (i) => `
        <li class="flex items-start gap-3">
          <span class="mt-1 size-2 rounded-full bg-button-first shrink-0"></span>
          <span class="font-sans text-[14px] lg:text-[15px] leading-[1.5] text-text-secondary">${t(`cat-adv-${key}-${i}`)}</span>
        </li>`,
    )
    .join("");

  const relatedHtml =
    related.length === 0
      ? ""
      : `
        <section class="mt-14 lg:mt-20">
          <h3 class="font-sans font-normal text-[24px] leading-[1.2] sm:text-[28px] lg:text-[32px] gradient-text">
            ${t("product-related")}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-10">
            ${related.map((p) => ProductCard(p, p.id ?? 0)).join("")}
          </div>
        </section>
      `;

  return `
    ${BackLink("#catalog", "product-to-catalog", t("product-to-catalog"), "text-text-secondary")}

    <article class="bg-surface rounded-[14px] card-shadow p-5 sm:p-6 lg:p-10 transition-colors duration-300"
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
          <span class="font-sans text-[13px] lg:text-[14px] uppercase tracking-[0.08em] text-button-first">
            ${t(`cat-label-${key}`)}
          </span>

          <h1 class="font-sans font-normal text-[28px] leading-[1.1] sm:text-[36px] lg:text-[44px] xl:text-[52px] gradient-text"
              data-i18n-title="${product.title}">
            ${translateTitle(product.title)}
          </h1>

          <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-sans">
            <span class="text-[14px] text-text-third">${t("product-price-from")}</span>
            <span class="text-[32px] lg:text-[40px] leading-none text-primary">${product.price}</span>
            <span class="text-[18px] lg:text-[20px] text-text-secondary tracking-[-0.03em]">₽ / м²</span>
            <span class="ml-auto text-[13px] text-text-third">${t("product-brand")} ${product.brand}</span>
          </div>

          <dl class="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 font-sans text-[14px] leading-[1.4] text-text-secondary border-t border-b border-border-light dark:border-border-dark py-4">
            <dt class="text-text-third" data-i18n="${SPEC_LABEL_I18N_KEY[product.specs[0].label] ?? ""}">${t(SPEC_LABEL_I18N_KEY[product.specs[0].label] ?? product.specs[0].label)}</dt><dd class="text-right">${product.specs[0].value}</dd>
            <dt class="text-text-third" data-i18n="${SPEC_LABEL_I18N_KEY[product.specs[1].label] ?? ""}">${t(SPEC_LABEL_I18N_KEY[product.specs[1].label] ?? product.specs[1].label)}</dt><dd class="text-right">${product.specs[1].value}</dd>
            <dt class="text-text-third">${t("product-category")}</dt><dd class="text-right">${t(`cat-label-${key}`)}</dd>
          </dl>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
            ${Dropdown(t("calc-color-label"), product.color, COLOR_OPTIONS, "color")}
            ${Dropdown(t("calc-thickness-label"), product.thickness, THICKNESS_OPTIONS, "thickness")}
            ${Dropdown(t("calc-surface-label"), product.surface, SURFACE_OPTIONS, "surface")}
          </div>

          <div class="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-2">
            <button type="button"
                    data-action="calculate"
                    class="flex-1 inline-flex items-center justify-center rounded-full
                           bg-gradient-to-r from-button-first to-button-second
                           px-6 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-primary
                           transition-all duration-300 hover:scale-[1.02] cursor-pointer
                           shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
              ${t("product-calculate")}
            </button>
            <a href="#consultation"
               class="flex-1 inline-flex items-center justify-center rounded-full
                      bg-surface-hover border border-button-first
                      px-6 py-[15px] font-sans text-[15px] lg:text-[17px] leading-[1.4] text-text-secondary
                      transition-colors duration-200 hover:bg-surface cursor-pointer no-underline text-center">
              ${t("product-call-order")}
            </a>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 mt-10 lg:mt-14 pt-8 lg:pt-10 border-t border-border-light dark:border-border-dark">
        <div>
          <h2 class="font-sans font-normal text-[20px] lg:text-[24px] leading-[1.2] text-primary mb-3 lg:mb-4">
            ${t("product-description")}
          </h2>
          <p class="font-sans text-[14px] lg:text-[15px] leading-[1.6] text-text-secondary">
            ${t(`cat-desc-${key}`)}
          </p>
        </div>
        <div>
          <h2 class="font-sans font-normal text-[20px] lg:text-[24px] leading-[1.2] text-primary mb-3 lg:mb-4">
            ${t("product-advantages")}
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
           class="hidden bg-bg-first py-10 lg:py-16 min-h-[60vh] transition-colors duration-300"
           aria-labelledby="product-heading">
    <div class="container-main">
      <div id="product-detail-content"></div>
    </div>
  </section>
`;

const showPage = async (show: boolean, productIdx?: number): Promise<void> => {
  const page = document.getElementById("product-page");
  const content = document.getElementById("product-detail-content");
  if (!page || !content) return;
  page.classList.toggle("hidden", !show);

  if (!show || productIdx === undefined) return;

  window.scrollTo({ top: 0, behavior: "smooth" });
  content.innerHTML = `
    <div class="flex justify-center py-20">
      <span class="font-sans text-[15px] text-text-third">${t("product-loading")}</span>
    </div>
  `;

  try {
    const product = await fetchProductById(productIdx);

    if (!product) {
      content.innerHTML = `
        <div class="bg-surface rounded-[14px] card-shadow p-10 text-center transition-colors duration-300">
          <h3 class="font-sans text-[20px] gradient-text">${t("product-not-found")}</h3>
          <a href="#catalog"
             class="mt-4 inline-flex items-center justify-center rounded-full
                    bg-gradient-to-r from-button-first to-button-second
                    px-6 py-[15px] font-sans text-[15px] text-primary
                    shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)] cursor-pointer">
            ${t("product-not-found-link")}
          </a>
        </div>
      `;
      return;
    }

    const allInCategory = await fetchProducts({ category: product.category });
    const related = allInCategory
      .filter((p) => p.id !== productIdx)
      .slice(0, RELATED_PRODUCTS_LIMIT);

    content.innerHTML = renderDetail(product, productIdx, related);
    syncFavoriteButtons();
  } catch {
    content.innerHTML = `
      <div class="bg-surface rounded-[14px] card-shadow p-10 text-center transition-colors duration-300">
        <h3 class="font-sans text-[20px] gradient-text">${t("product-error")}</h3>
        <p class="mt-2 font-sans text-[15px] text-text-secondary">${t("product-error-desc")}</p>
      </div>
    `;
  }
};

const handleRoute = (): void => {
  const match = window.location.hash.match(/^#product\/(\d+)$/);
  if (match) void showPage(true, Number.parseInt(match[1], 10));
  else void showPage(false);
};

export const initProductDetailPage = (): void => {
  handleRoute();
  window.addEventListener("hashchange", handleRoute);
};
