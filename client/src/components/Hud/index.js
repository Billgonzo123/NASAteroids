import * as React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";

export default function Album() {
  return (
    <AppBar position="relative" sx={{ backgroundColor: "transparent" }}>
    <Toolbar>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            >
            {/* Player Username */}
            <Typography variant="h6" sx={{ flexGrow: .2 }}>
                Angalet
            </Typography>
            {/* Player Current Score */}
            <Typography variant="h6">
                SCORE: 534
            </Typography>
        </Grid>
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            >
            {/* Player Lives */}
            <section class="icon-list">
                <i class="nes-icon is-medium heart"></i>
                <i class="nes-icon is-medium heart"></i>
                <i class="nes-icon is-medium heart is-empty"></i>
            </section>
        </Grid>
    </Toolbar>
  </AppBar>
  );
}
