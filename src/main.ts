import "./styles/main.css";

import { initRouter } from "./app/router";
import { Calculator, initCalculator } from "./features/Calculator";
import {
  AboutCompanyPage,
  initAboutCompanyPage,
} from "./pages/AboutCompanyPage";
import { AccountPage, initAccountPage } from "./pages/AccountPage";
import { AdminPage, initAdminPage } from "./pages/AdminPage";
import { AuthPage, initAuthPage } from "./pages/AuthPage";
import { CartPage, initCartPage } from "./pages/CartPage";
import { FavoritesPage, initFavoritesPage } from "./pages/FavoritesPage";
import {
  initProductDetailPage,
  ProductDetailPage,
} from "./pages/ProductDetailPage";
import { initReviewsPage, ReviewsPage } from "./pages/ReviewsPage";
import { a11y } from "./services/a11y";
import { isAuthenticated, onAuthChange } from "./services/auth";
import { cart } from "./services/cart";
import { favorites } from "./services/favorites";
import { initI18n } from "./services/i18n";
import { hidePreloader } from "./shared/ui/preloader";
import { initA11yPanel } from "./widgets/A11yPanel";
import { About } from "./widgets/About";
import { Catalog, initCatalog } from "./widgets/Catalog";
import { ContactForm, initContactForm } from "./widgets/ContactForm";
import { Footer, initFooter } from "./widgets/Footer";
import { Header, initHeader, initTheme } from "./widgets/Header";
import { Hero } from "./widgets/Hero";
import { initTestimonials, Testimonials } from "./widgets/Testimonials";

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

const syncFromServer = (): void => {
  if (isAuthenticated()) {
    void favorites.loadFromServer();
    void cart.loadFromServer();
  }
};

syncFromServer();
onAuthChange(syncFromServer);
