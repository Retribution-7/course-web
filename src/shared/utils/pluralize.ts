import { getCurrentLang } from "../../services/i18n";

export const pluralize = (
	n: number,
	forms: [string, string, string],
	enWord: string,
): string => {
	if (getCurrentLang() === "en") return `${n} ${enWord}${n !== 1 ? "s" : ""}`;
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return `${n} ${forms[0]}`;
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
		return `${n} ${forms[1]}`;
	return `${n} ${forms[2]}`;
};
