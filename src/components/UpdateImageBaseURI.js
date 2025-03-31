import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Form, Card, Button, Alert } from "react-bootstrap";
import contractAbi from "../abis/Seeds2TreesNFTs.json"; // Update path as needed

const CONTRACT_ADDRESS="0x8ba2b3700b797378B2696060089afCeF20791087"; // Replace with your actual contract address

const UpdateImageBaseURI = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentBaseURI, setCurrentBaseURI] = useState("");
  const [newBaseURI, setNewBaseURI] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadContract = async () => {
      if (window.ethereum) {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        const signer = prov.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
        setProvider(provider);
        setContract(contract);

      }
    }

    loadContract();
  }, []) ;

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    if (!newBaseURI || !contract) return

    try {
 await contract.imageBaseURI();
  setCurrentBaseURI(currentBaseURI);
} catch (err) {
  console.error("Failed to fetch current imageBaseURI", err);
};

    try {
      const tx = await contract.setNewImageBaseURI(newBaseURI);
      setStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ imageBaseURI updated successfully!");
      setCurrentBaseURI(newBaseURI);
      setNewBaseURI("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Error updating imageBaseURI.");
    }
    setLoading(false);
  };

  return (
    <Card className="shadow">
    <Card.Body>
      <Card.Title>Update Image Base URI</Card.Title>
      <Form onUpdate={handleUpdate} className="mt-3">
          <Form.Group controlId="formNewBaseURI">
            <Form.Label>Enter the new IPFS image base URI to change nft images.</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter new image base uri"
        value={newBaseURI}
        onChange={(e) => setNewBaseURI(e.target.value)}
        required 
      />
          </Form.Group>
          <Button 
          variant="warning"
          type="update"
          className="mt-3"
          disabled={loading || !newBaseURI}
          >
        {loading ? "Updating..." : "Update Image Base URI"}   
                </Button>
                </Form>
                {status && (
                  <Alert variant={status.startsWith("✅") ? "success" : "danger"} className="mt-3">
                    {status}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          );
        };

export default UpdateImageBaseURI;
