import React, { useState } from 'react';
import { ethers } from 'ethers';

const SendTransaction = () => {
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
      const fakeTxHash = "0x062f76d9483a47ac214a2a381697b653510601c1606c64b42f0c6fcdfa1ccab5"; // Example transaction hash

      // Set the transaction hash to the state
      setTxHash(fakeTxHash);
      setError(''); // Clear any previous errors

      // OPTIONAL: If you were to actually send the transaction on Scroll,
      // you would use the scroll RPC endpoint as follows:
      // const scrollProvider = new ethers.JsonRpcProvider(scrollRpcUrl);
      // const scrollSigner = scrollProvider.getSigner();
      // const tx = await scrollSigner.sendTransaction({
      //   to: address,
      //   value: ethers.parseEther(value),
      // });

      // Note: The above code is commented out because we are simulating a transaction.
      
    } catch (err) {
      console.error(err);
      setError('Transaction failed. Check the console for more details.');
    }
  };

  return (
    <div>
      <h2>Send Transaction</h2>
      <div>
        <label>
          Recipient Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter recipient address"
          />
        </label>
      </div>
      <div>
        <label>
          Amount (ETH):
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount in ETH"
          />
        </label>
      </div>
      <button onClick={sendTransaction}>Send Transaction</button>

      {/* Error handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display transaction hash */}
      {txHash && (
        <p>
          Transaction sent! Hash: 
          <a href={`https://scrollscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            {txHash}
          </a>
        </p>
      )}
    </div>
  );
};

export default SendTransaction;
