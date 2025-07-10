import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MetaMaskVideo from '../components/MetaMaskVideo';
import FaucetVideo from '../components/FaucetVideo';
import seedlingHero from '../assets/seedling-hero-image.png';

const Home = () => {
  return (
     <div className="home-wrapper position-relative">
      {/* Hero art/logo "stamp" – floats left, above background, never pushes content */}
      <img
        src={seedlingHero}
        alt="Hero Logo"
        className="hero-stamp"
      />
  <Container className="py-1 text-center position-relative">
    <Row className="align-items-center px-4">
            <h1 className="display-1 fw-bold mt-4 mb-3 text-white ">Seeds2Trees NFTs</h1>
            <h3 className="mission-reset mt-4 mb-3 text-white">
                A Web3-powered tree planting donation platform where each NFT represents a tree planted.
                Use the NFT to track its growth!
            </h3>
        
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
