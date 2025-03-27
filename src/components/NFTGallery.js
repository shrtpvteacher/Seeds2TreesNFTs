// src/components/NFTGallery.js
import React, { useEffect, useState } from "react";
import { getTotalMinted, getTokenURI, getTreeLocation } from "../helpers/contract";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";

const NFTGallery = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFTs() {
      setLoading(true);
      try {
        const total = await getTotalMinted();
        const results = [];

        for (let tokenId = 1; tokenId <= total; tokenId++) {
          try {
            const uri = await getTokenURI(tokenId);
            const base64 = uri.split("base64,")[1];
            const metadata = JSON.parse(atob(base64));
            const location = await getTreeLocation(tokenId);

            results.push({
              tokenId,
              name: metadata.name,
              image: metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
              hasLocation: location?.latitude && location?.longitude,
              latitude: location?.latitude,
              longitude: location?.longitude,
              metadata
            });
          } catch (err) {
            console.warn(`Failed to load Token ID ${tokenId}:`, err);
          }
        }

        setNfts(results);
      } catch (err) {
        console.error("Failed to load NFTs:", err);
      }
      setLoading(false);
    }

    fetchNFTs();
  }, []);

  return (
    <Container className="mt-5">
    <Row className="mb-4">
    <Col>
      <h2 className="text-white text-center">🌳 All Minted Tree NFTs</h2>
    </Col>
    </Row>
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <Row>
          {nfts.map((nft) => (
            <Col key={nft.tokenId} md={3} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Img variant="top" src={nft.image} alt={nft.name} />
                <Card.Body>
                <Card.Title className="text-center w-100">{nft.name}</Card.Title>
                {/* <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => alert(JSON.stringify(nft.metadata, null, 2))}
                  >
                    View Metadata
                  </Button>

                */} 
                  {nft.hasLocation && (
                   <div className="d-flex justify-content-center">
                    <Button
                      variant="success"
                      size="sm"
                      href={`https://www.google.com/maps?q=${nft.latitude},${nft.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                       
                    >
                      View Tree Location
                    </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NFTGallery;
