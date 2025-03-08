import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import portfolioIcon from "./assets/portfolio_icon.png"; // Import the image
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="dashboard">
      <img src={portfolioIcon} alt="Portfolio Icon" className="portfolio-icon" />
        <h1>Finance Dashboard</h1>
       
      </div>
      <StockForm />
      <StockList />
    </div>
  );
}

export default App;
