import { createContext, useContext, useState } from "react";

let CategoriesContext = createContext([]);

export default function CategoriesContextProvider({ children }) {
  let [categories, setCategories] = useState([]);
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategoriesContext = () => useContext(CategoriesContext);
