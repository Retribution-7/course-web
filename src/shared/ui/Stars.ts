import { getCurrentLang } from "../../services/i18n";

export const Stars = (rating: number): string => {
	const full = Math.max(0, Math.min(5, Math.round(rating)));
	const ariaLabel =
		getCurrentLang() === "en"
			? `Rating: ${full} out of 5`
			: `Оценка: ${full} из 5`;
	return `
    <div class="flex items-center gap-0.5" aria-label="${ariaLabel}">
      ${Array.from({ length: 5 })
				.map(
					(_, i) => `
        <svg viewBox="0 0 20 20"
             class="size-[14px] sm:size-4 ${i < full ? "text-button-first" : "text-border-light dark:text-border-dark"}"
             fill="currentColor"
             aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L10 14.9l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z"/>
        </svg>
      `,
				)
				.join("")}
    </div>
  `;
};
