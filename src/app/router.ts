import { isAuthenticated, onAuthChange } from "../services/auth";

const PAGE_HASHES = new Set<string>([
  "#cart",
  "#auth",
  "#reviews",
  "#company",
  "#favorites",
  "#account",
]);
const PAGE_PREFIXES = ["#product/"];

const PROTECTED_HASHES = new Set<string>([
  "#cart",
  "#reviews",
  "#company",
  "#favorites",
  "#account",
]);
const PROTECTED_PREFIXES = ["#product/"];

const isProtected = (hash: string): boolean =>
  PROTECTED_HASHES.has(hash) || PROTECTED_PREFIXES.some((p) => hash.startsWith(p));

const guard = (): boolean => {
  const hash = window.location.hash;
  if (isProtected(hash) && !isAuthenticated()) {
    window.location.replace("#auth");
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
    if (!isAuthenticated() && isProtected(window.location.hash)) {
      window.location.replace("#auth");
    }
  });
};
