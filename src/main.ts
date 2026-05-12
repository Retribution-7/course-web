import "./styles/main.css";

import { initRouter } from "./app/router";
import { About } from "./widgets/About";
import { Calculator, initCalculator } from "./features/Calculator";
import { AuthPage, initAuthPage } from "./pages/AuthPage";
import { CartPage, initCartPage } from "./pages/CartPage";
import { ProductDetailPage, initProductDetailPage } from "./pages/ProductDetailPage";
import { ReviewsPage, initReviewsPage } from "./pages/ReviewsPage";
import { AboutCompanyPage, initAboutCompanyPage } from "./pages/AboutCompanyPage";
import { FavoritesPage, initFavoritesPage } from "./pages/FavoritesPage";
import { AccountPage, initAccountPage } from "./pages/AccountPage";
import { Catalog, initCatalog } from "./widgets/Catalog";
import { ContactForm, initContactForm } from "./widgets/ContactForm";
import { Footer } from "./widgets/Footer";
import { Header, initHeader } from "./widgets/Header";
import { Hero } from "./widgets/Hero";
import { Testimonials, initTestimonials } from "./widgets/Testimonials";

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
  ${Footer()}
  ${Calculator()}
`;

initRouter();
initHeader();
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
