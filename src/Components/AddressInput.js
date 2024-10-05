// src/AddressInput.js

import React from "react";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import { Button, Box, InputBase, IconButton } from "@mui/material";
import AnnouncementRoundedIcon from '@mui/icons-material/AnnouncementRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const AddressInput = ({
  addressInput,
  setAddressInput,
  handleAddressChange,
  
}) => {

  // const clearInput = () => {
  //   handleAddressChange(addressInput);
  //   setAddressInput("", () => {
  //   });
  // };


  return (
    <Box sx={{display:"flex",  gap:2,    flexGrow:1,justifyContent:"end"}}>
     
      <Box
        sx={{
          m: 2,
    mt:{xs:10,sm:8,lg:4},

          display: "flex",
          borderRadius: "50px",
          backgroundColor: "#f1f1f1",
          width: "auto",
          maxWidth:"500px",height:"48px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <InputBase
          type="text"
          placeholder="Search Address"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          sx={{
            flex: 1,
            p: "10px",
            borderRadius: "50px 0 0 50px",
            backgroundColor: "#fff",
            paddingLeft: "20px",height:"48px",
          }}
        />
        {/* now need click 2 times only work */}
 {/* <Button
        //  onClick={clearInput} 
        onClick={() => handleAddressChange(setAddressInput(""))}
        sx={{
            borderRadius: 0,
            minWidth: "50px",
           height:"48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DeleteOutlineRoundedIcon />
        </Button> */}
        <Button
          onClick={() => handleAddressChange(addressInput)}
          sx={{
            borderRadius: "0 50px 50px 0",
            minWidth: "50px",
           height:"48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FindInPageRoundedIcon />
        </Button>

      </Box>
       {/* <IconButton>
<AnnouncementRoundedIcon sx={{color:"primary.main"}}/>
      </IconButton> */}
    </Box>
  );
};

export default AddressInput;
