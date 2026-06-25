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

const CHANGE_EVENT = "cart:change";

let items: CartItem[] = [];

const emit = (): void => {
	window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};


const setItems = (next: CartItem[]): void => {
	items = next;
	emit();
};


export const cart = {
	list(): CartItem[] {
		return items;
	},
	count(): number {
		return items.length;
	},
	total(): number {
		return items.reduce((sum, it) => sum + it.total, 0);
	},

	async add(item: Omit<CartItem, "id">): Promise<void> {
		const userId = getServerId();
		const clientId = crypto.randomUUID();
		const newItem: CartItem = { ...item, id: clientId };
		setItems([...items, newItem]);

		if (userId) {
			try {
				await postCartItem({ ...item, clientId, userId });
			} catch {
				setItems(items.filter((it) => it.id !== clientId));
			}
		}
	},

	async remove(id: string): Promise<void> {
		setItems(items.filter((it) => it.id !== id));
		const userId = getServerId();
		if (userId) {
			try {
				await deleteCartItemByClientId(userId, id);
			} catch {
				/* keep current state */
			}
		}
	},

	async clear(): Promise<void> {
		setItems([]);
		const userId = getServerId();
		if (userId) {
			try {
				await clearCartByUser(userId);
			} catch {
				/* keep empty */
			}
		}
	},

	async loadFromServer(): Promise<void> {
		const userId = getServerId();
		if (!userId) {
			setItems([]);
			return;
		}
		try {
			const raw = await getCartByUser(userId);
			const mapped: CartItem[] = raw.map((i) => ({
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
			setItems(mapped);
		} catch {
			/* keep current cache */
		}
	},

	onChange(handler: () => void): () => void {
		const listener = () => handler();
		window.addEventListener(CHANGE_EVENT, listener);
		return () => {
			window.removeEventListener(CHANGE_EVENT, listener);
		};
	},
};
