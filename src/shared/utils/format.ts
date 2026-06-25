import { getCurrentLang } from "../../services/i18n";

export const formatRub = (value: number): string =>
	`${Math.round(value).toLocaleString("ru-RU")} ₽`;

export const formatDate = (iso: string): string => {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	const locale = getCurrentLang() === "en" ? "en-US" : "ru-RU";
	return d.toLocaleDateString(locale, {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
};
