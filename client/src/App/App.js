import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "../Components/NavBar/NavBar";
import LiveChat from "../Components/LiveChat/LiveChat";
import Home from "../Components/Home/Home";
import RedditPage from "../Components/RedditPage/RedditPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redditpage" element={<RedditPage />} />
        <Route path="/livechat" element={<LiveChat />} />
      </Routes>
    </div>
  );
}

export default App;
