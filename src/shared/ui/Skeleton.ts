/**
 * Render a pulsing skeleton placeholder.
 * @param lines - Number of skeleton lines to render
 * @param className - Optional extra classes for the wrapper
 */
export const Skeleton = (lines = 3, className = ""): string => `
  <div class="animate-pulse flex flex-col gap-3 ${className}">
    ${Array.from({ length: lines }, (_, i) => {
      const w = i === lines - 1 ? "w-2/3" : "w-full";
      return `<div class="h-4 rounded bg-gray-200 dark:bg-gray-700 ${w}"></div>`;
    }).join("")}
  </div>
`;

/** Skeleton card that mimics a product/review card shape. */
export const SkeletonCard = (): string => `
  <div class="animate-pulse bg-surface rounded-[14px] card-shadow p-6 flex flex-col gap-4">
    <div class="h-[200px] rounded-[8px] bg-gray-200 dark:bg-gray-700"></div>
    <div class="h-5 rounded bg-gray-200 dark:bg-gray-700 w-3/4"></div>
    <div class="h-4 rounded bg-gray-200 dark:bg-gray-700 w-1/2"></div>
    <div class="h-4 rounded bg-gray-200 dark:bg-gray-700 w-full"></div>
  </div>
`;

/** Grid of skeleton cards for catalog/reviews loading. */
export const SkeletonGrid = (count = 4): string => `
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    ${Array.from({ length: count }, () => SkeletonCard()).join("")}
  </div>
`;
