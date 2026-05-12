const PAGE_HASHES = new Set<string>(["#cart", "#auth"]);
const PAGE_PREFIXES = ["#product/"];

const update = (): void => {
  const main = document.querySelector<HTMLElement>("main");
  if (!main) return;
  const hash = window.location.hash;
  const isPage =
    PAGE_HASHES.has(hash) || PAGE_PREFIXES.some((prefix) => hash.startsWith(prefix));
  main.classList.toggle("hidden", isPage);
};

export const initRouter = (): void => {
  update();
  window.addEventListener("hashchange", update);
};
