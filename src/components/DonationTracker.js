// src/components/DonationTracker.js
import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import {
  getTotalMinted,
  getTotalDonations,
  getPlantedTrees,
  getTotalWithdrawn,
  getContractWithProvider
} from "../helpers/contract";

const DonationTracker = () => {

   
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
  const [stats, setStats] = useState({
    
    minted: null,
    donations: null,
    planted: null,
    withdrawn: null
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        
        const [minted, donations, planted, withdrawn] = await Promise.all([
          getTotalMinted(),
          getTotalDonations(),
          getPlantedTrees(),
          getTotalWithdrawn()
        ]);
        setStats({ minted, donations, planted, withdrawn });
      } catch (error) {
        console.error("Error fetching donation stats:", error);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

   // Helper for rendering each stat row
  function renderStatRow(title, value, isEth) {
    let content = "Loading...";
    if (error) {
      content = "Could not load data";
    } else if (!loading && value !== null && value !== undefined) {
      content = isEth ? `${value} ETH` : value;
    }
    return (
      <>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </>
    );
  }

  return (
    
      
          <Card className="text-center shadow-sm">
            <Card.Body>
            <Card.Title>Total ETH Donated</Card.Title>
            <Card.Text>{loading ? <Spinner animation="border" size="sm" /> : `${stats.donations} ETH`}</Card.Text>
            <Card.Title>Total NFTs Minted</Card.Title>
            <Card.Text>{loading ? <Spinner animation="border" size="sm" /> : stats.minted}</Card.Text>
            <Card.Title>Total Trees Planted</Card.Title>
            <Card.Text>{loading ? <Spinner animation="border" size="sm" /> : stats.planted}</Card.Text>
            <Card.Title>Funds Withdrawn</Card.Title>
            <Card.Text>{loading ? <Spinner animation="border" size="sm" /> : `${stats.withdrawn} ETH`}</Card.Text>
            </Card.Body>
          </Card>
        
  );
};

export default DonationTracker;