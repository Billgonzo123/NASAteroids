import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import Main from './pages/Main';
import Nomatch from './components/Nomatch';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
}); 

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [gameState, setGameState] = useState({
    username: ' ',
    curLevel: 0,
    score: 0,
    exp: 0,
    lives: 3,
    playerLevel: 0,
    numberOfAsteroids: 0,
    timer: 0,
    paused: 0,
    gameOver: 0,
  });

  return (
    <ApolloProvider client={client}>
      <audio
        id="menu-sound"
        src={require(`./assets/snd/menu_snd/menu_select.wav`)}
        style={{ disply: 'none' }}
        type="audio/wav"
      />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/start">
              <Start setGameState={setGameState} gameState={gameState} />
            </Route>
            <Route exact path="/main">
              <Main setGameState={setGameState} gameState={gameState} />
            </Route>
            <Route>
              <Nomatch />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
