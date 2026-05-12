import "./styles/main.css";

import { About } from "./components/About";
import { Calculator, initCalculator } from "./components/Calculator";
import { Catalog, initCatalog } from "./components/Catalog";
import { ContactForm, initContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Header, initHeader } from "./components/Header";
import { Hero } from "./components/Hero";
import { Testimonials, initTestimonials } from "./components/Testimonials";

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
  ${Footer()}
  ${Calculator()}
`;

initHeader();
initCatalog();
initContactForm();
initTestimonials();
initCalculator();
