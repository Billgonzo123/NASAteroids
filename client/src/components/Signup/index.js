import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Card, CardActions, Box, Grid, Typography } from "@mui/material";
import Auth from '../../util/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../util/mutations';

const Signup = ({show, setShow}) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    console.log("Hello!");
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const navigate = useHistory();

  const handleClick = () => {
    navigate.push("/start");
  }

  return (
    <Box 
      component="form" 
      noValidate autoComplete="off"
      onSubmit={handleFormSubmit}
      >
      <Typography
        sx={{
          textAlign: "center"
        }}
      >
          Sign Up
      </Typography>
      <Grid
        container
        columnSpacing={{ md: 1 }}
        direction="column" 
        sx={{
          mt: 15
        }}
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
          autoComplete="username"
          id="username"
          name="username"
          type="text"
          variant="standard"
          onChange={handleChange}
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
          onChange={handleChange}
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
          autoComplete="current-password"
          placeholder="******"
          id="password"
          name="password"
          type="password"
          variant="standard"
          onChange={handleChange}
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
              Submit
            </button>
            <button 
              type="button" 
              onClick={() => {setShow("Welcome")}}
              className= {`${show === 'Welcome'} nes-btn upperCase`}>
              Cancel
            </button>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  );
};

export default Signup;