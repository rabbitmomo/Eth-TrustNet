import React from "react";
import ConnectWallet from "./ConnectWallet"; // Keep the ConnectWallet component here

import { worldCoinClient } from "../client";
import { Box } from "@mui/material";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ onAddressChange }) => {
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate('/mainpage'); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 3,
        position: "fixed",
        top: 0,
        width: "97%",
        bgcolor: "dark.main",
        zIndex: 1000,
        height: "30px", boxShadow: 2 , 
      }}
    >
      <Box
        component="img"
        src={Logo}
        sx={{
          maxWidth: 120,
          maxHeight: 120,
          cursor:"pointer",
        }}
        onClick={goToMainPage}
      />

      <ConnectWallet onAddressChange={onAddressChange} />
    </Box>
  );
};

export default Header;
