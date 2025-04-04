// src/pages/Admin.js
import React from "react";
import UpdateMintPrice from "../components/UpdateMintPrice";
import UpdateTreeLocation from "../components/UpdateTreeLocation";
import WithdrawFunds from "../components/WithdrawFunds";
import { Container } from "react-bootstrap";
import UpdateImageBaseURI from "../components/UpdateImageBaseURI";

const Admin = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-white mb-4">Admin Dashboard</h2>
      <UpdateMintPrice />
      <hr className="my-5" />
      <UpdateTreeLocation />
      <hr className="my-5" />
      <WithdrawFunds />
      <hr className="my-5" />
      <UpdateImageBaseURI />
    </Container>
  );
};

export default Admin;
