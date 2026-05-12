import type { Product } from "../data/products";

const Dropdown = (label: string, value: string): string => `
  <div class="flex flex-col gap-[6px]">
    <span class="font-sans font-normal text-[13px] leading-[1.3] text-[#44444E]">${label}</span>
    <div class="relative h-7 w-[152px] rounded-[5px] border border-[#ddd] bg-white">
      <span class="absolute left-[10px] top-1/2 -translate-y-1/2 font-sans text-[13px] leading-[1.3] text-[#44444E] whitespace-nowrap">${value}</span>
      <svg class="absolute right-[10px] top-1/2 -translate-y-1/2 size-[9px] text-[#44444E]"
           viewBox="0 0 9 6" fill="currentColor" aria-hidden="true">
        <path d="M0 0l4.5 6L9 0z"/>
      </svg>
    </div>
  </div>
`;

export const ProductCard = (product: Product): string => {
  return `
    <article class="bg-white rounded-[14px] card-shadow p-6 flex flex-col gap-[23px]"
             data-category="${product.category}">

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
        ${Dropdown("Цвет", product.color)}
        ${Dropdown("Толщина", product.thickness)}
        ${Dropdown("Поверхность", product.surface)}
      </div>

      <div class="flex flex-col gap-[15px] mt-auto">
        <button type="button"
                class="self-start inline-flex items-center justify-center rounded-full
                       bg-gradient-to-r from-button-first to-button-second
                       px-6 py-[15px] font-sans text-[17px] leading-[1.8] text-[#44444E]
                       transition-all duration-300 hover:scale-[1.02] cursor-pointer
                       shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]">
          Рассчитать стоимость
        </button>
        <button type="button"
                class="self-start inline-flex items-center justify-center rounded-full
                       bg-[#FAFAFA] border border-[#FFC400]
                       px-6 py-[15px] font-sans text-[17px] leading-[1.8] text-[#44444E]
                       transition-colors duration-200 hover:bg-white cursor-pointer">
          Подробнее о товаре
        </button>
      </div>

    </article>
  `;
};
