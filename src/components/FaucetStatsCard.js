import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FaucetAbi from "../abis/Seeds2TreesFaucet.json";
import { Spinner } from 'react-bootstrap'; // Import Spinner for loading

const FaucetStatsCard = () => {
  const [faucetBalance, setFaucetBalance] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
 

  
  const contractAddress = process.env.REACT_APP_FAUCET_CONTRACT_ADDRESS;

  
  useEffect(() => {
    const loadFaucetBalance = async () => {
      
      try {
        if (!contractAddress) {
          throw new Error("Contract address is missing");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, FaucetAbi, provider);

        
        const [balanceWei] = await contract.getStats(); // getStats returns a tuple
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setFaucetBalance(ethers.utils.formatEther(balance)); // Convert the balance from wei to ETH
    
        setFaucetBalance(balanceEth);
         } catch (err) {
        console.warn("Faucet balance not available:", err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadFaucetBalance();
  }, [contractAddress]); // Re-run this effect if the contractAddress changes

  return (
    <div className="shadow p-3 mb-2 rounded-3 p-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-1">Faucet Balance</h2>
      {loading ? (
        <Spinner animation="border" size="sm" /> // Show spinner while loading
      ) : error ? (
        <p className="text-danger">{error}</p> // Show error message if there's an issue
      ) : (
        <p>
          <strong>{faucetBalance}</strong> ETH
        </p>
      )}
    </div>
  );
};

export default FaucetStatsCard; 