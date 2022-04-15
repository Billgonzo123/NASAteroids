import * as React from "react";
import {  Box, Typography, Grid } from "@mui/material";
import HudHeader from "../../components/HudHeader";
import Footer from "../Footer";

export default function LevelLoadIn() {
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
                Level One
              </Typography>
            </Grid>
            <Grid item xs={2} md={3}>
            </Grid>
            <Grid item xs={8} md={6}>
            </Grid>
            <Grid item xs={2} md={3}>
            </Grid>
          </Grid>
        <Footer />
    </Box>
  );
}
