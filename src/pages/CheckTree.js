// src/pages/CheckTree.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../abis/Seeds2TreesNFTs.json"; 
import { getTokenURI } from "../helpers/contract";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

const CONTRACT_ADDRESS = "0x8ba2b3700b797378B2696060089afCeF20791087"; 

const CheckTree = ({ account }) => {
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [inputId, setInputId] = useState("");
  const [treeStatus, setTreeStatus] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const loadNFTs = async () => {
      if (!account || typeof window.ethereum === "undefined") return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

        const balance = await contract.balanceOf(account);
        const nfts = [];

        for (let i = 0; i < balance; i++) {
          try { const tokenId = await contract.tokenOfOwnerByIndex(account, i);
            const uri = await getTokenURI(tokenId);
            const base64 = uri.split("base64,")[1];
            const metadata = JSON.parse(atob(base64));
            //const tokenURI = await contract.tokenURI(tokenId);
            //const response = await fetch(tokenURI);
            //const metadata = await response.json();
  
            nfts.push({
              tokenId,
              image: metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
  
            });
        } catch (err) {
            console.warn(`Failed to load TokenID ${tokenId}:` err)
        }  
         
        }

        setOwnedNFTs(nfts);
      } catch (err) {
        console.error("Error loading owned NFTs:", err);
      }
    };

    loadNFTs();
  }, [account]);

  const handleCheckTree = async () => {
    if (!inputId) return;
    setChecking(true);
    setTreeStatus(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
      const planted = await contract.isPlanted(inputId);
      setTreeStatus(planted ? "Planted 🌳" : "Not planted yet 🌱");
    } catch (err) {
      console.error("Error checking tree:", err);
      setTreeStatus("Invalid token ID or not found.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Trees</h2>

      {/* 🔍 Input to check specific NFT */}
      <Form className="mb-5 d-flex flex-column flex-sm-row align-items-center gap-2">
        <Form.Control
          type="number"
          placeholder="Enter Token ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button onClick={handleCheckTree} variant="success">
          Check Planting Status
        </Button>
      </Form>

      {checking && <Spinner animation="border" />}

      {treeStatus && (
        <p className="text-info fs-5">
          Token #{inputId}: {treeStatus}
        </p>
      )}

      {/* 🌱 Show user's NFTs visually */}
      <Row className="mt-4">
        {ownedNFTs.length === 0 ? (
          <p>You don't own any NFTs yet.</p>
        ) : (
          ownedNFTs.map((nft) => (
            <Col key={nft.tokenId} md={3} className="mb-3">
              <Card>
                <Card.Img variant="top" src={nft.image} />
                <Card.Body>
                  <Card.Text>Tree #{nft.tokenId}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CheckTree;