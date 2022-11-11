import * as React from 'react';
import { Typography, Container } from '@mui/material';
import GameOverStats from '../GameStats';

export default function GameOver({ gameState }) {
  return (
  <Container component="main" sx={{mb: 2 }} maxWidth="lg">
    <Typography
      variant="h1"
      align="center"
      gutterBottom
      sx={{ fontFamily: 'Press Start 2P', mt: 15, textTransform: 'uppercase', py:2 }}
    >
      <div id="game-over">GAME OVER</div>
    </Typography>
      {(gameState.loggedIn) ? <GameOverStats gameState={gameState}/> : <div style={{fontSize: "small", textAlign: "center", opacity: .4, marginTop: '5vh'}}>Log In To Join the Leaderboard</div> }
  </Container>
);
}
