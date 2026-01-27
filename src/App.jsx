import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import ProductPage from "./components/pages/ProductPage/ProductPage";
import ContactPage from "./components/pages/ContactPage/ContactPage";
import CategoriesPage from "./components/pages/CategoriesPage/CategoriesPage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import SearchPage from "./components/pages/SearchPage/SearchPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/product/:id" Component={ProductPage} />
      <Route path="/contact" Component={ContactPage} />
      <Route path="/categories" Component={CategoriesPage} />
      <Route path="/search" Component={SearchPage} />
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
}
