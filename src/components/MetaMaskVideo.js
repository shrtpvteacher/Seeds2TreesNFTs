/*import React, { useState } from 'react';
import { Row, Card, Button } from 'react-bootstrap';

const VideoIntro = () => {
  const [showMetaMaskVideo, setShowMetaMaskVideo] = useState(false);
  const [showMintVideo, setShowMintVideo] = useState(false);

  const metaMaskVideoId = "M2krM0MdqCE";
  const mintNFTVideoId = "YOUR_VIDEO_ID_2";

  return (
    <Row className="mt-4">
      <Card className="p-4 shadow-lg rounded-4 bg-white bg-opacity-90">
        <h2 className="mb-3">🦊 You’ll need a MetaMask wallet to interact with this site.</h2>
        <p>Please watch this short video on how to install MetaMask.</p>

        
        <div className="text-center mb-3">
          <Button href="/mint" variant="success" size="md" className="rounded-pill">
            I Already Have a Wallet — Skip the Video
          </Button>
        </div>

       
        <div className="mb-4 text-center">
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
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        
        <h2 className="mt-5">🌱 How to Get Sepolia ETH and Mint Your Tree</h2>
        <div className="mb-4 text-center">
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
  );
};

export default VideoIntro; */


import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const MetaMaskVideo = () => {
  const [showVideo, setShowVideo] = useState(false);
  const metaMaskVideoId = "M2krM0MdqCE";

  return (
    <Card className="p-4 mt-5 mb-5 shadow-lg rounded-4 sm-white bg-opacity-40">
      <h2 className="video-header mb-3">🦊 You’ll need a MetaMask wallet to use this site.</h2>
      <p>Please watch this short video on how to install MetaMask, or skip ahead if you already have it.</p>

      {/* Skip Button */}
      <div className="text-center mb-3">
        <Button href="/donate" variant="success" size="md" className="rounded-pill">
          I Already Have MetaMask — Skip to Mint
        </Button>
      </div>

      {/* Video or Thumbnail */}
      <div className="mb-4 text-center">
        {!showVideo ? (
          <img
            src={`https://img.youtube.com/vi/${metaMaskVideoId}/hqdefault.jpg`}
            alt="Install MetaMask Thumbnail"
            className="img-fluid rounded shadow-sm"
            style={{ cursor: 'pointer', maxWidth: '560px' }}
            onClick={() => setShowVideo(true)}
          />
        ) : (
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${metaMaskVideoId}`}
              title="How to Install MetaMask"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetaMaskVideo;
