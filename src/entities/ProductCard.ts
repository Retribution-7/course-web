import type { Product } from "./products";

export const COLOR_OPTIONS = [
  "RAL 3005",
  "RAL 3011",
  "RAL 5005",
  "RAL 6005",
  "RAL 6020",
  "RAL 7004",
  "RAL 7024",
  "RAL 8017",
  "RAL 9005",
  "Оцинкованный",
  "Антрацит",
];

export const THICKNESS_OPTIONS = ["0,35", "0,4", "0,45", "0,5", "0,55", "0,7", "0,8"];

export const SURFACE_OPTIONS = ["Полиэстер", "Матовая", "Глянцевая", "Структурная"];

export const Dropdown = (label: string, value: string, options: string[], name: string): string => {
  const items = options
    .map(
      (option) => `
        <li>
          <button type="button"
                  class="product-dropdown__option block w-full text-left px-[10px] py-1.5
                         font-sans text-[13px] leading-[1.3] text-[#44444E]
                         hover:bg-[#F3F5F9] transition-colors cursor-pointer
                         ${option === value ? "bg-[#F3F5F9]" : ""}"
                  data-value="${option}">
            ${option}
          </button>
        </li>
      `,
    )
    .join("");

  return `
    <div class="product-dropdown flex flex-col gap-[6px]" data-dropdown="${name}">
      <span class="font-sans font-normal text-[13px] leading-[1.3] text-[#44444E]">${label}</span>
      <div class="relative w-[152px]">
        <button type="button"
                class="product-dropdown__toggle relative h-7 w-full rounded-[5px] border border-[#ddd] bg-white
                       text-left cursor-pointer transition-colors hover:border-[#FFC400]
                       focus:outline-none focus:border-[#FFC400]"
                aria-haspopup="listbox"
                aria-expanded="false">
          <span class="product-dropdown__value absolute left-[10px] top-1/2 -translate-y-1/2
                       font-sans text-[13px] leading-[1.3] text-[#44444E] whitespace-nowrap">${value}</span>
          <svg class="product-dropdown__caret absolute right-[10px] top-1/2 -translate-y-1/2 size-[9px] text-[#44444E] transition-transform"
               viewBox="0 0 9 6" fill="currentColor" aria-hidden="true">
            <path d="M0 0l4.5 6L9 0z"/>
          </svg>
        </button>
        <ul class="product-dropdown__menu hidden absolute left-0 right-0 top-[calc(100%+4px)] z-10
                   max-h-[180px] overflow-y-auto rounded-[5px] border border-[#ddd] bg-white
                   shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-1"
            role="listbox">
          ${items}
        </ul>
      </div>
    </div>
  `;
};

export const ProductCard = (product: Product, index: number): string => {
  return `
    <article class="bg-white rounded-[14px] card-shadow p-6 flex flex-col gap-[23px]"
             data-category="${product.category}"
             data-product-id="${index}"
             data-product-title="${product.title}"
             data-product-price="${product.price}"
             data-product-image="${product.image}">

      <div class="h-[260px] w-full overflow-hidden rounded-[8px]">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="size-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        >
      </div>

      <h3 class="font-sans font-normal text-[20px] leading-[1.2] tracking-[0.04em] text-primary">
        ${product.title}
      </h3>

      <dl class="grid grid-cols-[1fr_auto] gap-x-6 gap-y-[5px] font-sans text-[13px] leading-[1.3] text-[#44444E]">
        <dt>Бренд</dt><dd class="text-right">${product.brand}</dd>
        <dt>${product.specs[0].label}</dt><dd class="text-right">${product.specs[0].value}</dd>
        <dt>${product.specs[1].label}</dt><dd class="text-right">${product.specs[1].value}</dd>
      </dl>

      <div class="flex items-end gap-[7px] font-sans">
        <span class="text-[13px] leading-[1.3] text-[#758499]">от</span>
        <span class="text-[20px] leading-none text-[#44444E]">${product.price}</span>
        <span class="text-[20px] leading-none text-[#44444E] tracking-[-0.05em]">₽ / м²</span>
      </div>

      <div class="flex flex-col gap-[15px]">
        ${Dropdown("Цвет", product.color, COLOR_OPTIONS, "color")}
        ${Dropdown("Толщина", product.thickness, THICKNESS_OPTIONS, "thickness")}
        ${Dropdown("Поверхность", product.surface, SURFACE_OPTIONS, "surface")}
      </div>

      <div class="flex flex-col gap-[15px] mt-auto">
        <button type="button"
                data-action="calculate"
                class="self-start inline-flex items-center justify-center rounded-full
                       bg-gradient-to-r from-button-first to-button-second
                       px-6 py-[15px] font-sans text-[17px] leading-[1.8] text-[#44444E]
                       transition-all duration-300 hover:scale-[1.02] cursor-pointer
                       shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
          Рассчитать стоимость
        </button>
        <a href="#product/${index}"
           class="self-start inline-flex items-center justify-center rounded-full
                  bg-[#FAFAFA] border border-[#FFC400]
                  px-6 py-[15px] font-sans text-[17px] leading-[1.8] text-[#44444E]
                  transition-colors duration-200 hover:bg-white cursor-pointer no-underline">
          Подробнее о товаре
        </a>
      </div>

    </article>
  `;
};

export const initProductCards = (): void => {
  const closeAll = (except?: Element) => {
    document.querySelectorAll<HTMLElement>(".product-dropdown").forEach((dropdown) => {
      if (dropdown === except) return;
      const menu = dropdown.querySelector<HTMLElement>(".product-dropdown__menu");
      const toggle = dropdown.querySelector<HTMLElement>(".product-dropdown__toggle");
      const caret = dropdown.querySelector<HTMLElement>(".product-dropdown__caret");
      menu?.classList.add("hidden");
      toggle?.setAttribute("aria-expanded", "false");
      caret?.classList.remove("rotate-180");
    });
  };

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    const toggle = target.closest<HTMLElement>(".product-dropdown__toggle");
    if (toggle) {
      const dropdown = toggle.closest<HTMLElement>(".product-dropdown");
      if (!dropdown) return;
      const menu = dropdown.querySelector<HTMLElement>(".product-dropdown__menu");
      const caret = dropdown.querySelector<HTMLElement>(".product-dropdown__caret");
      const willOpen = menu?.classList.contains("hidden") ?? false;
      closeAll(willOpen ? dropdown : undefined);
      if (willOpen) {
        menu?.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
        caret?.classList.add("rotate-180");
      }
      return;
    }

    const option = target.closest<HTMLElement>(".product-dropdown__option");
    if (option) {
      const dropdown = option.closest<HTMLElement>(".product-dropdown");
      const valueEl = dropdown?.querySelector<HTMLElement>(".product-dropdown__value");
      const value = option.dataset.value ?? "";
      if (valueEl) valueEl.textContent = value;
      dropdown?.querySelectorAll<HTMLElement>(".product-dropdown__option").forEach((opt) => {
        opt.classList.toggle("bg-[#F3F5F9]", opt === option);
      });
      closeAll();
      return;
    }

    closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
};
