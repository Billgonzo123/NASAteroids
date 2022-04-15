import * as React from "react";
import {  Box, Typography, Grid } from "@mui/material";
import HudHeader from "../../components/HudHeader";
import Footer from "../Footer";
import GameOverStats from "../../components/GameOverStats";

export default function GameOver() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '97vh',
      }}>
        <HudHeader />
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" align="center" gutterBottom sx={{ fontFamily: "Russo One", mt: 15, textTransform: 'uppercase' }} >
                Game Over
              </Typography>
            </Grid>
            <Grid item xs={2} md={4}>
            </Grid>
            <Grid item xs={8} md={4}>
                <GameOverStats />
            </Grid>
            <Grid item xs={2} md={4}>
            </Grid>
          </Grid>
        <Footer />
    </Box>
  );
}
