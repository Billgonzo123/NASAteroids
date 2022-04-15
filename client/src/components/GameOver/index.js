import * as React from "react";
import {  Card,  CardContent,  Typography, Container, Grid } from "@mui/material";
import HudHeader from "../../components/HudHeader";

export default function LevelLoadIn() {
  return (
    <Container maxWidth="sm">  
      <Card sx={{ backgroundColor: "transparent" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: "Russo One" }} >
                Level One
              </Typography>
              <progress class="nes-progress is-pattern" value="50" max="100"></progress>
            </Grid>
            <Grid item xs={2} md={3}>
            </Grid>
            <Grid item xs={8} md={6}>
            <GameControls />
            </Grid>
            <Grid item xs={2} md={3}>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container> 
  );
}
