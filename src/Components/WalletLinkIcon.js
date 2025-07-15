// src/Verify.js

import React from "react";
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { Box } from "@mui/material";
const WalletLinkIcon = () => {

  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'center', 
        position: 'relative'  
      }}>
        <AccountBalanceWalletRoundedIcon sx={{ 
          width: 20, 
          height: 'auto', 
          color:"primary.main",  position: 'relative' ,  zIndex:1000,
        }}>

<LinkRoundedIcon sx={{
          width: 140, 
          height: 'auto', 
          position: 'absolute', 
          right: 0, 
          color:"primary.main",
          zIndex:1001,

        }}/>
        </AccountBalanceWalletRoundedIcon>
     
      </Box>
  );
};

export default WalletLinkIcon;
