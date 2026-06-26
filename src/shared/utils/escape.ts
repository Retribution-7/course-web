const map: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

export const escapeHtml = (str: string): string =>
	str.replace(/[&<>"']/g, (c) => map[c] ?? c);
