import type { Product } from "../../entities/products";
import { deleteProduct, fetchProducts, postProduct } from "../../services/api";
import { t } from "../../services/i18n";
import { catLabelKey } from "../../shared/constants/categories";
import { showConfirm } from "../../shared/ui/ConfirmModal";
import { showToast } from "../../shared/ui/toast";
import { showLoading, TableWrap, ThRow } from "./shared";

const INPUT_CLS =
	"h-11 rounded-[8px] border border-primary/20 px-3 font-sans text-[14px] text-primary " +
	"focus:outline-none focus:border-button-first transition-colors bg-surface w-full";

const ProductAddFormHTML = (): string => `
  <div id="product-add-form" class="hidden bg-surface rounded-[14px] card-shadow p-6 mb-5 transition-colors duration-300">
    <h3 class="font-sans font-normal text-[20px] text-primary mb-5">${t("admin-new-product")}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-title")} <span class="text-red-500">*</span></label>
        <input id="pf-title" type="text" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-brand")}</label>
        <input id="pf-brand" type="text" value="Grande Line" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-category")} <span class="text-red-500">*</span></label>
        <select id="pf-category" class="${INPUT_CLS}">
          <option value="metal-tile">${t("cat-label-metal-tile")}</option>
          <option value="corrugated-sheet">${t("cat-label-corrugated")}</option>
          <option value="seam-roofing">${t("cat-label-seam")}</option>
        </select>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-price")} <span class="text-red-500">*</span></label>
        <input id="pf-price" type="number" min="1" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-color")}</label>
        <input id="pf-color" type="text" placeholder="RAL 3005" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-thickness")}</label>
        <input id="pf-thickness" type="text" placeholder="0,5" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-surface")}</label>
        <input id="pf-surface" type="text" placeholder="Полиэстер" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-image")} <span class="text-red-500">*</span></label>
        <input id="pf-image" type="text" placeholder="/images/metal-tiles/..." class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-spec1-label")}</label>
        <input id="pf-spec1-label" type="text" placeholder="Высота волны, мм" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-spec1-value")}</label>
        <input id="pf-spec1-value" type="text" placeholder="39" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-spec2-label")}</label>
        <input id="pf-spec2-label" type="text" placeholder="Высота ступеньки, мм" class="${INPUT_CLS}" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-sans text-[13px] text-primary">${t("admin-form-spec2-value")}</label>
        <input id="pf-spec2-value" type="text" placeholder="14" class="${INPUT_CLS}" />
      </div>
    </div>
    <p id="product-form-error" class="hidden mt-3 text-red-500 font-sans text-[13px]"></p>
    <div class="flex flex-wrap gap-3 mt-6">
      <button type="button" id="save-product-btn"
              class="inline-flex items-center justify-center rounded-full
                     bg-gradient-to-r from-button-first to-button-second
                     px-6 py-3 font-sans text-[15px] text-primary
                     shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                     hover:scale-[1.02] transition-all cursor-pointer
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
        ${t("admin-save")}
      </button>
      <button type="button" id="cancel-product-btn"
              class="inline-flex items-center justify-center rounded-full
                     border border-primary/20 bg-surface px-6 py-3
                     font-sans text-[15px] text-primary
                     hover:border-button-first transition-colors cursor-pointer">
        ${t("admin-cancel")}
      </button>
    </div>
  </div>
`;

const wireProductForm = (): void => {
	const form = document.getElementById("product-add-form");
	const toggleBtn = document.getElementById("toggle-add-product");
	const cancelBtn = document.getElementById("cancel-product-btn");
	const saveBtn = document.getElementById(
		"save-product-btn",
	) as HTMLButtonElement | null;
	const errEl = document.getElementById("product-form-error");

	toggleBtn?.addEventListener("click", () => {
		form?.classList.toggle("hidden");
	});

	cancelBtn?.addEventListener("click", () => {
		form?.classList.add("hidden");
	});

	saveBtn?.addEventListener("click", async () => {
		const val = (id: string): string =>
			(document.getElementById(id) as HTMLInputElement | null)?.value.trim() ??
			"";

		const title = val("pf-title");
		const price = val("pf-price");
		const image = val("pf-image");
		const category = val("pf-category") as Product["category"];

		if (!title || !price || !image) {
			if (errEl) {
				errEl.textContent = t("admin-form-error");
				errEl.classList.remove("hidden");
			}
			return;
		}
		errEl?.classList.add("hidden");

		const newProduct: Omit<Product, "id"> = {
			title,
			image,
			price,
			brand: val("pf-brand") || "Grande Line",
			category,
			color: val("pf-color") || "—",
			thickness: val("pf-thickness") || "0,5",
			surface: val("pf-surface") || "Полиэстер",
			specs: [
				{
					label: val("pf-spec1-label") || "Характеристика 1",
					value: val("pf-spec1-value") || "—",
				},
				{
					label: val("pf-spec2-label") || "Характеристика 2",
					value: val("pf-spec2-value") || "—",
				},
			],
		};

		if (saveBtn) saveBtn.disabled = true;
		try {
			await postProduct(newProduct);
			void renderProductsTab();
		} catch {
			showToast(t("admin-error-product"), { type: "error" });
			if (saveBtn) saveBtn.disabled = false;
		}
	});
};

export const renderProductsTab = async (): Promise<void> => {
	const el = document.getElementById("admin-content");
	if (!el) return;
	showLoading();
	try {
		const products = await fetchProducts();

		const rows = products
			.map(
				(p) => `
      <tr class="border-t border-primary/10 hover:bg-bg-first transition-colors">
        <td class="px-4 py-3 text-text-third">#${p.id ?? "—"}</td>
        <td class="px-4 py-3">
          <img src="${p.image}" alt="${p.title}"
               class="w-12 h-12 object-cover rounded-[8px]" loading="lazy">
        </td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${p.title}</td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${t(catLabelKey(p.category))}</td>
        <td class="px-4 py-3 text-primary whitespace-nowrap">${p.price} ₽/м²</td>
        <td class="px-4 py-3 text-primary">${p.brand}</td>
        <td class="px-4 py-3 text-primary">${p.color}</td>
        <td class="px-4 py-3 text-primary">${p.thickness}</td>
        <td class="px-4 py-3 text-primary">${p.surface}</td>
        <td class="px-4 py-3">
          <button type="button"
                  data-delete-product="${p.id}"
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
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <h3 class="font-sans font-normal text-[20px] text-primary">${t("admin-all-products")} (${products.length})</h3>
        <button type="button" id="toggle-add-product"
                class="inline-flex items-center gap-2 rounded-full
                       bg-gradient-to-r from-button-first to-button-second
                       px-5 py-2.5 font-sans text-[15px] text-primary
                       shadow-[inset_0_0_12px_0_rgba(255,255,255,0.45)]
                       hover:scale-[1.02] transition-all cursor-pointer">
          <svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" aria-hidden="true">
            <line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/>
          </svg>
          ${t("admin-add-product")}
        </button>
      </div>
      ${ProductAddFormHTML()}
      ${TableWrap(`
        ${ThRow(t("admin-col-id"), t("admin-col-photo"), t("admin-col-name"), t("admin-col-category"), t("admin-col-price"), t("admin-col-brand"), t("admin-col-color"), t("admin-col-thickness"), t("admin-col-surface"), t("admin-col-actions"))}
        <tbody>
          ${rows || `<tr><td colspan="10" class="px-4 py-8 text-center text-text-third">${t("admin-no-products")}</td></tr>`}
        </tbody>
      `)}
    `;

		wireProductForm();

		el.querySelectorAll<HTMLButtonElement>("[data-delete-product]").forEach(
			(btn) => {
				btn.addEventListener("click", async () => {
					const id = Number(btn.dataset.deleteProduct);
					if (!(await showConfirm(t("admin-confirm-delete-product")))) return;
					try {
						await deleteProduct(id);
						void renderProductsTab();
					} catch {
						showToast(t("admin-error-delete-product"), { type: "error" });
					}
				});
			},
		);
	} catch {
		el.innerHTML = `<div class="p-8 text-center text-red-500">${t("admin-error-load-products")}</div>`;
	}
};
