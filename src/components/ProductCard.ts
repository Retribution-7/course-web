import type { Product } from "../data/products";

export const ProductCard = (product: Product): string => {
  return `
    <article class="card overflow-hidden p-8 transition hover:-translate-y-1">
      
      <img
        src="${product.image}"
        alt="${product.title}"
        class="mx-auto h-[220px] object-contain"
      />

      <div class="mt-8">

        <h3 class="text-[26px] font-medium">
          ${product.title}
        </h3>

        <div class="mt-4 text-zinc-500">
          Цвет: ${product.color}
        </div>

        <div class="mt-6 text-[28px] font-medium">
          ${product.price}
        </div>

        <button class="btn-primary mt-8 w-full !py-4">
          Подробнее
        </button>

      </div>

    </article>
  `;
};
