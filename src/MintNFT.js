import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./config";

const MintNFT = () => {
  const [address, setAddress] = useState("");
  const [metadata, setMetadata] = useState("");
  const [message, setMessage] = useState("");

  const handleMint = async (event) => {
    event.preventDefault();

    if (!window.ethereum) {
      setMessage("Please install Metamask to mint an NFT");
      return;
    }

    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // connect to a provider
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the signer
      const signer = await provider.getSigner();
      console.log(signer);

      // create a contract instance with the signer
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // await provider.send("eth_requestAccounts", []);

      // await signer.sendTransaction();
      const transaction = await contract.safeMint(address, metadata);
      await transaction.wait();

      setMessage("NFT minted successfully");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Mint Free PFPs</h2>
      <form onSubmit={handleMint}>
        <div className="address_field">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="metadata_field">
          <label>Metadata:</label>
          <input
            type="text"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            required
          />
        </div>
        <button type="submit">Mint NFT</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MintNFT;
