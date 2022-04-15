import React from "react";
import "./App.css";
import MainWindow from "./components/MainWindow";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Start from "./pages/Start";
import { ThemeProvider, createTheme } from '@mui/material/styles';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P"],
    body1: {
      textTransform: "uppercase",
    },
    h6: {
      textTransform: "uppercase",
    },
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&&::before": {
            borderBottom: "1px solid rgba(255, 255, 255, 1)"
          },
          "&&::after": {
            borderBottom: "1px solid rgba(255, 255, 255, 1)"
          }
        }
      }
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
        <Route exact path="/">
          <Start />
        </Route>
        <Route exact path="/main">
          <MainWindow />
        </Route>
      </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
