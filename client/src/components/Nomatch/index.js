import React from "react";
import { Box, Grid } from "@mui/material";
import { useHistory} from "react-router-dom";

const Nomatch = () => {

  const navigation = useHistory();

  const clickHandler = () => {
    navigation.push("/");
  }
  
  return (
    <Box>
      <Grid
        container
        columnSpacing={{ md: 1 }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          px: 20,
          textAlign: "center"
        }}
      >
        <h1>Houston, this page does not exist!</h1>
        <button 
          className="nes-btn upperCase"
          onClick={clickHandler}
        >Phone Home</button>
      </Grid>
    </Box>
  );
};

export default Nomatch;
