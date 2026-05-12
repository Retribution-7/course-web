import { products } from "../data/products";
import { Container } from "../shared/Container";
import { ProductCard } from "./ProductCard";

export const Catalog = (): string => {
  return `
    <section class="section-spacing">
      ${Container(`
        
        <div class="flex items-end justify-between gap-10">

          <div>
            <h2 class="title-lg">
              Каталог товаров
            </h2>
          </div>

          <div class="hidden md:flex gap-4">
            <button class="rounded-full border px-6 py-3">
              Металлочерепица
            </button>

            <button class="rounded-full border px-6 py-3">
              Профнастил
            </button>
          </div>

        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          ${products.map(ProductCard).join("")}
        </div>

      `)}
    </section>
  `;
};
