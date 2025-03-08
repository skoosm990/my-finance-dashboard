import { useState, useContext } from "react";
import { StockContext } from "../context/StockContext";

const API_KEY = "XE7TCGLHHM6CAXE2";

function StockForm() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const { addStock } = useContext(StockContext);

  const validateStockSymbol = async (symbol) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      const data = await response.json();

      return data["Global Quote"] && data["Global Quote"]["05. price"];
    } catch (error) {
      console.error("Error validating stock symbol:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symbol || !quantity || !purchasePrice) {
      alert("Please fill in all fields.");
      return;
    }

    const isValidSymbol = await validateStockSymbol(symbol);
    if (!isValidSymbol) {
      alert("Invalid stock symbol. Please enter a valid one.");
      return;
    }

    addStock({
      symbol: symbol.toUpperCase(),
      quantity: parseInt(quantity),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: parseFloat(isValidSymbol),
    });

    setSymbol("");
    setQuantity("");
    setPurchasePrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default StockForm;
