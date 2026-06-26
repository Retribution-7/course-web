import { fetchUsers, updateUser } from "../../services/api";
import { getUser } from "../../services/auth";
import { getCurrentLang, t } from "../../services/i18n";
import { showToast } from "../../shared/ui/toast";
import { escapeHtml } from "../../shared/utils/escape";
import { showLoading, TableWrap, ThRow } from "./shared";

export const ROLE_COLORS = Object.freeze({
	customer: "bg-[#E8F5E9] text-[#2E7D32]",
	admin: "bg-gradient-to-r from-button-first to-button-second text-primary",
	manager: "bg-[#E3F2FD] text-[#1565C0]",
} as Record<string, string>);

const RoleBadge = (role: string): string => {
	const knownRoles = ["customer", "admin", "manager"];
	const label = knownRoles.includes(role) ? t(`admin-role-${role}`) : role;
	const cls = ROLE_COLORS[role] ?? "bg-gray-100 text-gray-600";
	return `<span class="inline-block px-2.5 py-0.5 rounded-full text-[12px] ${cls}">${label}</span>`;
};

export const renderUsersTab = async (): Promise<void> => {
	const el = document.getElementById("admin-content");
	if (!el) return;
	showLoading();
	try {
		const users = await fetchUsers();
		const currentPhone = getUser()?.phone ?? "";
		const locale = getCurrentLang() === "en" ? "en-US" : "ru-RU";

		const rows = users
			.map((u) => {
				const isSelf = u.phone === currentPhone;
				const nextRole = u.role === "admin" ? "customer" : "admin";
				const btnLabel =
					u.role === "admin" ? t("admin-make-customer") : t("admin-make-admin");
				return `
        <tr class="border-t border-primary/10 hover:bg-bg-first transition-colors">
          <td class="px-4 py-3 text-text-third">#${u.id}</td>
          <td class="px-4 py-3">
            <div class="text-primary">${escapeHtml(u.lastName)} ${escapeHtml(u.firstName)}</div>
            <div class="text-[12px] text-text-third">@${escapeHtml(u.nickname ?? "—")}</div>
          </td>
          <td class="px-4 py-3 text-primary whitespace-nowrap">${escapeHtml(u.phone)}</td>
          <td class="px-4 py-3 text-primary break-all">${escapeHtml(u.email)}</td>
          <td class="px-4 py-3">${RoleBadge(u.role ?? "customer")}</td>
          <td class="px-4 py-3 text-text-third whitespace-nowrap">
            ${u.createdAt ? new Date(u.createdAt).toLocaleDateString(locale) : "—"}
          </td>
          <td class="px-4 py-3">
            ${
							isSelf
								? `<span class="text-[12px] text-[#758499] italic">${t("admin-you")}</span>`
								: `<button type="button"
                           data-change-role="${u.id}"
                           data-next-role="${nextRole}"
                           class="text-[13px] px-3 py-1.5 rounded-full border border-button-first
                                  bg-surface text-primary hover:bg-bg-first transition-colors cursor-pointer">
                     ${btnLabel}
                   </button>`
						}
          </td>
        </tr>`;
			})
			.join("");

		el.innerHTML = `
      <div class="mb-5">
        <h3 class="font-sans font-normal text-[20px] text-primary">${t("admin-all-users")} (${users.length})</h3>
      </div>
      ${TableWrap(`
        ${ThRow(t("admin-col-id"), t("admin-col-user"), t("admin-col-phone"), t("admin-col-email"), t("admin-col-role"), t("admin-col-reg-date"), t("admin-col-actions"))}
        <tbody>
          ${rows || `<tr><td colspan="7" class="px-4 py-8 text-center text-text-third">${t("admin-no-users")}</td></tr>`}
        </tbody>
      `)}
    `;

		el.querySelectorAll<HTMLButtonElement>("[data-change-role]").forEach(
			(btn) => {
				btn.addEventListener("click", async () => {
					const id = Number(btn.dataset.changeRole);
					const nextRole = btn.dataset.nextRole ?? "customer";
					btn.disabled = true;
					try {
						await updateUser(id, { role: nextRole });
						void renderUsersTab();
					} catch {
						showToast(t("admin-error-role"), { type: "error" });
						btn.disabled = false;
					}
				});
			},
		);
	} catch {
		el.innerHTML = `<div class="p-8 text-center text-red-500">${t("admin-error-load-users")}</div>`;
	}
};
