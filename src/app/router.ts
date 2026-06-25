import { isAdmin, isAuthenticated, onAuthChange } from "../services/auth";

const PAGE_HASHES: ReadonlySet<string> = new Set([
	"#cart",
	"#auth",
	"#reviews",
	"#company",
	"#favorites",
	"#account",
	"#admin",
]);
const PAGE_PREFIXES: readonly string[] = ["#product/"];

const PROTECTED_HASHES: ReadonlySet<string> = new Set([
	"#cart",
	"#reviews",
	"#company",
	"#favorites",
	"#account",
	"#admin",
]);
const PROTECTED_PREFIXES: readonly string[] = ["#product/"];

const ADMIN_HASHES: ReadonlySet<string> = new Set(["#admin"]);

const isProtected = (hash: string): boolean =>
	PROTECTED_HASHES.has(hash) ||
	PROTECTED_PREFIXES.some((p) => hash.startsWith(p));

const guard = (): boolean => {
	const hash = window.location.hash;
	if (isProtected(hash) && !isAuthenticated()) {
		window.location.replace("#auth");
		return false;
	}
	if (ADMIN_HASHES.has(hash) && !isAdmin()) {
		window.location.replace("");
		return false;
	}
	return true;
};


const update = (): void => {
	const main = document.querySelector<HTMLElement>("main");
	if (!main) return;
	const hash = window.location.hash;
	const isPage =
		PAGE_HASHES.has(hash) || PAGE_PREFIXES.some((p) => hash.startsWith(p));
	main.classList.toggle("hidden", isPage);
};


const handle = (): void => {
	if (!guard()) return;
	update();
};


export const initRouter = (): void => {
	handle();
	window.addEventListener("hashchange", handle);
	onAuthChange(() => {
		const hash = window.location.hash;
		if (!isAuthenticated() && isProtected(hash)) {
			window.location.replace("#auth");
		} else if (ADMIN_HASHES.has(hash) && !isAdmin()) {
			window.location.replace("");
		}
	});
};
