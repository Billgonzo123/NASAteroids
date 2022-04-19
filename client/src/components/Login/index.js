import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Box, Grid, Typography, Card, CardActions } from "@mui/material";
import Auth from "../../util/auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../util/mutations";

const Login = ({ show, setShow}) => {
  const navigate = useHistory();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    setShow("Login");
  }, [error]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      throw e;
    }

    if (Auth.loggedIn) {
      navigate.push("/start");
    }
  };

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
        Login
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
            textAlign: "center",
          }}
        >
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
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

export default Login;
