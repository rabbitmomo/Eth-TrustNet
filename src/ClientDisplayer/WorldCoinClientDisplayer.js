import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import DisplayFromWorldCoinData from "../DisplayerData/DisplayFromWorldCoinData";
import DisplayToWorldCoinData from "../DisplayerData/DisplayToWorldCoinData";
import { Box, Stack } from "@mui/material";

const ClientDisplayer = ({ client }) => {
  return (
    <ApolloProvider client={client}>
      <Box sx={{ p: "20px", pl:"32px" }}>
        <Stack spacing={8}>
        <DisplayFromWorldCoinData />
        <DisplayToWorldCoinData /></Stack>  
      </Box>
    </ApolloProvider>
  );
};

export default ClientDisplayer;
