import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const FaucetVideo = () => {
  const [showVideo, setShowVideo] = useState(false);
  const faucetVideoId = "b45MkpO-DQU"; 

  return (
    <Card className="p-4 mb-5 shadow-lg rounded-4 bg-white bg-opacity-90">
      <h2 className="mb-3">🌱 Ready to Mint Your Tree NFT?</h2>
      <p>Watch this video to learn how the App Works to mint your NFT or click below for one time faucet.</p>

      { 
      <div className="mb-4 text-center">
        {!showVideo ? (
          <img
            src={`https://img.youtube.com/vi/${faucetVideoId}/hqdefault.jpg`}
            alt="Seeds2Trees Project Walkthrough"
            className="img-fluid rounded shadow-sm"
            style={{ cursor: 'pointer', maxWidth: '560px' }}
            onClick={() => setShowVideo(true)}
          />
        ) : (
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${faucetVideoId}`}
              title="Seeds2Trees Project Walkthrough"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      }

      <div className="text-center">
        <Button href="/faucet" variant="success" size="md" className="rounded-pill">
          Go to Faucet
        </Button>
      </div>
    </Card>
  );
};

export default FaucetVideo;
