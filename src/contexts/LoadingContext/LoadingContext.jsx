import { useContext, createContext, useState } from "react";

let LoadingContext = createContext(false);

export default function LoadingContextProvider({ children }) {
  let [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoadingContext = () => useContext(LoadingContext);
