// src/Verify.js

import React from "react";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import { Box, Button, Typography, Stack } from "@mui/material";

const Verify = () => {
  const handleVerify = async (proof) => {
    console.log("Verification proof received:", proof);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });

    if (!res.ok) {
      throw new Error("Verification failed");
    }

    const data = await res.json();
    console.log("Server response:", data);
  };

  const onSuccess = () => {
    console.log("Verification successful, redirecting...");
    window.location.href = "/success"; 
  };

  return (
    <Box>
      <Stack spacing={4}>
      <Box sx={{gap:1,display:"flex",flexWrap:"wrap",justifyContent:{xs:"center",md:"start"} }}> 

      
      <Typography variant="h3" fontWeight="bold">

        Welcome to
      </Typography>
      <Typography color="primary.contrastText" variant="h3" fontWeight="bold">

Eth TrustNet
</Typography>
</Box>
<Box sx={{display:"flex", justifyContent:{xs:"center",md:"start"}}}>


      <IDKitWidget
        app_id="app_staging_76ca67c719dfdb2d97f4ad4e65ec0561" // Your App ID
        action="verification" // Your Action ID
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={VerificationLevel.Stage}
        enable_mock_mode={true} // Enable mock mode for development
      >
        {({ open }) => <Button onClick={open}>Verify with World ID</Button>}
      </IDKitWidget></Box></Stack>
    </Box>
  );
};

export default Verify;
