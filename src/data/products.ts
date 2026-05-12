export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
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

export const products: Product[] = [
  // Металлочерепица: Высота волны, мм / Высота ступеньки, мм
  {
    title: "Монтеррей",
    image: "/images/metal-tiles/metal-tile-1.jpg",
    price: "590",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "39" },
      { label: "Высота ступеньки, мм", value: "14" },
    ],
    color: "RAL 3005",
    thickness: "0,5",
    surface: "Полиэстер",
    category: "metal-tile",
  },
  {
    title: "Kvinta Plus",
    image: "/images/metal-tiles/metal-tile-2.jpg",
    price: "610",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "46" },
      { label: "Высота ступеньки, мм", value: "25" },
    ],
    color: "RAL 6020",
    thickness: "0,5",
    surface: "Матовая",
    category: "metal-tile",
  },
  {
    title: "Каскад",
    image: "/images/metal-tiles/metal-tile-3.jpg",
    price: "625",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "25" },
      { label: "Высота ступеньки, мм", value: "22" },
    ],
    color: "RAL 7004",
    thickness: "0,45",
    surface: "Полиэстер",
    category: "metal-tile",
  },
  {
    title: "Супермонтеррей",
    image: "/images/metal-tiles/metal-tile-4.jpg",
    price: "640",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "46" },
      { label: "Высота ступеньки, мм", value: "21" },
    ],
    color: "RAL 8017",
    thickness: "0,5",
    surface: "Полиэстер",
    category: "metal-tile",
  },
  {
    title: "Ламонтерра",
    image: "/images/metal-tiles/metal-tile-5.jpg",
    price: "650",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "23.5" },
      { label: "Высота ступеньки, мм", value: "20" },
    ],
    color: "RAL 5005",
    thickness: "0,5",
    surface: "Матовая",
    category: "metal-tile",
  },
  {
    title: "Джокер",
    image: "/images/metal-tiles/metal-tile-6.jpg",
    price: "660",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "50" },
      { label: "Высота ступеньки, мм", value: "30" },
    ],
    color: "RAL 9005",
    thickness: "0,5",
    surface: "Матовая",
    category: "metal-tile",
  },
  {
    title: "Андалузия",
    image: "/images/metal-tiles/metal-tile-7.jpg",
    price: "675",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "35" },
      { label: "Высота ступеньки, мм", value: "16" },
    ],
    color: "RAL 3011",
    thickness: "0,5",
    surface: "Полиэстер",
    category: "metal-tile",
  },
  {
    title: "Трамонтана",
    image: "/images/metal-tiles/metal-tile-8.jpg",
    price: "690",
    brand: "Grande Line",
    specs: [
      { label: "Высота волны, мм", value: "40" },
      { label: "Высота ступеньки, мм", value: "20" },
    ],
    color: "RAL 6005",
    thickness: "0,5",
    surface: "Матовая",
    category: "metal-tile",
  },

  // Профнастил: Ширина общая, мм / Ширина полезная, мм
  {
    title: "Профнастил C8",
    image: "/images/corrugated-sheets/corrugated-sheet-1.jpg",
    price: "320",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "1200" },
      { label: "Ширина полезная, мм", value: "1160" },
    ],
    color: "Оцинкованный",
    thickness: "0,35",
    surface: "Выбрать",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил C10",
    image: "/images/corrugated-sheets/corrugated-sheet-2.jpg",
    price: "330",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "1180" },
      { label: "Ширина полезная, мм", value: "1100" },
    ],
    color: "RAL 5005",
    thickness: "0,4",
    surface: "Полиэстер",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил C20",
    image: "/images/corrugated-sheets/corrugated-sheet-3.jpg",
    price: "360",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "1150" },
      { label: "Ширина полезная, мм", value: "1100" },
    ],
    color: "RAL 6005",
    thickness: "0,45",
    surface: "Полиэстер",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил C21",
    image: "/images/corrugated-sheets/corrugated-sheet-4.jpg",
    price: "370",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "1051" },
      { label: "Ширина полезная, мм", value: "1000" },
    ],
    color: "RAL 8017",
    thickness: "0,45",
    surface: "Матовая",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил C44",
    image: "/images/corrugated-sheets/corrugated-sheet-5.jpg",
    price: "420",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "1047" },
      { label: "Ширина полезная, мм", value: "1000" },
    ],
    color: "RAL 3011",
    thickness: "0,5",
    surface: "Полиэстер",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил HC35",
    image: "/images/corrugated-sheets/corrugated-sheet-6.jpg",
    price: "450",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "1060" },
      { label: "Ширина полезная, мм", value: "1000" },
    ],
    color: "RAL 9005",
    thickness: "0,5",
    surface: "Матовая",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил HC60",
    image: "/images/corrugated-sheets/corrugated-sheet-7.jpg",
    price: "510",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "902" },
      { label: "Ширина полезная, мм", value: "845" },
    ],
    color: "RAL 5005",
    thickness: "0,7",
    surface: "Полиэстер",
    category: "corrugated-sheet",
  },
  {
    title: "Профнастил H75",
    image: "/images/corrugated-sheets/corrugated-sheet-8.jpg",
    price: "580",
    brand: "Grande Line",
    specs: [
      { label: "Ширина общая, мм", value: "800" },
      { label: "Ширина полезная, мм", value: "750" },
    ],
    color: "Оцинкованный",
    thickness: "0,8",
    surface: "Выбрать",
    category: "corrugated-sheet",
  },

  // Фальцевая кровля: Максимальная длина, м / Минимальная длина, м
  {
    title: "Кликфальц",
    image: "/images/seam-roofing/seam-roofing-1.jpg",
    price: "655",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "9" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL 7024",
    thickness: "0,5",
    surface: "Матовая",
    category: "seam-roofing",
  },
  {
    title: "Кликфальц Pro",
    image: "/images/seam-roofing/seam-roofing-2.jpg",
    price: "780",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "9" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL 9005",
    thickness: "0,5",
    surface: "Матовая",
    category: "seam-roofing",
  },
  {
    title: "Кликфальц Pro Golf",
    image: "/images/seam-roofing/seam-roofing-3.jpg",
    price: "821",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "9" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL",
    thickness: "0,45",
    surface: "Матовая",
    category: "seam-roofing",
  },
  {
    title: "Кликфальц Mini",
    image: "/images/seam-roofing/seam-roofing-4.jpg",
    price: "790",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "6" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL 8017",
    thickness: "0,5",
    surface: "Полиэстер",
    category: "seam-roofing",
  },
  {
    title: "Фальц одинарный",
    image: "/images/seam-roofing/seam-roofing-5.jpg",
    price: "820",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "8" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL 6005",
    thickness: "0,5",
    surface: "Матовая",
    category: "seam-roofing",
  },
  {
    title: "Фальц двойной",
    image: "/images/seam-roofing/seam-roofing-6.jpg",
    price: "860",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "8" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL 3005",
    thickness: "0,5",
    surface: "Матовая",
    category: "seam-roofing",
  },
  {
    title: "Фальц стоячий",
    image: "/images/seam-roofing/seam-roofing-7.jpg",
    price: "890",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "10" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "RAL 6020",
    thickness: "0,55",
    surface: "Матовая",
    category: "seam-roofing",
  },
  {
    title: "Фальц премиум",
    image: "/images/seam-roofing/seam-roofing-8.jpg",
    price: "950",
    brand: "Grande Line",
    specs: [
      { label: "Максимальная длина, м", value: "10" },
      { label: "Минимальная длина, м", value: "0,5" },
    ],
    color: "Антрацит",
    thickness: "0,7",
    surface: "Матовая",
    category: "seam-roofing",
  },
];
