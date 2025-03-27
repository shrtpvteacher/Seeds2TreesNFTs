// src/components/WithdrawFunds.js
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { withdrawBalance } from "../helpers/contract";

const WithdrawFunds = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setStatus("");
    setLoading(true);
    try {
      await withdrawBalance();
      setStatus("✅ Funds withdrawn successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to withdraw funds: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Withdraw Contract Balance</Card.Title>
        <p>This will send all ETH in the contract to the contract owner.</p>
        <Button variant="danger" onClick={handleWithdraw} disabled={loading}>
          {loading ? "Withdrawing..." : "Withdraw Funds"}
        </Button>
        {status && (
          <Alert variant={status.startsWith("✅") ? "success" : "danger"} className="mt-3">
            {status}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default WithdrawFunds;