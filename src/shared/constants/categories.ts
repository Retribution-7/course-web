import type { Product } from "../../entities/products";

export const CATEGORY_MAP: Record<Product["category"], string> = {
  "metal-tile": "metal-tile",
  "corrugated-sheet": "corrugated",
  "seam-roofing": "seam",
};

export const catKey = (category: Product["category"]): string =>
  CATEGORY_MAP[category];

export const catLabelKey = (category: string): string =>
  `cat-label-${CATEGORY_MAP[category as Product["category"]] ?? category}`;
