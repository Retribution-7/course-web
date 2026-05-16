import "./styles/main.css";

import { initRouter } from "./app/router";
import { hidePreloader } from "./shared/ui/preloader";
import { About } from "./widgets/About";
import { Calculator, initCalculator } from "./features/Calculator";
import { AuthPage, initAuthPage } from "./pages/AuthPage";
import { CartPage, initCartPage } from "./pages/CartPage";
import { ProductDetailPage, initProductDetailPage } from "./pages/ProductDetailPage";
import { ReviewsPage, initReviewsPage } from "./pages/ReviewsPage";
import { AboutCompanyPage, initAboutCompanyPage } from "./pages/AboutCompanyPage";
import { FavoritesPage, initFavoritesPage } from "./pages/FavoritesPage";
import { AccountPage, initAccountPage } from "./pages/AccountPage";
import { AdminPage, initAdminPage } from "./pages/AdminPage";
import { Catalog, initCatalog } from "./widgets/Catalog";
import { ContactForm, initContactForm } from "./widgets/ContactForm";
import { Footer, initFooter } from "./widgets/Footer";
import { Header, initHeader, initTheme } from "./widgets/Header";
import { Hero } from "./widgets/Hero";
import { Testimonials, initTestimonials } from "./widgets/Testimonials";
import { isAuthenticated, onAuthChange } from "./services/auth";
import { favorites } from "./services/favorites";
import { cart } from "./services/cart";
import { initI18n } from "./services/i18n";
import { a11y } from "./services/a11y";
import { initA11yPanel } from "./widgets/A11yPanel";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

app.innerHTML = `
  ${Header()}
  <main>
    ${Hero()}
    ${About()}
    ${Catalog()}
    ${ContactForm()}
    ${Testimonials()}
  </main>
  ${CartPage()}
  ${AuthPage()}
  ${ProductDetailPage()}
  ${ReviewsPage()}
  ${AboutCompanyPage()}
  ${FavoritesPage()}
  ${AccountPage()}
  ${AdminPage()}
  ${Footer()}
  ${Calculator()}
`;

initTheme();
a11y.applyFromStorage();
initI18n();
initRouter();
initHeader();
initA11yPanel();
initCatalog();
initContactForm();
initTestimonials();
initCalculator();
initCartPage();
initAuthPage();
initProductDetailPage();
initReviewsPage();
initAboutCompanyPage();
initFavoritesPage();
initAccountPage();
initAdminPage();
initFooter();

hidePreloader();
a11y.observeImages();

// Sync favorites and cart from JSON Server when user is authenticated
const syncFromServer = (): void => {
  if (isAuthenticated()) {
    void favorites.loadFromServer();
    void cart.loadFromServer();
  }
};

syncFromServer();
onAuthChange(syncFromServer);
