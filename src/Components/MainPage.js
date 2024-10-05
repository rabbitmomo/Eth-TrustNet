// src/MainPage.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Verify from "./Verify"; // Import the Verify component
import { Box, Button, Grid, Stack } from "@mui/material";
import Logo from "../assets/logo-icon.png";
import bg from "../assets/bg-star.gif";

const MainPage = () => {
  const navigate = useNavigate();
  const goToUserPage = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        // bgcolor: "dark.light",

        backgroundImage: `url(${bg})`,
        backgroundSize: "cover", // Ensures the image covers the entire box
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the image in the box
      }}
    >
      <Grid container>
        <Grid
          items
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "start" },
            justifyContent: "center",
            pl: { xs: 0, md: 8 },

            order: { xs: 2, md: 1 },
          }}
        >
          <Stack spacing={2}>
            <Verify /> {/* Include the Verify component */}
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "center", md: "start" },
                justifyContent: { xs: "center", md: "start" },
              }}
            >
              <Link to="/">
                <Button>Enter Demo without Verification</Button>
              </Link>
            </Box>
          </Stack>
        </Grid>

        <Grid
          items
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            order: { xs: 1, md: 2 },
          }}
        >
          <Box
            component="img"
            src={Logo}
            onClick={goToUserPage}
            alt="Bouncing GIF"
            sx={{
              cursor: "pointer",
              mt: { xs: 8, md: 0 },
              animation: "bounce 2s infinite",
              "@keyframes bounce": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },
                "50%": {
                  transform: "translateY(-20px)",
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
