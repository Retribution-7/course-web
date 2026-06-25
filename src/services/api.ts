import type { Product } from "../entities/products";
import type { Review } from "../entities/reviews";

export const API_BASE = "/api";

export interface ProductFilters {
  category?: string;
  _sort?: string;
  _order?: "asc" | "desc";
  title_like?: string;
}

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  password?: string;
  birthDate?: string;
  nickname?: string;
}

export interface ApiFavorite {
  id: number;
  userId: string;
  productId: number;
}

export interface ApiCartItem {
  id: number;
  clientId: string;
  userId: string;
  title: string;
  image: string;
  color: string;
  thickness: string;
  surface: string;
  area: number;
  pricePerM2: number;
  installation: boolean;
  delivery: boolean;
  total: number;
}

export const fetchProducts = async (
  filters: ProductFilters = {},
): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters._sort) params.set("_sort", filters._sort);
  if (filters._order) params.set("_order", filters._order);
  if (filters.title_like) params.set("title_like", filters.title_like);
  const qs = params.toString();
  const res = await fetch(`${API_BASE}/products${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json() as Promise<Product[]>;
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Ошибка загрузки товара");
  return res.json() as Promise<Product>;
};

export const fetchProductsByIds = async (ids: number[]): Promise<Product[]> => {
  if (ids.length === 0) return [];
  const qs = ids.map((id) => `id=${id}`).join("&");
  const res = await fetch(`${API_BASE}/products?${qs}`);
  if (!res.ok) throw new Error("Ошибка загрузки товаров");
  return res.json() as Promise<Product[]>;
};

export const fetchReviews = async (): Promise<Review[]> => {
  const res = await fetch(`${API_BASE}/reviews`);
  if (!res.ok) throw new Error("Ошибка загрузки отзывов");
  return res.json() as Promise<Review[]>;
};

export const fetchUsers = async (): Promise<ApiUser[]> => {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error("Ошибка загрузки пользователей");
  return res.json() as Promise<ApiUser[]>;
};

export interface CreateUserInput {
  phone: string;
  email: string;
  birthDate: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  nickname: string;
  password: string;
  role?: "customer" | "admin";
  createdAt: string;
}

export const postUser = async (
  user: CreateUserInput,
): Promise<{ id: number }> => {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Ошибка сохранения пользователя");
  return res.json() as Promise<{ id: number }>;
};

export const updateUser = async (
  id: number,
  data: Partial<ApiUser>,
): Promise<ApiUser> => {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка обновления пользователя");
  return res.json() as Promise<ApiUser>;
};

export const getAllCartItems = async (): Promise<ApiCartItem[]> => {
  const res = await fetch(`${API_BASE}/cart`);
  if (!res.ok) throw new Error("Ошибка загрузки корзины");
  return res.json() as Promise<ApiCartItem[]>;
};

export const postProduct = async (
  product: Omit<Product, "id">,
): Promise<Product> => {
  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Ошибка создания товара");
  return res.json() as Promise<Product>;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
};

export const deleteReview = async (id: number): Promise<void> => {
  await fetch(`${API_BASE}/reviews/${id}`, { method: "DELETE" });
};

export const postReview = async (
  review: Omit<Review, "id">,
): Promise<Review> => {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("Ошибка отправки отзыва");
  return res.json() as Promise<Review>;
};

export const getFavoritesByUser = async (
  userId: string,
): Promise<ApiFavorite[]> => {
  const res = await fetch(`${API_BASE}/favorites?userId=${userId}`);
  if (!res.ok) throw new Error("Ошибка загрузки избранного");
  return res.json() as Promise<ApiFavorite[]>;
};

export const postFavorite = async (
  userId: string,
  productId: number,
): Promise<void> => {
  await fetch(`${API_BASE}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
};

export const deleteFavorite = async (
  userId: string,
  productId: number,
): Promise<void> => {
  const res = await fetch(
    `${API_BASE}/favorites?userId=${userId}&productId=${productId}`,
  );
  const items = (await res.json()) as ApiFavorite[];
  await Promise.all(
    items.map((item) =>
      fetch(`${API_BASE}/favorites/${item.id}`, { method: "DELETE" }),
    ),
  );
};

export const clearFavoritesByUser = async (userId: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/favorites?userId=${userId}`);
  const items = (await res.json()) as ApiFavorite[];
  await Promise.all(
    items.map((item) =>
      fetch(`${API_BASE}/favorites/${item.id}`, { method: "DELETE" }),
    ),
  );
};

export const getCartByUser = async (userId: string): Promise<ApiCartItem[]> => {
  const res = await fetch(`${API_BASE}/cart?userId=${userId}`);
  if (!res.ok) throw new Error("Ошибка загрузки корзины");
  return res.json() as Promise<ApiCartItem[]>;
};

export const postCartItem = async (
  item: Omit<ApiCartItem, "id">,
): Promise<void> => {
  await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};

export const deleteCartItemByClientId = async (
  userId: string,
  clientId: string,
): Promise<void> => {
  const res = await fetch(
    `${API_BASE}/cart?userId=${userId}&clientId=${clientId}`,
  );
  const items = (await res.json()) as ApiCartItem[];
  await Promise.all(
    items.map((item) =>
      fetch(`${API_BASE}/cart/${item.id}`, { method: "DELETE" }),
    ),
  );
};

export const clearCartByUser = async (userId: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/cart?userId=${userId}`);
  const items = (await res.json()) as ApiCartItem[];
  await Promise.all(
    items.map((item) =>
      fetch(`${API_BASE}/cart/${item.id}`, { method: "DELETE" }),
    ),
  );
};
