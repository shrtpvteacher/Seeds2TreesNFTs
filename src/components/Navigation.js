// src/components/Navigation.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Modal, OverlayTrigger, Tooltip, } from "react-bootstrap"; // ✅ added Modal here
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import '../styles/App.css';

const SEPOLIA_CHAIN_ID = "0xaa36a7"; // Hexadecimal for 11155111

const Navigation = () => {
  const [account, setAccount] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  // ✅ Detect if wrong network
  const checkNetwork = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const isSepolia = chainId === SEPOLIA_CHAIN_ID;
      setWrongNetwork(!isSepolia);
      setShowModal(!isSepolia);
    }
  };

  // ✅ Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        await checkNetwork(); // ✅ make sure we check after connect
      } catch (error) {
        console.error("Wallet connection rejected", error);
      }
    } else {
      alert("Please install MetaMask.");
    }
  };

  // ✅ Switch to Sepolia
  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
      setWrongNetwork(false);
      setShowModal(false);
    } catch (switchError) {
      console.error("Failed to switch network", switchError);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });

      window.ethereum.on("chainChanged", () => {
        checkNetwork(); // ✅ re-check network on chain change
      });

      checkNetwork(); // ✅ check on load
    }
  }, []);

  return (                                         // ✅ wrapped in fragment
    <>
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
            <Nav.Link as={Link} to="/donate" className="text-white mx-3">Donate & Mint</Nav.Link>
            <Nav.Link as={Link} to="/gallery" className="text-white mx-3">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/my-nfts" className="text-white mx-3">View My NFTs</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white mx-3">About</Nav.Link>
            <Nav.Link as={Link} to="/admin" className="text-white mx-3">Admin</Nav.Link>
          </Nav>

            <OverlayTrigger
                placement="bottom"
                overlay={
                    account ? (
                        <Tooltip id="wallet-tooltip">{account}</Tooltip>
                    ) : (
                        <Tooltip id="wallet-tooltip">Click to connect</Tooltip>
                    )
                }
            >

          {/* Wallet Button */}
          <Button
            variant={account ? "success" : "secondary"}
            onClick={connectWallet}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="wallet-button"
          >
            {account
                ? hovered
                    ? `${account.slice(0, 6)}...${account.slice(-4)}`
                    : "Connected"
                : "Connect Wallet"}
          </Button>
        </OverlayTrigger>  
    </Container>
    </Navbar>

      {/* ✅ Modal for Wrong Network wrapped in fragment */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Wrong Network</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You’re connected to the wrong network. Please switch to <strong>Sepolia</strong> to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={switchToSepolia}>Switch to Sepolia</Button>
        </Modal.Footer>
      </Modal>
    </>
  ); // ✅ everything returned inside a single parent fragment
};

export default Navigation;
