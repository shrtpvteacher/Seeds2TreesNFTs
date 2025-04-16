import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const FaucetVideo = () => {
  const [showVideo, setShowVideo] = useState(false);
  const faucetVideoId = "YOUR_VIDEO_ID_2"; // Replace with actual YouTube ID

  return (
    <Card className="p-4 mb-5 shadow-lg rounded-4 bg-white bg-opacity-90">
      <h2 className="mb-3">🌱 Ready to Mint Your Tree NFT?</h2>
      <p>Watch this short video to learn how to get Sepolia test ETH and use it to mint your NFT.</p>

      {/* 
      <div className="mb-4 text-center">
        {!showVideo ? (
          <img
            src={`https://img.youtube.com/vi/${faucetVideoId}/hqdefault.jpg`}
            alt="Faucet and Mint NFT Thumbnail"
            className="img-fluid rounded shadow-sm"
            style={{ cursor: 'pointer', maxWidth: '560px' }}
            onClick={() => setShowVideo(true)}
          />
        ) : (
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${faucetVideoId}`}
              title="How to Use Faucet and Mint"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      */}

      <div className="text-center">
        <Button href="/faucet" variant="success" size="md" className="rounded-pill">
          Go to Faucet
        </Button>
      </div>
    </Card>
  );
};

export default FaucetVideo;
