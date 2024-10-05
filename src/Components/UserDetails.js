// src/UserDetails.js

import React from "react";
import TotalValueWithProvider from "../DisplayerData/totalValueWithProvider"; // Import TotalValueWithProvider
import { Box, Typography, Paper, Stack } from "@mui/material";

const UserDetails = ({ userAddress, client }) => {
  return (
    <Paper
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.light",
        flexGrow: 1,
        m: 4,
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Your World ID is:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Husky_In_ETHKL2024
          </Typography>
        </Box>

        <TotalValueWithProvider client={client} />

      </Stack>
    </Paper>
  );
};

export default UserDetails;
