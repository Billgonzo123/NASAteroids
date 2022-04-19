import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import HudHeader from '../HudHeader';
import Footer from '../Footer';
import GameOverStats from '../GameStats';

export default function GameOver({ gameState, setGameState }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '97vh',
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{ fontFamily: 'Russo One', mt: 15, textTransform: 'uppercase' }}
          >
            <div id="game-over">GAME OVER</div>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <GameOverStats gameState={gameState} />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
