export interface Product {
  title: string;
  image: string;
  price: string;
  color: string;
}

export const products: Product[] = [
  {
    title: "Монтеррей",
    image: "/images/products/1.png",
    price: "от 590 ₽",
    color: "Серый",
  },

  {
    title: "Kvinta",
    image: "/images/products/2.png",
    price: "от 610 ₽",
    color: "Зеленый",
  },
];
