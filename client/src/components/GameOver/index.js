import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import HudHeader from '../HudHeader';
import Footer from '../Footer';
import GameOverStats from '../GameStats';

export default function GameOver({ gameState }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '97vh',
      }}
    >
      <HudHeader gameState={gameState}/>
      <Grid container spacing={2}>
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
        <Grid item xs={2} md={4}></Grid>
        <Grid item xs={8} md={4}>
          <GameOverStats gameState={gameState} />
        </Grid>
        <Grid item xs={2} md={4}></Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
