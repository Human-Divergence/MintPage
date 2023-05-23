import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { NFTProvider } from "./context/NFTContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NFTProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NFTProvider>
  </React.StrictMode>
);
