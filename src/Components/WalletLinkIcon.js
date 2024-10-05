// src/Verify.js

import React from "react";
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { Box } from "@mui/material";
const WalletLinkIcon = () => {

  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center', // Ensures icons are aligned in the middle vertically
        position: 'relative'  // Necessary for absolute positioning of the second icon
      }}>
        <AccountBalanceWalletRoundedIcon sx={{ 
          width: 20, // Sets width of the first icon
          height: 'auto', // Maintains aspect ratio
          color:"primary.main",  position: 'relative' ,  zIndex:1000,
        }}>

<LinkRoundedIcon sx={{
          width: 140, // Sets the desired width for the link icon
          height: 'auto', // Maintains aspect ratio
          position: 'absolute', // Position relative to nearest positioned ancestor (Box)
          right: 0, // Places the icon at the right edge of the Box
          color:"primary.main",
          zIndex:1001,

        }}/>
        </AccountBalanceWalletRoundedIcon>
     
      </Box>
  );
};

export default WalletLinkIcon;
