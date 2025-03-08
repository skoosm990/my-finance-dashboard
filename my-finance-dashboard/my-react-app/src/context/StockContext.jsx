import { createContext, useState, useCallback } from "react";

export const StockContext = createContext();

export function StockProvider({ children }) {
  const [stocks, setStocks] = useState([]);

  const addStock = useCallback((newStock) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  }, []);

  return (
    <StockContext.Provider value={{ stocks, addStock }}>
      {children}
    </StockContext.Provider>
  );
}
