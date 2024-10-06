import React, { useState, useRef, useEffect } from "react";
import { useApolloClient } from "@apollo/client"; // Import useApolloClient hook
import { sendMessageToGPT } from "../ChatService"; // Import the ChatService function
import { Box, Button, InputBase, Typography, Paper } from "@mui/material";
import ChatIcon from "../assets/chat-icon.png";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";

const Chatbot = () => {
  const client = useApolloClient(); // Retrieve the Apollo client instance
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const inputRef = useRef(null); // Create a ref for the input field

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { sender: "User", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(""); // Clear the input field
      setIsLoading(true); // Show loading state while waiting for API

      // Send the user message to the ChatGPT API and pass the Apollo client
      const botReply = await sendMessageToGPT(input, client);

      const botMessage = { sender: "Bot", text: botReply };

      // Update the messages state with the bot's reply
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false); // Remove loading state
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    inputRef.current.focus(); // Focus the input field whenever messages change
  }, [messages]);

  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending messages
  const onSendMessage = () => {
    const newMessage = input;
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Update messages state
      setInput(""); // Clear input field
      handleSendMessage(newMessage); // Assume this prop function handles sending message to the server
    }
  };

  // Scroll to bottom every time messages update
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]); // Depend on messages to control scrolling

  return (
    <Paper
      sx={{
        margin: 4,
        display: "flex",
        flexDirection: "column",
        bgcolor: "dark.main",
        p: 4,
        boxShadow: 2,
        height: "500px",
        flexGrow: 1,
      }}
      id="messages-container"
    >
      {messages.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Typography variant="h5">Eth TrustNet AI Assitant</Typography>
          <Box
            component="img"
            src={ChatIcon}
            sx={{
              height: 24,
              width: "auto",
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </Box>
      ) : (
        <></>
      )}
      <Box
        sx={{
          // border: "1px solid #000",
          padding: "10px",
          flex: "1",
          height: "calc(100% - 70px)",
          overflowY: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: message.sender === "User" ? "right" : "left",
                  mt: 4,
                }}
              >
                {message.sender === "Bot" ? (
                  <Box sx={{ display: "flex", fontWeight: "bold", gap: 1 }}>
                    {/* <SmartToyRoundedIcon sx={{color:"primary.light"}}/> */}
                    <Box
                      component="img"
                      src={ChatIcon}
                      sx={{
                        height: 24,
                        width: "auto",
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                    <Typography sx={{ fontWeight: "bold", flexWrap: "wrap" }}>
                      :{" "}
                    </Typography>{" "}
                    <Typography sx={{ fontWeight: "bold", flexWrap: "wrap" }}>
                      <Box
                        dangerouslySetInnerHTML={{ __html: message.text }}
                        sx={{
                          "& ul": {
                            padding: "0",
                          },
                        }}
                      />
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ wordBreak: "break-all", flex: 1 }}>
                      {" "}
                      {message.text}{" "}
                    </Typography>
                    <Box sx={{ flexDirection: "row", display: "flex", gap: 1 }}>
                      <Typography sx={{ fontWeight: "bold", flexShrink: 0 }}>
                        :
                      </Typography>

                      <Person4RoundedIcon
                        sx={{ color: "primary.light" }}
                        textAlign="center"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5" textAlign="center">
                Eth TrustNet AI Assitant
              </Typography>
              <Box
                component="img"
                src={ChatIcon}
                sx={{
                  // height: 24,
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: "200px",
                  maxHeight: "100%",
                }}
              />{" "}
              <Typography variant="h6" textAlign="center">
                How can I help you ?
              </Typography>
              <Typography variant="body2" textAlign="center">
                Note: Start with a search.{" "}
              </Typography>
            </Box>
          )}

          {isLoading && (
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={ChatIcon}
                sx={{
                  height: 24,
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
              <Typography sx={{ pl: 2 }}> . . .</Typography>
            </Box>
          )}
        </Box>
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 6 }}>
        <InputBase
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Add the onKeyDown event handler
          style={{ flex: "1" }}
          disabled={isLoading}
          ref={inputRef}
          sx={{
            flex: 1,
            p: "10px",
            borderRadius: "12px 0 0 12px",
            backgroundColor: "#fff",
            paddingLeft: "20px",
            height: "48px",
          }}
        />

        <Button
          onClick={onSendMessage}
          disabled={isLoading}
          sx={{
            borderRadius: "0 12px 12px 0",
            height: "48px",
            "&:disabled": {
              backgroundColor: "grey",
            },
          }}
        >
          Send
        </Button>
      </Box>
      {messages.length !== 0 && (
        <Typography fontSize={10} textAlign="start" pl={2} mt={1}>
          💡 Get biggest transaction / Get smallest transaction / Get oldest Transactions / What is Worldcoin
        </Typography>
      )}
    </Paper>
  );
};

export default Chatbot;
