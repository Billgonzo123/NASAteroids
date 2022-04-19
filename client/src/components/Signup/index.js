import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {  TextField, Card, CardActions, Box, Grid, Typography,} from "@mui/material";
import Auth from "../../util/auth";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../util/mutations";
import {playMenuSound} from "../../util/playSound"
const Signup = ({ show, setShow }) => {
  const navigate = useHistory();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    playMenuSound("menu_yay");
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    
  };
  if (error) { playMenuSound('menu_error')};
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        Sign Up
      </Typography>
      <Grid
        container
        columnSpacing={{ md: 1 }}
        direction="column"
        sx={{
          mt: 15,
        }}
      >
        <Grid container>
          <Typography
            sx={{
              mr: 3,
            }}
          >
            Username
          </Typography>
          <TextField
            autoComplete="username"
            id="username"
            name="username"
            type="username"
            variant="standard"
            onChange={handleChange}
            sx={{
              bottomBorder: "1px #fff",
              mb: 5,
            }}
          />
        </Grid>
        <Grid container>
          <Typography
            sx={{
              mr: 9,
            }}
          >
            Email
          </Typography>
          <TextField
            id="email"
            name="email"
            type="email"
            variant="standard"
            onChange={handleChange}
            sx={{
              bottomBorder: "1px #fff",
              mb: 5,
            }}
          />
        </Grid>
        <Grid container>
          <Typography
            sx={{
              mr: 3,
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
              mb: 10,
            }}
          />
        </Grid>
        <Box
        sx={{
          textAlign: "center"
        }}
        >
        {error ? (
          <div>
            <p className="error-text">User already exists!</p>
          </div>
        ) : null}
        </Box>
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
            <button type="submit" className="nes-btn upperCase">
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                playMenuSound('menu_close')
                setShow("Welcome");
              }}
              className={`${show === "Welcome"} nes-btn upperCase`}
            >
              Cancel
            </button>
          </CardActions>
        </Card>
      </Grid>
    </Box>
  );
};

export default Signup;
