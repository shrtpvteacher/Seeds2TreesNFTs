// src/components/MintNFT.js
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { getMintPrice, mintNFT, provider, signer, contract } from "../helpers/contract";


function MintNFT()  {
  const [account, setAccount] = useState('');
  const [mintPrice, setMintPrice] = useState("0.005");
  const [donationAmount, setDonationAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    async function fetchMintPrice() {
      try {
       
        const price = await getMintPrice();
        setMintPrice(price);
      } catch (error) {
        console.error("Error fetching mint price:", error);
      }
    }
    fetchMintPrice();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      alert('Please install MetaMask.');
      return;
    }
    const accounts = await provider.send('eth_requestAccounts', []);
    setAccount(accounts[0]);
  }

  const handleMint = async (e) => {
    e.preventDefault();
    setStatus("");
    setIsMinting(true);
    try {
      await mintNFT(donationAmount);
      setStatus("✅ Tree NFT successfully minted!");
      setDonationAmount("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to mint NFT. " + (err?.message || ""));
    }
    setIsMinting(false);
  };

  return (
    <Container className="donate-container mt-4">
       <h1>Donate To Plant A Tree In The Redwood Forest</h1>
       <h4>And Receive an NFT to Track Your Tree's Growth</h4>
      <p>
       Minimum Donation:<strong> {mintPrice} ETH </strong>

       </p>

      <Form onSubmit={handleMint} style={{ maxWidth: '800px', margin: '50px auto' }}>
      <Form.Group as={Row} className="mb-3" controlId="donationInput">
          <Col>
            <Form.Control
              type="number"
              placeholder={`Min: ${mintPrice} ETH`}
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="donation-input"
              min={mintPrice}
              step="0.001"
              required
            />
          </Col>
          <Col>
            <Button
              variant="success"
              type="submit"
              style={{ width: "100%" }}
              className="donate-button"
              disabled={isMinting || !donationAmount || parseFloat(donationAmount) < parseFloat(mintPrice)} 
            >
              {isMinting ? "Minting..." : "Donate & Mint"}
            </Button>
          </Col>
          </Form.Group>
      </Form>

      {status && (
        <Alert className="mt-3" variant={status.startsWith("✅") ? "success" : "danger"}>
          {status}
        </Alert>
      )}
    </Container>
  );
};

export default MintNFT;