import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import CategoriesContextProvider from "./contexts/CategoriesContext/CategoriesContext";
import LoadingContextProvider from "./contexts/LoadingContext/LoadingContext";
import AppDataLoader from "./components/pages/AppDataLoader/AppDataLoader";
import BooksContextProvider from "./contexts/BooksContext/BooksContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* context [start] */}
      <LoadingContextProvider>
        <BooksContextProvider>
          <CategoriesContextProvider>
            <AppDataLoader>
              <App />
            </AppDataLoader>
          </CategoriesContextProvider>
        </BooksContextProvider>
      </LoadingContextProvider>
      {/* context [end] */}
    </BrowserRouter>
  </StrictMode>
);
