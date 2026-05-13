import {
  getFavoritesByUser,
  postFavorite,
  deleteFavorite,
  clearFavoritesByUser,
} from "./api";
import { getServerId } from "./auth";

const STORAGE_KEY = "metallobaza-favorites";
const CHANGE_EVENT = "favorites:change";

const read = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((n): n is number => typeof n === "number")
      : [];
  } catch {
    return [];
  }
};

const write = (ids: number[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

export const favorites = {
  list(): number[] {
    return read();
  },
  has(id: number): boolean {
    return read().includes(id);
  },
  add(id: number): void {
    const ids = read();
    if (!ids.includes(id)) write([...ids, id]);
  },
  remove(id: number): void {
    write(read().filter((x) => x !== id));
  },
  toggle(id: number): boolean {
    const ids = read();
    let added: boolean;
    if (ids.includes(id)) {
      write(ids.filter((x) => x !== id));
      added = false;
    } else {
      write([...ids, id]);
      added = true;
    }

    const userId = getServerId();
    if (userId) {
      if (added) {
        void postFavorite(userId, id).catch(() => {});
      } else {
        void deleteFavorite(userId, id).catch(() => {});
      }
    }

    return added;
  },
  count(): number {
    return read().length;
  },
  clear(): void {
    write([]);
    const userId = getServerId();
    if (userId) void clearFavoritesByUser(userId).catch(() => {});
  },

  async loadFromServer(): Promise<void> {
    const userId = getServerId();
    if (!userId) return;
    try {
      const items = await getFavoritesByUser(userId);
      write(items.map((i) => i.productId));
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
