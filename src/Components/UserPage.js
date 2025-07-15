// src/UserPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WorldCoinClientDisplayer from "../ClientDisplayer/WorldCoinClientDisplayer";
import Chatbot from "./Chatbot";
import { worldCoinClient } from "../client";
import AddressInput from "./AddressInput";
import UserDetails from "./UserDetails";
import { Box, Grid } from "@mui/material";
import AssetManagementButtons from "./AssetManagement";

const UserPage = () => {
  const { userAddress } = useParams();
  const [addressInput, setAddressInput] = useState(userAddress || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (userAddress) {
      setAddressInput(userAddress);
    }
  }, [userAddress]);

  const handleAddressChange = (address) => {
    if (address) {
      // If address is not empty
      navigate(`/${address}`); // Navigate to the new URL with userAddress
    } else {
      navigate("/"); // Navigate back to the main page if the address is empty
    }
    setAddressInput(address);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: "5%",
        bgcolor: "dark.light",
      }}
    >
      <Grid container>
        <Grid items xs={12} lg={8}>
          {/* Address input field using AddressInput component */}
          <AddressInput
            addressInput={addressInput}
            setAddressInput={setAddressInput}
            handleAddressChange={handleAddressChange}
          />

          {/* Display WorldCoinClientDisplayer by default */}
          <WorldCoinClientDisplayer
            client={worldCoinClient}
            handleAddressChange={handleAddressChange}
            userAddress={addressInput}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box>
            <UserDetails userAddress={addressInput} client={worldCoinClient} />
            {/* <AssetManagementButtons />{" "} */}
          </Box>
          <Chatbot />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPage;
