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
        if (!contractAddress || !window.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, FaucetAbi, provider);

        const [balanceWei] = await contract.getStats(); // getStats returns a tuple
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setFaucetBalance(balanceEth); // Convert the balance from wei to ETH
        } catch (err) {
        console.warn("Faucet balance not available:", err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadFaucetBalance();
  }, []); // place an address in here if you need to Re-run this effect if the contractAddress changes
  if (!faucetBalance || loading) return null;

  return (
    <div className="shadow p-3 mb-2 rounded-3 p-4 w-full max-w-md mx-auto">
      {loading ? (
           <Spinner animation="border" size="sm" />
        ) : (
          <p>
            <strong>{faucetBalance}</strong> ETH in Faucet
          </p>
        )}
    </div>   
  );
};

export default FaucetStatsCard; 