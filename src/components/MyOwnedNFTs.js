// src/components/MyOwnedTrees.js
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { getProviderAndSigner, getTokenMetadata } from "../helpers/contract";
import contractABI from "../abis/Seeds2TreesNFTs.json";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x8ba2b3700b797378B2696060089afCeF20791087";

const MyOwnedNFTs = () => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    async function fetchNFTs() {
      setLoading(true);
      try {
        
        const { provider, address } = await getProviderAndSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
        const balance = await contract.balanceOf(address);
        const results = [];

        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, i);
          const metadata = await getTokenMetadata(tokenId);

          results.push({
            tokenId,
            image: metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
          });
        }

        setOwnedNFTs(results);
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      }
      setLoading(false);
    }

    fetchNFTs();
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (ownedNFTs.length === 0) {
    return <p>You don't own any NFTs yet.</p>;
  }

  return (
    <Row className="mt-4">
      {ownedNFTs.map((nft) => (
        <Col key={nft.tokenId} md={3} className="mb-3">
          <Card>
            <Card.Img variant="top" src={nft.image} />
            <Card.Body>
              <Card.Text>Tree #{nft.tokenId}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MyOwnedNFTs;
