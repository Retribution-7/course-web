import type { Product } from "../entities/products";
import type { Review } from "../entities/reviews";

/** Base URL for the JSON Server API. */
export const API_BASE = "/api";

const deleteAllByQuery = async (
	collection: string,
	params: Record<string, string>,
): Promise<void> => {
	const qs = new URLSearchParams(params).toString();
	const res = await fetch(`${API_BASE}/${collection}?${qs}`);
	const items = (await res.json()) as { id: number }[];
	await Promise.all(
		items.map((item) =>
			fetch(`${API_BASE}/${collection}/${item.id}`, { method: "DELETE" }),
		),
	);
};

/** Filters for product listing queries. */
export interface ProductFilters {
	category?: string;
	_sort?: string;
	_order?: "asc" | "desc";
	title_like?: string;
}

/** User record as stored on the server. */
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

/** Favorite product reference for a user. */
export interface ApiFavorite {
	id: number;
	userId: string;
	productId: number;
}

/** Cart item stored on the server. */
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

/**
 * Fetch products with optional filters.
 * @param filters - category, sort order, search query
 * @returns Array of matching products
 */
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

/**
 * Fetch a single product by ID.
 * @param id - Product identifier
 * @returns The product or null if not found
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
	const res = await fetch(`${API_BASE}/products/${id}`);
	if (res.status === 404) return null;
	if (!res.ok) throw new Error("Ошибка загрузки товара");
	return res.json() as Promise<Product>;
};

/**
 * Fetch multiple products by their IDs.
 * @param ids - Array of product identifiers
 * @returns Array of found products (may be shorter than input)
 */
export const fetchProductsByIds = async (ids: number[]): Promise<Product[]> => {
	if (ids.length === 0) return [];
	const qs = ids.map((id) => `id=${id}`).join("&");
	const res = await fetch(`${API_BASE}/products?${qs}`);
	if (!res.ok) throw new Error("Ошибка загрузки товаров");
	return res.json() as Promise<Product[]>;
};

/** Fetch all reviews. */
export const fetchReviews = async (): Promise<Review[]> => {
	const res = await fetch(`${API_BASE}/reviews`);
	if (!res.ok) throw new Error("Ошибка загрузки отзывов");
	return res.json() as Promise<Review[]>;
};

/** Fetch all registered users. */
export const fetchUsers = async (): Promise<ApiUser[]> => {
	const res = await fetch(`${API_BASE}/users`);
	if (!res.ok) throw new Error("Ошибка загрузки пользователей");
	return res.json() as Promise<ApiUser[]>;
};

/** Input data for creating a new user. */
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

/**
 * Register a new user on the server.
 * @param user - User data to save
 * @returns The created user's server ID
 */
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

/**
 * Update an existing user's fields.
 * @param id - User server ID
 * @param data - Partial fields to update
 * @returns The updated user record
 */
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

/** Fetch all cart items (admin view). */
export const getAllCartItems = async (): Promise<ApiCartItem[]> => {
	const res = await fetch(`${API_BASE}/cart`);
	if (!res.ok) throw new Error("Ошибка загрузки корзины");
	return res.json() as Promise<ApiCartItem[]>;
};

/**
 * Create a new product.
 * @param product - Product data without ID
 * @returns The created product with server-assigned ID
 */
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

/** Delete a product by ID. */
export const deleteProduct = async (id: number): Promise<void> => {
	await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
};

/** Delete a review by ID. */
export const deleteReview = async (id: number): Promise<void> => {
	await fetch(`${API_BASE}/reviews/${id}`, { method: "DELETE" });
};

/**
 * Submit a new review.
 * @param review - Review data without ID
 * @returns The saved review with server-assigned ID
 */
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

/**
 * Get all favorite product IDs for a user.
 * @param userId - User identifier
 * @returns Array of favorite records
 */
export const getFavoritesByUser = async (
	userId: string,
): Promise<ApiFavorite[]> => {
	const res = await fetch(`${API_BASE}/favorites?userId=${userId}`);
	if (!res.ok) throw new Error("Ошибка загрузки избранного");
	return res.json() as Promise<ApiFavorite[]>;
};

/**
 * Add a product to user's favorites.
 * @param userId - User identifier
 * @param productId - Product to favorite
 */
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

/**
 * Remove a product from user's favorites.
 * @param userId - User identifier
 * @param productId - Product to remove
 */
export const deleteFavorite = async (
	userId: string,
	productId: number,
): Promise<void> => {
	await deleteAllByQuery("favorites", {
		userId,
		productId: String(productId),
	});
};

/** Clear all favorites for a user. */
export const clearFavoritesByUser = async (userId: string): Promise<void> => {
	await deleteAllByQuery("favorites", { userId });
};

/**
 * Get cart items for a specific user.
 * @param userId - User identifier
 * @returns Array of cart items
 */
export const getCartByUser = async (userId: string): Promise<ApiCartItem[]> => {
	const res = await fetch(`${API_BASE}/cart?userId=${userId}`);
	if (!res.ok) throw new Error("Ошибка загрузки корзины");
	return res.json() as Promise<ApiCartItem[]>;
};

/**
 * Add an item to user's cart.
 * @param item - Cart item data without server ID
 */
export const postCartItem = async (
	item: Omit<ApiCartItem, "id">,
): Promise<void> => {
	await fetch(`${API_BASE}/cart`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
};

/**
 * Remove a specific cart item by client ID.
 * @param userId - User identifier
 * @param clientId - Client-side unique key for the cart entry
 */
export const deleteCartItemByClientId = async (
	userId: string,
	clientId: string,
): Promise<void> => {
	await deleteAllByQuery("cart", { userId, clientId });
};

/** Clear all cart items for a user. */
export const clearCartByUser = async (userId: string): Promise<void> => {
	await deleteAllByQuery("cart", { userId });
};
