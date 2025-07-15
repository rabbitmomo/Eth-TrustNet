import React, { useState, useEffect } from "react";
import { useQuery, gql, ApolloProvider } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

// Define the GraphQL queries
const GET_TRANSFERS_TO = gql`
  query GetTransfersTo($address: String) {
    transfers(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { to_contains: $address }
    ) {
      value
    }
  }
`;

const GET_TRANSFERS_FROM = gql`
  query GetTransfersFrom($address: String) {
    transfers(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { from_contains: $address }
    ) {
      value
    }
  }
`;

const TotalValue = () => {
  const { userAddress } = useParams(); 

  const {
    loading: loadingTo,
    error: errorTo,
    data: dataTo,
  } = useQuery(GET_TRANSFERS_TO, {
    variables: { address: userAddress || "" }, 
  });

  const {
    loading: loadingFrom,
    error: errorFrom,
    data: dataFrom,
  } = useQuery(GET_TRANSFERS_FROM, {
    variables: { address: userAddress || "" },
  });

  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (dataTo && dataFrom) {
      const totalTo = dataTo.transfers.reduce(
        (acc, transfer) => acc + Number(transfer.value) / 1e18,
        0,
      );
      const totalFrom = dataFrom.transfers.reduce(
        (acc, transfer) => acc + Number(transfer.value) / 1e18,
        0,
      );
      const total = totalTo - totalFrom;
      setTotalValue(total >= 0 ? total.toFixed(2) : 0.0); 
    }
  }, [dataTo, dataFrom]);

  if (loadingTo || loadingFrom) return <Typography>Loading...</Typography>;
  if (errorTo || errorFrom)
    return <Typography color="error.main">Error: {(errorTo || errorFrom).message}</Typography>;

  return (
    <Box>
    <Typography variant="body2" fontWeight="bold">
      Total Value:
    </Typography>
    <Typography variant="h6" fontWeight="bold">
  {totalValue} WLD
    </Typography>
    </Box>
  ); 
};

const TotalValueWithProvider = ({ client }) => (
  <ApolloProvider client={client}>
    <TotalValue />
  </ApolloProvider>
);

export default TotalValueWithProvider;
