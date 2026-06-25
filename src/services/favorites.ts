import {
	clearFavoritesByUser,
	deleteFavorite,
	getFavoritesByUser,
	postFavorite,
} from "./api";
import { getServerId } from "./auth";

const CHANGE_EVENT = "favorites:change";

let ids: number[] = [];

const emit = (): void => {
	window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

const setIds = (next: number[]): void => {
	ids = next;
	emit();
};

/**
 * Favorites service — manages local favorites state and syncs with the server.
 *
 * Methods: list, has, count, toggle, sync, onChange
 */
export const favorites = {
	list(): number[] {
		return ids;
	},
	has(id: number): boolean {
		return ids.includes(id);
	},
	count(): number {
		return ids.length;
	},

	async toggle(id: number): Promise<boolean> {
		const userId = getServerId();
		if (!userId) return false;

		const added = !ids.includes(id);
		setIds(added ? [...ids, id] : ids.filter((x) => x !== id));

		try {
			if (added) {
				await postFavorite(userId, id);
			} else {
				await deleteFavorite(userId, id);
			}
			return added;
		} catch {
			// revert on failure
			setIds(added ? ids.filter((x) => x !== id) : [...ids, id]);
			return !added;
		}
	},

	async clear(): Promise<void> {
		const userId = getServerId();
		setIds([]);
		if (userId) {
			try {
				await clearFavoritesByUser(userId);
			} catch {
				/* keep empty */
			}
		}
	},

	async loadFromServer(): Promise<void> {
		const userId = getServerId();
		if (!userId) {
			setIds([]);
			return;
		}
		try {
			const items = await getFavoritesByUser(userId);
			setIds(items.map((i) => i.productId));
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
