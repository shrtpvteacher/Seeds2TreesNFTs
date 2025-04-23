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
        const balanceWei = await provider.getBalance(contractAddress); // ✅ FIXED
        const balanceEth = ethers.utils.formatEther(balanceWei);

        console.log("📡 Checking balance for:", contractAddress);
        console.log("💧 Raw balance (wei):", balanceWei.toString());
        console.log("💰 Formatted balance (ETH):", balanceEth);

        setFaucetBalance(balanceEth); // Convert the balance from wei to ETH
      } catch (err) {
        console.warn("Faucet balance not available:", err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadFaucetBalance(); // ✅ FIXED name
  }, []); 


  return (
    
      
          <p>
            <strong>{faucetBalance}</strong> ETH available in the faucet.
          </p>
    
     
  );
};

export default FaucetStatsCard; 