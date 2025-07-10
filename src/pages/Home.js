/*
✅ Seeds2Trees Deployment Checklist

Before you deploy:

📋 1. YouTube Video IDs
- [ ] Replace YOUR_VIDEO_ID_1 and YOUR_VIDEO_ID_2 with real YouTube IDs.
- [ ] Test clicking thumbnails — videos should load and play.

📋 2. Thumbnails
- [ ] Thumbnails should display correctly:
  https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg

📋 3. Navigation Buttons
- [ ] "Skip the Video" button comes after the wallet explanation.
- [ ] "Enter Site Here" button appears after videos.
- [ ] Both buttons link correctly to /mint.

📋 4. Mobile Responsiveness Test:
Manual Visual Test – Open browser, Inspect → Mobile View 📱 check 
- [ ] Thumbnails and videos resize correctly (img-fluid, ratio-16x9).

📋 5. Final Home Page Testing of buttons and visual overlook of flow:
- [ ] Full user flow works cleanly.

✅ Ready to Launch!
*/
/*
import React, { useState } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
// import './Home.css';  // Make sure you have Home.css created and imported

const Home = () => {
  const [showMetaMaskVideo, setShowMetaMaskVideo] = useState(false);
  const [showMintVideo, setShowMintVideo] = useState(false);

  // ✅ Insert your YouTube Video IDs here
  const metaMaskVideoId = "M2krM0MdqCE";
  const mintNFTVideoId = "YOUR_VIDEO_ID_2";   

  return (
    <Container 
      className="py-2 d-flex flex-column align-items-center justify-content-center text-center fade-in" 
      style={{ minHeight: "100vh" }}
    >
      <h2>Welcome to Seeds2Trees</h2>

      <div className="home-container">
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 p-6">
          <div className="max-w-5xl mx-auto text-center">

            /* Hero Section */ 
           /* <h1 className="text-5xl font-bold mb-4 hero-text">Seeds2Trees</h1>
            <p className="text-xl mb-10 hero-subtext">Planting Trees, Growing Futures 🌱</p>

            /* Subheader and Intro Paragraph Section */
          /*  <div className="p-4 mb-5 bg-white rounded shadow-lg" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 className="fw-bold mb-3">Our Mission</h2>
                    <p className="lead" style={{ lineHeight: '1.6' }}>
                            Seeds2Trees is a Web3-powered donation platform where each donation mints an NFT representing a tree, from seedling to planting.
                            Your contribution helps fight climate change and supports reforestation efforts around the world.
                 </p>
           </div>

          </div> 

          
          <Row className="mt-4">
            <Card className="p-2 ms-1 w-100 d-flex flex-column align-items-center justify-content-start">

            
              <h2>🦊 You will need a MetaMask wallet to interact with this site.</h2>
              <h2>Please watch this short video on how to install MetaMask</h2>

             
              <div className="text-center mb-3">
                <Button href="/mint" variant="success" size="md" className="rounded-pill">
                  I Already Have a Wallet — Skip the Video
                </Button>
              </div>

             
              <div className="mb-4">
                {!showMetaMaskVideo ? (
                  <img
                    src={`https://img.youtube.com/vi/${metaMaskVideoId}/hqdefault.jpg`}
                    alt="Install MetaMask Thumbnail"
                    className="img-fluid rounded shadow-sm"
                    style={{ cursor: 'pointer', maxWidth: '560px' }}
                    onClick={() => setShowMetaMaskVideo(true)}
                  />
                ) : (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${metaMaskVideoId}`}
                      title="How to Install MetaMask"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>

            
              <h2 className="mt-5">🌱 How to Get Sepolia Test ETH and Mint Your Tree</h2>

              <div className="mb-4">
                {!showMintVideo ? (
                  <img
                    src={`https://img.youtube.com/vi/${mintNFTVideoId}/hqdefault.jpg`}
                    alt="Mint NFT Thumbnail"
                    className="img-fluid rounded shadow-sm"
                    style={{ cursor: 'pointer', maxWidth: '560px' }}
                    onClick={() => setShowMintVideo(true)}
                  />
                ) : (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${mintNFTVideoId}`}
                      title="Get Sepolia ETH and Mint NFT"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>

            
              <div className="text-center mt-4">
                <Button href="/mint" variant="success" size="lg" className="rounded-pill">
                  Enter Site Here!
                </Button>
              </div>

            </Card>
          </Row>

        </div>
      </div>
    </Container>      
  );
};

export default Home; */




import React from 'react';
import { Container } from 'react-bootstrap';
import MetaMaskVideo from '../components/MetaMaskVideo';
import FaucetVideo from '../components/FaucetVideo';
import seedlingHero from '../assets/seedling-hero-image.png';

const Home = () => {
  return (

    <div className="home-wrapper">
   
    <Container className="py-3 text-center position-relative">

          <img
    src={seedlingHero}
    alt="Seeds2Trees Journey Icon"
    className="hero-background-image"  />
    
      {/* Hero Title */}
    <h1 className="display-3 fw-bold mt-4 mb-3 text-white ">Seeds2Trees NFTs</h1>
   

<h3 className="mission-reset mt-4 mb-3 text-white">
      A Web3-powered tree planting donation platform where each NFT represents a tree planted.
      Use the NFT to track its growth!
    </h3>

    
      {/* Video 1: MetaMask Setup */}
      <div className="video-wrapper mx-auto mb-2">
      <MetaMaskVideo />
      </div>

      {/* Video 2: Faucet + Mint Instructions */}
      <div className="video-wrapper mx-auto">
    <FaucetVideo />
  </div>
</Container>

    </div>
  );
};

export default Home;
