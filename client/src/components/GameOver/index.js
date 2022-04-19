import * as React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Footer from '../Footer';
import GameOverStats from '../GameStats';

export default function GameOver({ gameState, setGameState }) {
  return (
    <Container sx={{ py: 8 }} maxWidth="sm">
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{ fontFamily: 'Russo One', mt: 15, textTransform: 'uppercase', py:2 }}
          >
            <div id="game-over">GAME OVER</div>
          </Typography>
        <Typography sx={{ py:2 }}>
          <GameOverStats gameState={gameState} />
          </Typography>
        </Box>
      <Footer />
      </Container>
  );
}
