import React, { useState } from 'react';
import { Button, Container, Alert, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';

const Faucet = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Connect MetaMask wallet and store address
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      setAccount(userAddress);
      setError(null);
      console.log("✅ Wallet connected:", userAddress);
    } catch (err) {
      console.error("❌ Wallet connection failed:", err);
      setError("Please connect your MetaMask wallet to continue.");
    }
  };

  // ✅ Send recipient to Netlify function to claim ETH
  const claimETH = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      if (!account) {
        throw new Error("Wallet not connected.");
      }

      const res = await fetch('/.netlify/functions/claimFor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: account }), // ✅ recipient sent to backend
      });

      const result = await res.json();
      console.log("🌐 Faucet function response:", result);

      if (result.success) {
        setMessage("✅ Success! You received test ETH.");
      } else {
        throw new Error(result.error || "Claim failed.");
      }
    } catch (err) {
      console.error("❌ Claim error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center py-5">
      <h1 className="mb-4">💧 Claim Sepolia Test ETH</h1>
      <p>If you watched the video, you can now claim free test ETH to mint your tree!</p>

      {/* Show connect button if wallet is not connected */}
      {!account && (
        <Button onClick={connectWallet} variant="secondary" className="mb-4">
          Connect Wallet
        </Button>
      )}

      {/* Show claim button once connected */}
      {account && (
        <>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            onClick={claimETH}
            variant="primary"
            size="lg"
            className="rounded-pill"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Claim Test ETH"}
          </Button>
        </>
      )}

      <div className="mt-4">
        <Button href="/mint" variant="success" size="md" className="rounded-pill">
          Go Mint & Donate 🌱
        </Button>
      </div>
    </Container>
  );
};

export default Faucet;
