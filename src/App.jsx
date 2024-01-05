import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home.jsx";
import News from "./Routes/News.jsx";
import CoinPage from "./Routes/CoinPage.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element = { <Home />} />
          <Route path="/news" element = { <News />} />
          <Route path="/CoinPage/:id" element = { <CoinPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;