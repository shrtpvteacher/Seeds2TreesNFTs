// src/components/DonationTracker.js
import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import {
  getTotalMinted,
  getTotalDonations,
  getPlantedTrees,
  getTotalWithdrawn
} from "../helpers/contract";

const DonationTracker = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    minted: 0,
    donations: "0",
    planted: 0,
    withdrawn: "0"
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