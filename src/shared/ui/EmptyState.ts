export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps): string => `
  <div class="bg-surface rounded-[14px] card-shadow p-10 lg:p-16 text-center transition-colors duration-300">
    ${
      icon
        ? `<div class="mx-auto mb-6 grid size-20 place-items-center rounded-full gradient-icon
                shadow-[inset_0_0_12px_0_rgba(255,255,255,0.5)]
                border border-[rgba(255,196,0,0.3)]">
        ${icon}
      </div>`
        : ""
    }
    <h3 class="font-sans font-normal text-[24px] leading-[1.2] gradient-text">
      ${title}
    </h3>
    <p class="mt-3 font-sans text-[14px] sm:text-[15px] leading-[1.5] text-primary">
      ${description}
    </p>
    ${action ? `<div class="mt-8">${action}</div>` : ""}
  </div>
`;
