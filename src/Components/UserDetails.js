// src/UserDetails.js

import React from "react";
import TotalValueWithProvider from "../DisplayerData/totalValueWithProvider"; // Import TotalValueWithProvider
import { Box, Typography, Paper, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";

const formatText = (text) => {
  // Check if text is a string and not empty
  if (typeof text === "string" && text.length > 10) {
    return `${text.slice(0, 12)}...${text.slice(-16)}`;
  }
  // Return the original text or a fallback message if it's undefined or too short
  return text || "Every User";
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

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
            All wallet addresses in your World ID are:
          </Typography>
          {/* Address 1 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography  sx={{ color: "light.main" }}>
              {formatText("0x7e83b299c16a2a9ca28534e94fda20980d9a2ad9")}
            </Typography>
            <IconButton
              onClick={() =>
                copyToClipboard("0x7e83b299c16a2a9ca28534e94fda20980d9a2ad9")
              }
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

            {/* Address 2 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ color: "light.main" }}>
              {formatText("0x1ce9656d739351c17d39b0622ed0ceab02cffbd0")}
            </Typography>
            <IconButton
              onClick={() =>
                copyToClipboard("0x1ce9656d739351c17d39b0622ed0ceab02cffbd0")
              }
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>

        <TotalValueWithProvider client={client} />

      </Stack>
    </Paper>
  );
};

export default UserDetails;
