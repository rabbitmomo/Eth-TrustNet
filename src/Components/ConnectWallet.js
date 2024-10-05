import React, { useState } from "react";
import { BrowserProvider } from "ethers"; // Correct import from ethers v6
import { Box, Button, Typography } from "@mui/material";
import WalletLinkIcon from "./WalletLinkIcon";

const ConnectWallet = ({ onAddressChange }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create an ethers provider
        const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider for newer ethers.js versions
        const signer = await provider.getSigner();

        // Get the user's Ethereum address
        const address = await signer.getAddress();
        setWalletAddress(address);

        // Callback to pass address to the parent component
        if (onAddressChange) {
          onAddressChange(address);
        }
      } catch (error) {
        console.error("Error connecting to wallet: ", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      {walletAddress ? (
        <Box sx={{display:"flex", gap:1}}>
        <Typography variant="body2">Wallet Address:</Typography>
        <Typography variant="body2">{walletAddress}</Typography>
</Box>
      ) : (
        <>
                <Button onClick={connectWallet} >Connect Wallet</Button>

                </>
      )}
    </Box>
  );
};

export default ConnectWallet;
