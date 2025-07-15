// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { worldCoinClient } from "./client"; 
import Header from "./Components/Header"; 
import TotalValueWithProvider from "./DisplayerData/totalValueWithProvider";
import MainPage from "./Components/MainPage"; 
import UserPage from "./Components/UserPage"; 
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme";
import { ApolloProvider } from "@apollo/client";

const clients = [
  {
    name: "WorldCoin",
    client: null,
    subClients: [{ name: "WorldCoin", client: worldCoinClient }],
  },
];
const mode = "light";
const theme = getTheme(mode);

const App = () => {
  return (
    <ApolloProvider client={worldCoinClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/mainpage" element={<MainPage />} />{" "}
            {/* New route for MainPage */}
            <Route path="/:userAddress?" element={<UserPage />} />{" "}
            {/* Route for UserPage */}
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
