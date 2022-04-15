import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Card, CardActions, Box, Grid, Typography } from "@mui/material";

const Signup = (props) => {
  const {
    elements = [],
    show,
    setShow,
  } = props;

  const navigate = useHistory();

  const handleClick = () => {
    navigate.push("/start");
  }

  return (
    <Box 
      component="form" 
      noValidate autoComplete="off"
      >
      <Grid
        container
        columnSpacing={{ md: 1 }}
        direction="column"
      >
        <Grid
          container
        >
        <Typography
          sx={{
            mr: 3
          }}
        >
          Username
        </Typography>
        <TextField
          id="username"
          name="username"
          type="text"
          variant="standard"
          sx={{
            bottomBorder: "1px #fff",
            mb: 5
          }}
        />
        </Grid>
        <Grid
          container
        >
        <Typography
          sx={{
            mr: 9
          }}
        >
          Email
        </Typography>
        <TextField
          id="email"
          name="email"
          type="text"
          variant="standard"
          sx={{
            bottomBorder: "1px #fff",
            mb: 5
          }}
        />
        </Grid>
        <Grid
          container
        >
        <Typography
          sx={{
            mr: 3
          }}
        >
          Password
        </Typography>
        <TextField
          id="password"
          name="password"
          type="text"
          variant="standard"
          sx={{
            mb:10
          }}
        />
        </Grid>

        <Card
          sx={{
            justifyContent: "space-between",
            backgroundColor: "transparent",
          }}
        >
          <CardActions
            sx={{
              justifyContent: "space-between",
              backgroundColor: "transparent",
            }}
          >
            <button 
              type="button" 
              onClick={handleClick}
              className="nes-btn upperCase">
              Signup
            </button>
            <button 
              type="button" 
              onClick={() => {setShow(elements[0])}}
              className={`${show === 'Welcome'} "nes-btn upperCase"`}>
              Cancel
            </button>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  );
};

export default Signup;