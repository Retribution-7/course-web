export const StatCard = (
	label: string,
	value: string | number,
	iconHtml: string,
	bgClass: string,
): string => `
  <div class="bg-surface rounded-[14px] card-shadow p-5 lg:p-6 flex items-center gap-4 transition-colors duration-300">
    <div class="max-sm:hidden grid size-12 lg:size-14 place-items-center rounded-[12px] shrink-0 ${bgClass}">
      ${iconHtml}
    </div>
    <div>
      <p class="font-sans text-[13px] text-text-third">${label}</p>
      <p class="font-sans text-[24px] lg:text-[28px] leading-none text-primary mt-0.5">${value}</p>
    </div>
  </div>
`;

export const Spinner = (): string => `
  <div class="flex items-center justify-center py-20">
    <div class="w-10 h-10 rounded-full border-2 border-button-first border-t-transparent animate-spin"></div>
  </div>
`;

export const TableWrap = (content: string): string => `
  <div class="bg-surface rounded-[14px] card-shadow overflow-hidden transition-colors duration-300">
    <div class="overflow-x-auto">
      <table class="w-full font-sans text-[14px]">${content}</table>
    </div>
  </div>
`;

export const ThRow = (...cols: string[]): string => `
  <thead>
    <tr class="bg-bg-first">
      ${cols.map((c) => `<th class="px-4 py-3 text-left font-sans text-[12px] uppercase tracking-[0.06em] text-text-third whitespace-nowrap">${c}</th>`).join("")}
    </tr>
  </thead>
`;

export const showLoading = (): void => {
	const el = document.getElementById("admin-content");
	if (el) el.innerHTML = Spinner();
};
