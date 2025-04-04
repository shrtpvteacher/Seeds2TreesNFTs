// src/pages/MyNFTPage.js
import React from "react";
import { Container } from "react-bootstrap";
import MyOwnedTrees from "../components/MyOwnedTrees";
import CheckTreeStatus from "../components/CheckTreeStatus";

const MyNFTPage = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">My NFT Dashboard</h2>
      <CheckTreeStatus />
      <MyOwnedTrees />
    </Container>
  );
};

export default MyNFTPage;
