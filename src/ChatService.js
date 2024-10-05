import axios from "axios";
import { useQuery, gql } from "@apollo/client";

// Access the API key from the environment variables
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// GraphQL query to get the latest 5 transactions from an address
const GET_LATEST_5_TRANSFERS = gql`
  query GetLatestTransfers($address: String) {
    transfers(
      first: 5
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

// GraphQL query to get the oldest 5 transactions by timestamp
const GET_OLDEST_5_TRANSFERS = gql`
  query GetOldestTransfers($address: String) {
    transfers(
      first: 5
      orderBy: blockTimestamp
      orderDirection: asc
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

// GraphQL query to get the biggest 5 transactions by value
const GET_BIGGEST_5_TRANSFERS = gql`
  query GetBiggestTransfers($address: String) {
    transfers(
      first: 5
      orderBy: value
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

// GraphQL query to get the smallest 5 transactions by value
const GET_SMALLEST_5_TRANSFERS = gql`
  query GetSmallestTransfers($address: String) {
    transfers(
      first: 5
      orderBy: value
      orderDirection: asc
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

// Function to extract the user address from the URL
const getUserAddressFromURL = () => {
  const path = window.location.pathname; // Get the URL path
  const address = path.substring(1); // Remove the leading "/"

  // Validate that the address is in the correct Ethereum address format
  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
  if (isValidAddress) {
    return address;
  } else {
    console.error("Invalid Ethereum address in URL:", address);
    return null;
  }
};

// Helper function to fetch the latest 5 transactions
const getLatestTransactions = async (client, address) => {
  const { loading, error, data } = await client.query({
    query: GET_LATEST_5_TRANSFERS,
    variables: { address },
  });

  if (loading) return "Loading latest transactions...";
  if (error) return "Error fetching transactions: " + error.message;

  // Format transactions
  return data.transfers.map((transfer) => ({
    transactionHash: transfer.transactionHash,
    from: transfer.from,
    to: transfer.to,
    value: (Number(transfer.value) / 1e18).toFixed(2), // Convert from Wei to ETH
    blockTimestamp: new Date(transfer.blockTimestamp * 1000).toLocaleString(), // Format timestamp
  }));
};

// Helper function to fetch the oldest 5 transactions
const getOldestTransactions = async (client, address) => {
  const { loading, error, data } = await client.query({
    query: GET_OLDEST_5_TRANSFERS,
    variables: { address },
  });

  if (loading) return "Loading oldest transactions...";
  if (error) return "Error fetching transactions: " + error.message;

  // Format transactions
  return data.transfers.map((transfer) => ({
    transactionHash: transfer.transactionHash,
    from: transfer.from,
    to: transfer.to,
    value: (Number(transfer.value) / 1e18).toFixed(2), // Convert from Wei to ETH
    blockTimestamp: new Date(transfer.blockTimestamp * 1000).toLocaleString(), // Format timestamp
  }));
};

// Helper function to fetch the biggest 5 transactions
const getBiggestTransactions = async (client, address) => {
  const { loading, error, data } = await client.query({
    query: GET_BIGGEST_5_TRANSFERS,
    variables: { address },
  });

  if (loading) return "Loading biggest transactions...";
  if (error) return "Error fetching transactions: " + error.message;

  // Format transactions
  return data.transfers.map((transfer) => ({
    transactionHash: transfer.transactionHash,
    from: transfer.from,
    to: transfer.to,
    value: (Number(transfer.value) / 1e18).toFixed(2), // Convert from Wei to ETH
    blockTimestamp: new Date(transfer.blockTimestamp * 1000).toLocaleString(), // Format timestamp
  }));
};

// Helper function to fetch the smallest 5 transactions
const getSmallestTransactions = async (client, address) => {
  const { loading, error, data } = await client.query({
    query: GET_SMALLEST_5_TRANSFERS,
    variables: { address },
  });

  if (loading) return "Loading smallest transactions...";
  if (error) return "Error fetching transactions: " + error.message;

  // Format transactions
  return data.transfers.map((transfer) => ({
    transactionHash: transfer.transactionHash,
    from: transfer.from,
    to: transfer.to,
    value: (Number(transfer.value) / 1e18).toFixed(2), // Convert from Wei to ETH
    blockTimestamp: new Date(transfer.blockTimestamp * 1000).toLocaleString(), // Format timestamp
  }));
};

// Function to check and correct typos in the user's message
const correctTypos = async (text) => {
  const correctionAPIUrl = "https://api.openai.com/v1/completions";
  const typoCheckPayload = {
    model: "gpt-3.5-turbo",  
    prompt: `Correct any typos in this sentence: "${text}". If there are no typos, return the original sentence.`,
    max_tokens: 60,
    temperature: 0.2,
  };

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(correctionAPIUrl, typoCheckPayload, { headers });
    const correctedText = response.data.choices[0].text.trim();
    
    // Return either corrected sentence or original sentence
    return correctedText;
  } catch (error) {
    console.error("Error correcting typos:", error);
    return text; // Fallback to original text if typo correction fails
  }
};

// Main function to output the corrected or original sentence
export const processUserMessage = async (message) => {
  // Call the typo correction function
  const correctedMessage = await correctTypos(message);

  // Return the corrected message if different from the original, otherwise return the original
  if (correctedMessage !== message) {
    return correctedMessage;  // Return corrected sentence
  } else {
    return message;  // Return original sentence if no correction is needed
  }
};

// Main function to process user messages and return the correct response
export const sendMessageToGPT = async (message, client) => {
  // Get the user's Ethereum address from the URL
  const userAddress = getUserAddressFromURL();

  if (!userAddress) {
    return "The Ethereum address provided in the URL is invalid.";
  }

  // Call the typo correction function
  const correctedMessage = await correctTypos(message);

  // Check if the corrected message is requesting transaction data
  if (correctedMessage.toLowerCase().includes("latest transaction")) {
    const transactions = await getLatestTransactions(client, userAddress);
    return formatTransactions(transactions, "Latest Transactions");
  }

  if (correctedMessage.toLowerCase().includes("biggest transaction")) {
    const transactions = await getBiggestTransactions(client, userAddress);
    return formatTransactions(transactions, "Biggest Transactions");
  }

  if (correctedMessage.toLowerCase().includes("smallest transaction")) {
    const transactions = await getSmallestTransactions(client, userAddress);
    return formatTransactions(transactions, "Smallest Transactions");
  }

  if (correctedMessage.toLowerCase().includes("oldest transaction")) {
    const transactions = await getOldestTransactions(client, userAddress);
    return formatTransactions(transactions, "Oldest Transactions");
  }

  // If the message is not asking about balance or transactions, send it to GPT
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a Web 3 professional with expertise in blockchain technology, decentralized applications (dApps), smart contracts, and cryptocurrency. Provide informative and insightful responses to user questions.",
      },
      {
        role: "user",
        content: correctedMessage, // Send the corrected message to GPT
      },
    ],
    max_tokens: 100, // Adjust token limit as necessary
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, data, { headers });
    const gptResponse = response.data.choices[0].message.content.trim();
    return gptResponse; // Return GPT response
  } catch (error) {
    console.error("Error sending message to GPT:", error);
    return "Error processing your request. Please try again.";
  }
};

const formatTransactions = (transactions, title) => {
  let formattedOutput = `<h4 style="text-decoration: underline;"><strong>${title}</strong><h4><br/><ul>`;

  transactions.forEach((tx, index) => {
    formattedOutput += `
      <li>
<div style="display: flex; align-items: start; flex-direction: column;">
<h5 style="margin: 0; padding-right: 8px;">Transaction Hash:</h5>
<div style="word-break: break-all;">
<a href="https://etherscan.io/tx/${tx.transactionHash}" 
   style="text-decoration: underline; cursor: pointer;" 
   target="_blank" rel="noopener noreferrer">
  <h5 style="margin: 0; color: skyblue;"><strong>${tx.transactionHash}</strong></h5>
</a>
</div>

</div>

<div style="display: flex; align-items: start; flex-direction: column;">
<h5 style="margin: 0;">From:</h5>
<h5 style="margin: 0;word-break: break-all;"><strong>${tx.from}</strong></h5>

   </div>
   <div style="display: flex; align-items: start; flex-direction: column;">
<h5 style="margin: 0;">To: </h5>
<h5 style="margin: 0;word-break: break-all;"><strong>${tx.to}</strong></h5>

   </div>

             
        <div style="display: flex; align-items: start; flex-direction: row;">
<h5 style="margin: 0;"><strong>Value: ${tx.value}</strong></h5>

   </div>

        <div style="display: flex; align-items: start; flex-direction: row;">
<h5 style="margin: 0;"><strong>Timestamp: ${tx.blockTimestamp}</strong></h5>

   </div>
          ${index === transactions.length - 1 ? "<br/>" : "<br/><br/>"}

      </li>`;
  });

  formattedOutput += "</ul>";
  return formattedOutput;
};
