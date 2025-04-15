// src/pages/DonationPage.js
import React from "react";
import MintNFT from "../components/MintNFT";
import DonationTracker from "../components/DonationTracker";
import DonationChart from "../components/DonationChart";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/App.css";
import "../styles/MintNFT.css";
import "../styles/DonationTracker.css"


const DonationPage = () => {

  return (
    <Container className="py-2">
        <div className="home-container">
      <MintNFT />
      </div>
      
      <Row className="mt-4">
        <Col md={6} >
        <Card className="p-2 ms-1 w-100 h-100 d-flex flex-column justify-content-start" style={{ height: "100%" }}>
      <DonationTracker />
        </Card>
        </Col>

        <Col md={6}>
        <Card className="p-2 me-1 w-100 h-100 d-flex flex-column justify-content-start" style={{ height: "100%" }}>
      <DonationChart />
        </Card>
        </Col>
        </Row>  
      
    </Container>
  );
};

export default DonationPage;
