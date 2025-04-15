import React, { useState } from 'react';
import { Button, Container, Alert, Spinner } from 'react-bootstrap';

const Faucet = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const claimETH = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const res = await fetch('/.netlify/functions/claimFor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient: account }),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("Success! You received test ETH. 🎉");
      } else {
        throw new Error(result.error || "Claim failed.");
      }

    } catch (err) {
      console.error("Claim error:", err);
      setError("Something went wrong or you already claimed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center py-5">
      <h1 className="mb-4">💧 Claim Sepolia Test ETH</h1>
      <p>If you watched the video, you can now claim free test ETH to mint your tree!</p>

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

      <div className="mt-4">
        <Button href="/mint" variant="success" size="md" className="rounded-pill">
          Go Mint & Donate 🌱
        </Button>
      </div>
    </Container>
  );
};

export default Faucet;