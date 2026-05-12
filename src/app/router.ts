const PAGE_HASHES = new Set<string>(["#cart", "#auth"]);

const update = (): void => {
  const main = document.querySelector<HTMLElement>("main");
  if (!main) return;
  const isPage = PAGE_HASHES.has(window.location.hash);
  main.classList.toggle("hidden", isPage);
};

export const initRouter = (): void => {
  update();
  window.addEventListener("hashchange", update);
};
