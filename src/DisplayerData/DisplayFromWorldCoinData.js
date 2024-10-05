import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Import copy icon if needed

// Define your GraphQL query
const GET_TRANSFERS = gql`
  query GetTransfers($address: String) {
    transfers(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { from_contains: $address }
    ) {
      transactionHash
      from
      to
      value
      blockTimestamp
    }
  }
`;

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Assuming the timestamp is in seconds
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const dateOptions = { month: "numeric", day: "numeric", year: "numeric" };
  const timeString = date.toLocaleString("en-US", timeOptions);
  const dateString = date.toLocaleString("en-US", dateOptions);
  return `${timeString}, ${dateString}`;
};

const formatText = (text) => {
  // Check if text is a string and not empty
  if (typeof text === "string" && text.length > 10) {
    return `${text.slice(0, 4)}...${text.slice(-8)}`;
  }
  // Return the original text or a fallback message if it's undefined or too short
  return text || "Every User";
};

const formatValue = (value) => {
  const etherValue = Number(value) / 1e18; // Convert Wei to Ether
  return etherValue > 0
    ? etherValue.toFixed(2) // Format to 2 decimal places
    : value.toFixed(2); // Return the original value formatted
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url); // Clean up the URL object
};

const DisplayTransferData = ({
  transfers,
  currentPage,
  setCurrentPage,
  maxTransfers,
  totalValue,
  userAddress,
}) => {
  const transfersPerPage = 5;
  const totalPages = Math.ceil(transfers.length / transfersPerPage);


  const getCurrentTransfers = (page) => {
    const uniqueHashes = new Set();
    const uniqueTransfers = transfers.filter(transfer => {
      const isUnique = !uniqueHashes.has(transfer.transactionHash);
      uniqueHashes.add(transfer.transactionHash);
      return isUnique;
    });
  
    const startIndex = (page - 1) * transfersPerPage;
    const endIndex = startIndex + transfersPerPage;
    return uniqueTransfers.slice(startIndex, endIndex);
  };

  const currentTransfers = getCurrentTransfers(currentPage);

  // Debugging information
  console.log("Current Page:", currentPage);
  console.log("Current Transfers:", currentTransfers);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getCurrentTransfers(newPage); // Update current transfers when page changes
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems:{xs:"start",lg:"center"},
          flexDirection:{xs:"column",lg:"row"},
          gap:{xs:0,lg:2},
          mb:1,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Worldcoin Transaction: From {formatText(userAddress)}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          Total: {totalValue} WLD
        </Typography>
        {/* Display total value to the right */}
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
         <TableCell sx={{color:"light.main"}}>ID</TableCell>
         <TableCell sx={{color:"light.main"}}>Transaction Hash</TableCell>
         <TableCell sx={{color:"light.main"}}>From</TableCell>
         <TableCell sx={{color:"light.main"}}>To</TableCell>
         <TableCell sx={{color:"light.main"}}>Value</TableCell>
         <TableCell sx={{color:"light.main", textAlign:"end"}}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransfers.map((transfer, index) => {
              const id = (currentPage - 1) * transfersPerPage + index + 1;
              return (
                <TableRow key={transfer.transactionHash}>
             <TableCell sx={{color:"light.main"}}>{id}</TableCell>
             <TableCell sx={{color:"light.main"}}>
                    {formatText(transfer.transactionHash)}
                    <IconButton
                      onClick={() => copyToClipboard(transfer.transactionHash)}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </TableCell>
             <TableCell sx={{color:"light.main"}}>
                    {formatText(transfer.from)}
                    <IconButton onClick={() => copyToClipboard(transfer.from)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </TableCell>
             <TableCell sx={{color:"light.main"}}>
                    {formatText(transfer.to)}
                    <IconButton onClick={() => copyToClipboard(transfer.to)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </TableCell>
             <TableCell sx={{color:"light.main"}}>
                    {formatValue(transfer.value)}
                  </TableCell>
             <TableCell sx={{color:"light.main", textAlign:"end"}} >
                    {formatTimestamp(transfer.blockTimestamp)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            sx={{
              color: currentPage === 1 ? "secondary.main" : "primary.main",
            }}
          >
            <SkipPreviousRoundedIcon />
          </IconButton>
          <Typography sx={{ m: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <IconButton
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages || transfers.length === 0}
            sx={{
              color:
                currentPage === totalPages || transfers.length === 0
                  ? "secondary.main"
                  : "primary.main",
            }}
          >
            <SkipNextRoundedIcon />
          </IconButton>
        </Box>
        <Button
          startIcon={<FileDownloadRoundedIcon />}
          onClick={() => downloadJSON(transfers)}
          sx={{ ml: "10%", mt: 0,display:{xs:"none",sm:"flex"} }}
        >
          Download as JSON
        </Button>
        <Button
          onClick={() => downloadJSON(transfers)}
          sx={{ ml: "10%", mt: 0,display:{xs:"flex",sm:"none"} }}
        >
<FileDownloadRoundedIcon />    
    </Button>
      </Box>
    </div>
  );
};

const DisplayFromWorldCoinData = () => {
  const { userAddress } = useParams(); // Get userAddress from URL
  const { loading, error, data } = useQuery(GET_TRANSFERS, {
    variables: { address: userAddress || "" }, // Use the userAddress if provided, otherwise an empty string
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (data && data.transfers) {
      const total = data.transfers.reduce(
        (acc, transfer) => acc + Number(transfer.value) / 1e18,
        0,
      ); // Calculate total in ETH
      setTotalValue(total.toFixed(2)); // Update total value in state
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transfers = data.transfers.slice(0, 100); // Limit to a maximum of 100 transfers

  return (
    <DisplayTransferData
      transfers={transfers}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      maxTransfers={transfers.length}
      totalValue={totalValue} // Pass total value to DisplayTransferData component
      userAddress={userAddress}
    />
  );
};

export default DisplayFromWorldCoinData;
