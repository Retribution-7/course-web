import { deleteReview, fetchReviews } from "../../services/api";
import { t } from "../../services/i18n";
import { showConfirm } from "../../shared/ui/ConfirmModal";
import { showToast } from "../../shared/ui/toast";
import { showLoading, TableWrap, ThRow } from "./shared";

const Stars = (rating: number): string =>
	Array.from(
		{ length: 5 },
		(_, i) =>
			`<span class="${i < Math.round(rating) ? "text-[#FFC400]" : "text-gray-300"}">★</span>`,
	).join("");

export const renderReviewsTab = async (): Promise<void> => {
	const el = document.getElementById("admin-content");
	if (!el) return;
	showLoading();
	try {
		const reviews = await fetchReviews();

		const rows = reviews
			.map(
				(r) => `
      <tr class="border-t border-primary/10 hover:bg-bg-first transition-colors">
        <td class="px-4 py-3 text-text-third">#${r.id}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <img src="${r.avatar}" alt=""
                 class="size-9 rounded-full object-cover shrink-0" loading="lazy">
            <span class="text-primary whitespace-nowrap">${r.name}</span>
          </div>
        </td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${r.date}</td>
        <td class="px-4 py-3 text-[16px] leading-none">${Stars(r.rating)}</td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${r.product ?? "—"}</td>
        <td class="px-4 py-3 text-primary max-w-[260px]">
          <span class="line-clamp-2">${r.text}</span>
        </td>
        <td class="px-4 py-3">
          <button type="button"
                  data-delete-review="${r.id}"
                  class="text-[13px] px-3 py-1.5 rounded-full border border-red-300
                         bg-surface text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            ${t("admin-delete")}
          </button>
        </td>
      </tr>
    `,
			)
			.join("");

		el.innerHTML = `
      <div class="mb-5">
        <h3 class="font-sans font-normal text-[20px] text-primary">${t("admin-all-reviews")} (${reviews.length})</h3>
      </div>
      ${TableWrap(`
        ${ThRow(t("admin-col-id"), t("admin-col-author"), t("admin-col-date"), t("admin-col-rating"), t("admin-col-product"), t("admin-col-text"), t("admin-col-actions"))}
        <tbody>
          ${rows || `<tr><td colspan="7" class="px-4 py-8 text-center text-text-third">${t("admin-no-reviews")}</td></tr>`}
        </tbody>
      `)}
    `;

		el.querySelectorAll<HTMLButtonElement>("[data-delete-review]").forEach(
			(btn) => {
				btn.addEventListener("click", async () => {
					const id = Number(btn.dataset.deleteReview);
					if (!(await showConfirm(t("admin-confirm-delete-review")))) return;
					try {
						await deleteReview(id);
						void renderReviewsTab();
					} catch {
						showToast(t("admin-error-delete-review"), { type: "error" });
					}
				});
			},
		);
	} catch {
		el.innerHTML = `<div class="p-8 text-center text-red-500">${t("admin-error-load-reviews")}</div>`;
	}
};
