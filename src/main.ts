import "./styles/main.css";

import { Header } from "./components/Header";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

app.innerHTML = `
  ${Header()}
`;
