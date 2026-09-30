import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import "./reset.css";
import "./styles.css";
import Home from "./components/pages/Home";
import PlayPage from "./components/pages/PlayPage";
import Leaderboard from "./components/pages/Leaderboard";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/1" element={<PlayPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </BrowserRouter>,
);