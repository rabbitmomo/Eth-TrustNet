import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Creates an Apollo Client instance with the specified subgraph URL.
 *
 * @param {string} uri - The GraphQL endpoint for the subgraph.
 * @returns {ApolloClient} - An Apollo Client instance configured with the provided URI.
 */
const createClient = (uri) => {
  return new ApolloClient({
    uri: uri, 
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer c36d6492666df88ccbe914c1634c723d`, 
    },
  });
};

// // Export specific clients for each subgraph

//Dexs
const uniswapClient = createClient(
  "https://api.studio.thegraph.com/query/89619/dexs-uniswap-subgraph/version/latest",
); 

//NFTS martketplace
const zoraClient = createClient(
  "https://api.studio.thegraph.com/query/89619/nftmarketplace-zora-subgraph/version/latest",
); // Replace with your zora subgraph URL
const raribleClient = createClient(
  "https://api.studio.thegraph.com/query/89619/nftm-rarible-subgraph/version/latest",
); // Replace with your zora subgraph URL

//WorldCoin
const worldCoinClient = createClient(
  "https://api.studio.thegraph.com/query/89619/worldcoin-transaction-tracker/version/latest",
); // Replace with your zora subgraph URL

export { zoraClient, uniswapClient, raribleClient, worldCoinClient };
