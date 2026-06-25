export const BackLink = (
	href: string,
	i18nKey: string,
	label: string,
	className = "text-primary",
): string => `
  <a href="${href}"
     class="inline-flex items-center gap-2 font-sans text-[14px] lg:text-[15px]
            ${className} hover:text-button-first transition-colors mb-6 lg:mb-10">
    <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.6">
      <path d="M10 3l-5 5 5 5"/>
    </svg>
    <span data-i18n="${i18nKey}">${label}</span>
  </a>
`;
