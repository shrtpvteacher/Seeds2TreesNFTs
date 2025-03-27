// src/components/UpdateTreeLocation.js
import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { updatePlantingDetails } from "../helpers/contract";

const UpdateTreeLocation = () => {
  const [tokenId, setTokenId] = useState("");
  const [datePlanted, setDatePlanted] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      await updatePlantingDetails(tokenId, datePlanted, latitude, longitude);
      setStatus(`✅ Tree #${tokenId} updated successfully!`);
      setTokenId("");
      setDatePlanted("");
      setLatitude("");
      setLongitude("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to update tree planting details: " + err.message);
    }
    setLoading(false);
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Update Tree Planting Information</Card.Title>
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Token ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 1"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date Planted</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. March 24, 2025"
              value={datePlanted}
              onChange={(e) => setDatePlanted(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 37.7749"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. -122.4194"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Tree Info"}
          </Button>
        </Form>
        {status && (
          <Alert className="mt-3" variant={status.startsWith("✅") ? "success" : "danger"}>
            {status}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default UpdateTreeLocation;
