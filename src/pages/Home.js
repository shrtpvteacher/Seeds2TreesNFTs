import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MetaMaskVideo from '../components/MetaMaskVideo';
import FaucetVideo from '../components/FaucetVideo';
import seedlingHero from '../assets/seedling-hero-image.png';

const Home = () => {
  return (
 <div className="home-wrapper">
  <Container className="py-3 text-center position-relative">
    <Row className="align-items-center">
          {/* Image: left on desktop, above on mobile */}
        <Col xs={12} md={5} className="d-flex justify-content-center mb-4 mb-md-0">
          <img
            src={seedlingHero}
            alt="Seeds2Trees Journey Icon"
            className="hero-background-image"  />
        </Col>
          {/* Text: right on desktop, below on mobile */}
        <Col xs={12} md={7} className="text-center d-flex flex-column justify-content-center">
            <h1 className="display-3 fw-bold mt-4 mb-3 text-white ">Seeds2Trees NFTs</h1>
            <h3 className="mission-reset mt-4 mb-3 text-white">
                A Web3-powered tree planting donation platform where each NFT represents a tree planted.
                Use the NFT to track its growth!
            </h3>
        </Col>
    </Row>
      <div className="video-wrapper mx-auto mb-2">
        <MetaMaskVideo />
      </div>
      <div className="video-wrapper mx-auto">
         <FaucetVideo />
     </div>
  </Container>
 </div>
  );
};

export default Home;  
