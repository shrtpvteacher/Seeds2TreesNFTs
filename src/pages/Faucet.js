import React, { useState } from 'react';
import { Button, Container, Alert, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { getCustomContractWithSigner } from '../helpers/contract'; // update to your import path
import faucetAbi from '../abis/Seeds2TreesFaucet.json';

const faucetAddress = "0x01279BEf2091d8cC177E3a474d3B802BA7722e54"; // Replace with real address

const Faucet = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const claimETH = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const faucetContract = await getCustomContractWithSigner(faucetAddress, faucetAbi);

      //  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      //  const faucetContract = new ethers.Contract(faucetAddress, faucetAbi, signer);

      const tx = await faucetContract.claim();
      await tx.wait();

      setMessage("Success! You received test ETH. 🎉");
    } catch (err) {
      console.error(err);
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
