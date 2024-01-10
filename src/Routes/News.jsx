// src/CryptoNews.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Error from "../Components/Error.jsx";
import "../Routes/Styles/News.css";

const CryptoNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          category: "business",
          apiKey:process.env.NEWS_API_KEY,
        },
      });

      const filteredNews = response.data.articles.filter(
        (article) => !article.title.toLowerCase().includes("removed")
      );
      setNews(filteredNews);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching news:", error);
      console.error("Error fetching news:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const PlaceholderImage = () => (
    <div className="crypto-placeholder-image">
      <p>No Image Available</p>
    </div>
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="crypto-news-container">
      <h2>News</h2>
      <div className="navbar">
        <div className="back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="28"
            viewBox="0 0 24 12"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="back-svg"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <Link className="back-btn" to={"/"}>
            Back
          </Link>
        </div>
        <button onClick={fetchNews}>Refresh</button>
      </div>
      <div className="crypto-news-cards">
        {news.map((article) => (
          <div className="crypto-news-card" key={article.title}>
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="crypto-news-image"
              />
            ) : (
              <PlaceholderImage />
            )}
            <div className="crypto-news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-link"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
