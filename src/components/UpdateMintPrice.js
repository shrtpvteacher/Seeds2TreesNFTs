// src/components/UpdateMintPrice.js
import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { updateMintPrice } from "../helpers/contract";

const UpdateMintPrice = () => {
  const [newPrice, setNewPrice] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await updateMintPrice(newPrice);
      setStatus("✅ Mint price updated successfully!");
      setNewPrice("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to update mint price. " + err.message);
    }
    setLoading(false);
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Update Mint Price</Card.Title>
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="formMintPrice">
            <Form.Label>New Mint Price (in ETH)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 0.01"
              step="0.001"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            className="mt-3"
            disabled={loading || !newPrice}
          >
            {loading ? "Updating..." : "Update Price"}
          </Button>
        </Form>
        {status && (
          <Alert variant={status.startsWith("✅") ? "success" : "danger"} className="mt-3">
            {status}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default UpdateMintPrice;