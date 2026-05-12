import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

type CategoryKey = "metal-tile" | "corrugated-sheet" | "seam-roofing";
type TabKey = "all" | CategoryKey;

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "Все материалы" },
  { key: "metal-tile", label: "Металлочерепица" },
  { key: "corrugated-sheet", label: "Профнастил" },
  { key: "seam-roofing", label: "Фальцевая кровля" },
];

const categoryGroups: { key: CategoryKey; title: string }[] = [
  { key: "metal-tile", title: "МЕТАЛЛОЧЕРЕПИЦА" },
  { key: "corrugated-sheet", title: "Профнастил" },
  { key: "seam-roofing", title: "Фальцевая кровля" },
];

const renderProductGroup = ({ key, title }: { key: CategoryKey; title: string }): string => {
  const items = products.filter((p) => p.category === key);
  return `
    <div class="product-group mt-24" data-group="${key}">
      <h3 class="font-sans font-normal text-[36px] leading-[49px] gradient-text mb-10">
        ${title}
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        ${items.map(ProductCard).join("")}
      </div>
    </div>
  `;
};

export const Catalog = (): string => {
  return `
    <section class="bg-[#F3F5F9] py-20" id="catalog" aria-labelledby="catalog-heading">
      <div class="container-main">

        <h2 id="catalog-heading"
            class="font-sans font-normal text-[56px] leading-[68px] gradient-text">
          КАТАЛОГ ТОВАРОВ
        </h2>

        <div class="flex flex-wrap gap-[15px] mt-24" role="tablist" aria-label="Категории товаров">
          ${tabs
            .map(
              (tab, idx) => `
            <button
              class="catalog-tab font-sans font-normal text-[22px] leading-[30px] text-primary
                     px-6 py-[15px] rounded-full border border-[#FFC400] bg-white
                     transition-colors duration-200 cursor-pointer whitespace-nowrap
                     ${idx === 0 ? "active" : ""}"
              data-tab="${tab.key}"
              id="tab-${tab.key}"
              type="button"
              role="tab"
              aria-selected="${idx === 0 ? "true" : "false"}"
              aria-controls="panel-${tab.key}">
              ${tab.label}
            </button>
          `,
            )
            .join("")}
        </div>

        ${categoryGroups.map(renderProductGroup).join("")}

      </div>
    </section>
  `;
};

export const initCatalog = (): void => {
  const tabButtons = document.querySelectorAll<HTMLButtonElement>(".catalog-tab");
  const productGroups = document.querySelectorAll<HTMLDivElement>(".product-group");

  if (!tabButtons.length || !productGroups.length) return;

  const applyFilter = (target: TabKey) => {
    productGroups.forEach((group) => {
      const groupKey = group.dataset.group as CategoryKey;
      const isVisible = target === "all" || groupKey === target;
      group.toggleAttribute("hidden", !isVisible);
      group.setAttribute("aria-hidden", String(!isVisible));
    });
  };

  applyFilter("all");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab as TabKey;

      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      applyFilter(target);
    });
  });
};
