import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../Routes/Styles/CoinPage.css";

function CoinPage() {
  let { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    // console.log(id);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
      (response) => {
        console.log(response.data);
        setCoin(response.data);
      }
    );
  }, []);

  // if statement to check if data has reached, only then render the component
  if (coin) {
    return (
      <div
        className="coinPage-Container"
        
      >
        <div className="coinPage-Info">
          <h1>{coin.name}</h1>
          <img src={coin.image.large} alt="Icon" className="coinPage-Icon" />
          <div className="coinPage-Data">
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Symbol:</h3>
              <h3 className="coinPage-RowData">{coin.symbol}</h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Price:</h3>
              <h3 className="coinPage-RowData">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Cap:</h3>
              <h3 className="coinPage-RowData">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">Volume:</h3>
              <h3 className="coinPage-RowData">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">24hr High:</h3>
              <h3 className="coinPage-RowData green">
                $ {coin.market_data.high_24h.usd.toLocaleString()}
              </h3>
            </div>
            <div className="coinPage-Row">
              <h3 className="coinPage-RowHeader">24hr Low:</h3>
              <h3 className="coinPage-RowData red">
                $ {coin.market_data.low_24h.usd.toLocaleString()}
              </h3>
            </div>
          </div>
          <Link to="/">
            <div className="coinPage-RouteButton">Go back</div>
          </Link>

          {/* coinName={coins.name}
              coinSymbol={coins.symbol}
              price={coins.current_price}
              marketCap={coins.market_cap}
              priceChange={ */}
        </div>
      </div>
    );
  } else {
    return null; // if API data not fetched, return null
  }
}

export default CoinPage;
