// src/components/Navigation.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import '../styles/App.css'

const Navigation = () => {
  const [account, setAccount] = useState(null);
  const [hovered, setHovered] = useState(false);

   // Function to connect wallet
   async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection rejected", error);
      }
    } else {
      alert("Please install MetaMask.");
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
    <Container>
      {/* Logo Section */}
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          width="170"
          height="170"
          className="d-inline-block align-top mx-2"
          alt="Seeds2Trees Logo"
        />
        
      </Navbar.Brand>
           {/* Navigation Links */}
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className="text-white mx-3">Home</Nav.Link>
          <Nav.Link as={Link} to="/gallery" className="text-white mx-3">Gallery</Nav.Link>
          <Nav.Link as={Link} to="/admin" className="text-white mx-3">Admin</Nav.Link>
        </Nav>

        {/* Wallet Connect Button */}
        <Button
          variant="danger"
          onClick={connectWallet}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="wallet-button"
        >
          {!account ? "Connect Wallet" : hovered ? "Change Wallet" : `${account.slice(0, 6)}...${account.slice(-4)}`}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Navigation;