import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../abi/Seeds2TreesNFTs.json"; // Update path as needed

const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // Replace with your actual contract address

const UpdateImageBaseURI = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentBaseURI, setCurrentBaseURI] = useState("");
  const [newBaseURI, setNewBaseURI] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadContract = async () => {
      if (window.ethereum) {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        const signer = prov.getSigner();
        const c = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
        setProvider(prov);
        setContract(c);

        try {
          const current = await c.imageBaseURI();
          setCurrentBaseURI(current);
        } catch (err) {
          console.error("Failed to fetch current imageBaseURI", err);
        }
      }
    };

    loadContract();
  }, []);

  const handleUpdate = async () => {
    if (!newBaseURI || !contract) return;

    try {
      const tx = await contract.setImageBaseURI(newBaseURI);
      setStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ imageBaseURI updated successfully!");
      setCurrentBaseURI(newBaseURI);
      setNewBaseURI("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Error updating imageBaseURI.");
    }
  };

  return (
    <div className="admin-section border p-4 mt-6 rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">Update Image Base URI</h2>
      <p className="text-sm mb-1">Current base URI:</p>
      <code className="block bg-gray-100 p-2 mb-3 rounded text-sm break-all">{currentBaseURI}</code>

      <input
        type="text"
        placeholder="Enter new IPFS base URI"
        value={newBaseURI}
        onChange={(e) => setNewBaseURI(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Update URI
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
};

export default UpdateImageBaseURI;
