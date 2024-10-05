// src/components/AssetManagementButtons.js

import React, { useState } from "react";
import { Grid, Button, TextField, Typography, Paper,Box } from "@mui/material";
import { ethers } from "ethers";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import PinchRoundedIcon from '@mui/icons-material/PinchRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';

const AssetManagementButtons = () => {
  const [address, setAddress] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  // Define the Scroll RPC endpoint
  const scrollRpcUrl = "https://rpc.scroll.io"; // Example Scroll RPC endpoint

  const sendTransaction = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed!');
      return;
    }

    try {
      // Request MetaMask to connect the wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create a provider using the BrowserProvider
      const provider = new ethers.BrowserProvider(window.ethereum); 
      const signer = await provider.getSigner(); 

      // Check wallet balance using the provider
      const balance = await provider.getBalance(await signer.getAddress()); 
      const ethBalance = ethers.formatEther(balance); // Use ethers.formatEther to format balance
      console.log(`Your balance: ${ethBalance} ETH`);

      // Simulate a successful transaction instead of executing one
      const example = "0x062f76d9483a47ac214a2a381697b653510601c1606c64b42f0c6fcdfa1ccab5"; // Example transaction hash

      // Set the transaction hash to the state
      setTxHash(example);
      setError(''); // Clear any previous errors

    } catch (err) {
      console.error(err);
      setError('Transaction failed. Check the console for more details.');
    }
  };

  // Button click handlers
  const handleStake = () => {
    alert("Staking functionality is not implemented yet.");
  };

  const handleSwap = () => {
    alert("Swapping functionality is not implemented yet.");
  };

  const handleReceive = () => {
    alert("Receiving functionality is not implemented yet.");
  };

  const buttons = [
    { text: 'Receive', onClick: handleReceive,icon:<CallReceivedRoundedIcon/> },
    { text: 'Stake', onClick: handleStake,icon:<AutoGraphRoundedIcon/> },
    { text: 'Swap', onClick: handleSwap,icon:<CurrencyExchangeRoundedIcon/> },
    { text: 'More', onClick: () => {},icon:<PinchRoundedIcon/> } 
  ];

  return (
    <Paper    sx={{
      p: 4,
      display: "flex",
      flexDirection: "column",
      bgcolor: "#202020",
      flexGrow: 1,
      boxShadow:3,
      m: 4,
    }}>
       <TextField
            label="Recipient Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: 2,
              color: 'white', 
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                }
              },
              '& .MuiInputLabel-root': {
                color: 'white'
              },
              '& .MuiInputBase-input': { 
                color: 'white' 
              }
            }}
          />
          <TextField
            label="Amount (ETH)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: 2,
              color: 'white', 
              '& .MuiOutlinedInput-root': {
                color: 'white', 
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                }
              },
              '& .MuiInputLabel-root': { 
                color: 'white'
              },
              '& .MuiInputBase-input': { 
                color: 'white'
              }
            }}
          />


          <Button
            variant="contained"
            startIcon={<SendRoundedIcon/>}
            onClick={sendTransaction}
            size="large"
            fullWidth
            sx={{  mb: 2 }}
          >
            Send Transaction
          </Button>
          <Grid container spacing={2}>
     
    {buttons.map((button, index) => (
        <Grid item xs={3} key={index}>
          <Button
                   

            variant="contained"
            size="small"
            onClick={button.onClick}
            fullWidth
            sx={{py:2,px:1,  height: '100%'}}
          >
            <Box sx={{display:"flex", flexDirection:"column",gap:1, alignItems:"center"}}>
            {button.icon}
            
            {button.text}
            </Box>
          </Button>
        </Grid>
      ))}

</Grid>
    

        {/* Error handling */}
        {error && (
        
            <Typography variant="body2" color="error.main" sx={{ marginTop: 1, padding: 1 }}>
              {error}
            </Typography>
        
        )}

        {/* Display transaction hash */}
        {txHash && (
  
            <Typography 
              variant="body2" 
              sx={{ 
                marginTop: 1, 
                padding: 1, 
                border: '1px solid #ccc', 
                borderRadius: 1, 
                color: 'black', 
                fontSize: '0.75rem',  // Make the font size smaller
                lineHeight: '1.2', // Adjust line height for better spacing
              }}
            >
              <span style={{ color: 'black' }}>Transaction sent! Hash:</span>
              <a 
                href={`https://scrollscan.com/tx/${txHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  marginLeft: '4px', 
                  color: '#3f51b5', 
                  textDecoration: 'underline', 
                  wordBreak: 'break-all' // Allows long links to wrap
                }}
              >
                {txHash}
              </a>
              <span style={{ color: 'black', marginLeft: '10px' }}> | </span>
              <a 
                href={`https://pacific-explorer.manta.network/tx/0x963774bcac006f64dcda53ba7d6309ce86f921cbbde7ea63d617d7e7dac364ba`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  marginLeft: '4px', 
                  color: '#3f51b5', 
                  textDecoration: 'underline', 
                  wordBreak: 'break-all' // Allows long links to wrap
                }}
              >
                Manta Explorer
              </a>
            </Typography>
        
        )}
    
    </Paper>
  );
};

export default AssetManagementButtons;
