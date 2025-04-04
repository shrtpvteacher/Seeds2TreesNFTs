// src/pages/Home.js
import React, { useState, useEffect } from "react";
import MintNFT from "../components/MintNFT";
import DonationTracker from "../components/DonationTracker";
import DonationChart from "../components/DonationChart";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/App.css";
import "../styles/MintNFT.css";
import "../styles/DonationTracker.css"
import "../videos/install-metamask.mp4"

const Home = () => {
    const [hasMetaMask, setHasMetaMask] = useState(true);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") {
      setHasMetaMask(false);
    }
  }, []);

  useEffect(() => {
    if (!hasMetaMask) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hasMetaMask]);

  if (!hasMetaMask) {
    return (
        <Container className="py-5 d-flex flex-column align-items-center justify-content-center text-center fade-in" style={{ minHeight: "100vh" }}>
       <h2>Welcome to Seeds2Trees</h2>
        <h2>Please watch this short video on how to install MetaMask</h2>
       {/* <video style={{ width: "100%", maxWidth: "720px", margin: "1rem 0" }} controls>
         <source src="/videos/install-metamask.mp4" type="video/mp4" /> */ }
          Your browser does not support the video tag.
       {/* </video> */}
        <p>
          After installing MetaMask, refresh this page to continue.
        </p>
        <button
          className="btn btn-primary"
          onClick={() =>
            window.open("https://metamask.io/download.html", "_blank")
          }
        >
          Install MetaMask
        </button>
      </Container>
    );
  }

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

export default Home;
