import { createContext, useContext, useState } from "react";

const BooksContext = createContext();

export default function BooksContextProvider({ children }) {
  let [books, setBooks] = useState([]);
  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export const useBooksContext = () => useContext(BooksContext);
