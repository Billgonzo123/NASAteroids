import * as React from 'react';
import { Typography, Container } from '@mui/material';
import GameOverStats from '../GameStats';

export default function GameOver({ gameState, setGameState }) {
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
      <GameOverStats gameState={gameState}/>
  </Container>
);
}
