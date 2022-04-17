import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { TextField, Box, Grid, Typography, Card, CardActions } from "@mui/material";
import Auth from '../../util/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../util/mutations';

const Login = ({ show, setShow }) => {
  const navigate = useHistory();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      navigate.push("/start");
    } catch(e) {
      console.log(e);
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
    <Box component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
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
              mr: 3,
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
            type="text"
            variant="standard"
            sx={{
              mb: 10,
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
              className="nes-btn upperCase"
            >
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
