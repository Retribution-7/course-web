export const togglePage = (sectionId: string, show: boolean): void => {
	const page = document.getElementById(sectionId);
	if (!page) return;
	page.classList.toggle("hidden", !show);
	if (show) window.scrollTo({ top: 0, behavior: "smooth" });
};

export const createPageRouter = (
	sectionId: string,
	hash: string,
	onShow?: () => void,
): (() => void) => {
	const handleRoute = (): void => {
		const show = window.location.hash === hash;
		togglePage(sectionId, show);
		if (show && onShow) onShow();
	};
	return handleRoute;
};
