import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import FaucetAbi from "../abis/Seeds2TreesFaucet.json";

const FaucetStatsCard = ({ contractAddress }) => {
  const [stats, setStats] = useState({
    balance: 0,
    totalClaims: 0,
    totalUniqueClaimers: 0,
    isActive: false,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, FaucetAbi, provider);
        const [balance, claims, uniqueClaimers, active] = await contract.getStats();

        setStats({
          balance: ethers.utils.formatEther(balance),
          totalClaims: claims.toNumber(),
          totalUniqueClaimers: uniqueClaimers.toNumber(),
          isActive: active,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    loadStats();
  }, [contractAddress]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Faucet Stats</h2>
      <ul className="space-y-2 text-gray-800">
        <li><strong>Contract Balance:</strong> {stats.balance} ETH</li>
        <li><strong>Total Claims:</strong> {stats.totalClaims}</li>
        <li><strong>Unique Claimers:</strong> {stats.totalUniqueClaimers}</li>
        <li>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold ${stats.isActive ? "text-green-600" : "text-red-600"}`}>
            {stats.isActive ? "ON" : "OFF"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default FaucetStatsCard;
