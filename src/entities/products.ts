export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id?: number;
  title: string;
  image: string;
  price: string;
  brand: string;
  specs: [ProductSpec, ProductSpec];
  color: string;
  thickness: string;
  surface: string;
  category: "metal-tile" | "corrugated-sheet" | "seam-roofing";
}
