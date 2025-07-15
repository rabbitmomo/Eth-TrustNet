
import React, { useState } from 'react';
import { ScrollProvider as Provider, useScroll } from '@scroll.io/sdk';

const ScrollComponent = () => {
  const scroll = useScroll();
  const [amount, setAmount] = useState(''); 
  const [recipient, setRecipient] = useState(''); 

  const handleAmountChange = (event) => {
    setAmount(event.target.value); 
  };

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value); 
  };

  const sendTransaction = async () => {
    if (!recipient || !amount) {
      console.error('Recipient address and amount are required!');
      return;
    }

    try {
      const txHash = await scroll.sendTransaction({
        to: recipient,
        value: scroll.utils.parseEther(amount), // Convert amount to Wei
      });
      console.log('Transaction Hash:', txHash);
    } catch (error) {
      console.error('Transaction Failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={handleRecipientChange} 
        style={{ marginRight: '10px', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Amount (in ETH)"
        value={amount}
        onChange={handleAmountChange}
        style={{ marginRight: '10px', marginBottom: '10px' }}
      />
      <button onClick={sendTransaction}>Send Transaction</button>
    </div>
  );
};

// Main application component wrapped with ScrollProvider
const ScrollProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};

// Exporting the ScrollProvider and ScrollComponent
export { ScrollProvider, ScrollComponent };
