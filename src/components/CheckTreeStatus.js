// src/components/CheckTreeStatus.js
import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { ethers } from "ethers";
import contractABI from "../abis/Seeds2TreesNFTs.json";

const CONTRACT_ADDRESS = "0x8ba2b3700b797378B2696060089afCeF20791087";

const CheckTreeStatus = () => {
  const [inputId, setInputId] = useState("");
  const [treeStatus, setTreeStatus] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleCheckTree = async () => {
    if (!inputId) return;
    setChecking(true);
    setTreeStatus(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const planted = await contract.isPlanted(inputId);
      setTreeStatus(planted ? "Planted 🌳" : "Not planted yet 🌱");
    } catch (err) {
      console.error("Error checking tree:", err);
      setTreeStatus("Invalid token ID or not found.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <Form className="mb-4 d-flex flex-column flex-sm-row align-items-center gap-2">
        <Form.Control
          type="number"
          placeholder="Enter Token ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button onClick={handleCheckTree} variant="success">
          Check Tree
        </Button>
      </Form>

      {checking && <Spinner animation="border" />}
      {treeStatus && (
        <p className="text-info fs-5">Token #{inputId}: {treeStatus}</p>
      )}
    </>
  );
};

export default CheckTreeStatus;
