import {
  clearCartByUser,
  deleteCartItemByClientId,
  getCartByUser,
  postCartItem,
} from "./api";
import { getServerId } from "./auth";

export interface CartItem {
  id: string;
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

const STORAGE_KEY = "metallobaza-cart";
const CHANGE_EVENT = "cart:change";

const read = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
};

const write = (items: CartItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

export const cart = {
  list(): CartItem[] {
    return read();
  },
  add(item: Omit<CartItem, "id">): void {
    const id = crypto.randomUUID();
    const items = read();
    items.push({ ...item, id });
    write(items);

    const userId = getServerId();
    if (userId) {
      void postCartItem({ ...item, clientId: id, userId }).catch(() => {});
    }
  },
  remove(id: string): void {
    write(read().filter((it) => it.id !== id));

    const userId = getServerId();
    if (userId) void deleteCartItemByClientId(userId, id).catch(() => {});
  },
  clear(): void {
    write([]);

    const userId = getServerId();
    if (userId) void clearCartByUser(userId).catch(() => {});
  },
  count(): number {
    return read().length;
  },
  total(): number {
    return read().reduce((sum, it) => sum + it.total, 0);
  },

  async loadFromServer(): Promise<void> {
    const userId = getServerId();
    if (!userId) return;
    try {
      const items = await getCartByUser(userId);
      const mapped: CartItem[] = items.map((i) => ({
        id: i.clientId,
        title: i.title,
        image: i.image,
        color: i.color,
        thickness: i.thickness,
        surface: i.surface,
        area: i.area,
        pricePerM2: i.pricePerM2,
        installation: i.installation,
        delivery: i.delivery,
        total: i.total,
      }));
      write(mapped);
    } catch {
      /* fail silently — local cache remains */
    }
  },

  onChange(handler: () => void): () => void {
    const listener = () => handler();
    window.addEventListener(CHANGE_EVENT, listener);
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener(CHANGE_EVENT, listener);
      window.removeEventListener("storage", listener);
    };
  },
};
