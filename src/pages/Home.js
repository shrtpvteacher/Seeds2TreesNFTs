// src/pages/Home.js
import React from "react";
import MintNFT from "../components/MintNFT";
import DonationTracker from "../components/DonationTracker";
import DonationChart from "../components/DonationChart";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/App.css";
import "../styles/MintNFT.css";
import "../styles/DonationTracker.css"



const Home = () => {
  return (
    <Container className="py-2">
        <div className="home-container">
      <MintNFT />
      </div>
      <div className="">
       
      <Row className="mt-4">
  <Col md={6} className="p-3 d-flex flex-column justify-content-start" style={{ height: "100%" }}>
    <div className="w-100 h-100">
      <DonationTracker />
    </div>
  </Col>

  <Col md={6} className="p-3 d-flex flex-column justify-content-start" style={{ height: "100%" }}>
    <div className="w-100 h-100">
      <DonationChart />
    </div>
  </Col>
</Row>
          
      </div>
    </Container>
  );
};

export default Home;