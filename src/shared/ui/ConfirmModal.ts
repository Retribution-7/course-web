let activeModal: HTMLElement | null = null;

/**
 * Show a confirmation dialog and resolve with the user's choice.
 * @param message - Question to display
 * @returns Promise that resolves to true (confirmed) or false (cancelled)
 */
export const showConfirm = (message: string): Promise<boolean> => {
	if (activeModal) activeModal.remove();

	return new Promise<boolean>((resolve) => {
		const overlay = document.createElement("div");
		overlay.style.cssText =
			"position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(0,0,0,0.4);";
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");

		const modal = document.createElement("div");
		modal.style.cssText =
			"background:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.18);padding:28px 32px;max-width:400px;width:90%;font-family:sans-serif;display:flex;flex-direction:column;gap:20px;";
		modal.innerHTML = `
			<p style="margin:0;font-size:16px;line-height:1.5;color:#44444E;">${message}</p>
			<div style="display:flex;justify-content:flex-end;gap:10px;">
				<button type="button" data-confirm="false"
					style="padding:8px 20px;border-radius:20px;border:1px solid #ddd;background:#fff;font-size:14px;color:#44444E;cursor:pointer;transition:background 0.15s;">
					Отмена
				</button>
				<button type="button" data-confirm="true"
					style="padding:8px 20px;border-radius:20px;border:none;background:linear-gradient(135deg,#FFC400,#FF9800);font-size:14px;color:#fff;font-weight:500;cursor:pointer;transition:opacity 0.15s;">
					Подтвердить
				</button>
			</div>
		`;

		const cleanup = (result: boolean): void => {
			overlay.remove();
			activeModal = null;
			resolve(result);
		};

		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) cleanup(false);
		});

		modal.querySelectorAll<HTMLButtonElement>("[data-confirm]").forEach((btn) => {
			btn.addEventListener("click", () => {
				cleanup(btn.dataset.confirm === "true");
			});
		});

		const onKey = (e: KeyboardEvent): void => {
			if (e.key === "Escape") {
				document.removeEventListener("keydown", onKey);
				cleanup(false);
			}
		};
		document.addEventListener("keydown", onKey);

		overlay.appendChild(modal);
		document.body.appendChild(overlay);
		activeModal = overlay;

		modal.querySelector<HTMLButtonElement>("[data-confirm='true']")?.focus();
	});
};
