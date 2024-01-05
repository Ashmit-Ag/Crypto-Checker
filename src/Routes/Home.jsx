import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Coin from "../Components/Coin.jsx";
import Error from "../Components/Error.jsx";

function Home() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    refreshPage();
  }, []);

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const refreshPage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setIsLoading(false);
      setCoins(response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error.message);
    }
  };

  if (error) return <Error error={error} />;

  return (
    <div className="main">
      <div className="headerContainer">
        <h1>Welcome to the CryptoChecker</h1>
        <div className="buttonContainer">
          <input
            placeholder="Search for a Coin"
            type="text"
            onChange={handleSearch}
          />
          {/* <div onClick={refreshPage}></div> */}
        </div>
        <div className="news">
          <Link to={"/news"} className="news-btn">
            News
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              y="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="news-svg"
            >
              <path d="M5 12h14M12 5l7 7-7 7" x="10" y="-5" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="coinsContainer">
        {isLoading && <h1 className="loadingMsg">Data Loading...</h1>}
        {filterCoins.length == 0 && !isLoading && (
          <h1 className="loadingMsg">No results found...</h1>
        )}
        {filterCoins.map((coins) => {
          return (
            <Coin
              id={coins.id}
              icon={coins.image}
              coinName={coins.name}
              coinSymbol={coins.symbol}
              price={coins.current_price}
              marketCap={coins.market_cap}
              priceChange={coins.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
