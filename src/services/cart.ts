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
    const items = read();
    items.push({ ...item, id: crypto.randomUUID() });
    write(items);
  },
  remove(id: string): void {
    write(read().filter((it) => it.id !== id));
  },
  clear(): void {
    write([]);
  },
  count(): number {
    return read().length;
  },
  total(): number {
    return read().reduce((sum, it) => sum + it.total, 0);
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
