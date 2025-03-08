import { useEffect, useState, useContext, useCallback } from "react";
import { StockContext } from "../context/StockContext";

const API_KEY = "XE7TCGLHHM6CAXE2";

function StockList() {
  const { stocks } = useContext(StockContext);
  const [updatedStocks, setUpdatedStocks] = useState(stocks);

  const fetchStockPrices = useCallback(async () => {
    if (stocks.length === 0) return;

    const newStockData = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`
          );
          const data = await response.json();
          const currentPrice = parseFloat(data["Global Quote"]["05. price"] || stock.currentPrice);
          return { ...stock, currentPrice };
        } catch (error) {
          console.error(`Error fetching price for ${stock.symbol}:`, error);
          return stock;
        }
      })
    );

    setUpdatedStocks(newStockData);
  }, [stocks]);

  useEffect(() => {
    fetchStockPrices();
  }, [stocks, fetchStockPrices]);

  return (
    <div className="stock-list">
      <h2>Stock List</h2>
      {updatedStocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {updatedStocks.map((stock, index) => {
              const profitLoss = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
              return (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.quantity}</td>
                  <td>${stock.purchasePrice.toFixed(2)}</td>
                  <td>${stock.currentPrice.toFixed(2)}</td>
                  <td style={{ color: profitLoss >= 0 ? "green" : "red" }}>
                    ${profitLoss.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StockList;
