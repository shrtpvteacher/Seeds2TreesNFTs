// src/App.js
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import "./styles/App.css";
import * as contract from './helpers/contract'; // adjust path if needed

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      }
    };

    checkWallet();
  }, []);

  // ✅ New one just for exposing the contract
useEffect(() => {
    window.contract = contract;
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation account={account} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
