import * as React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";

export default function HudHeader(gameState) {
  return (
    <AppBar position="relative" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
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
                <Typography variant="h6" sx={{ flexGrow: .2 }}>
                    SCORE: 534
                </Typography>
                {/* Player Current Score */}
                <Typography variant="h6">
                    Time : 30
                </Typography>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                >
                {/* Player Lives */}
                <section className="icon-list">
                    <i className={`nes-icon is-medium heart ${gameState.gameState.gameState.lives < 1 && "is-empty"}`}></i>
                    <i className={`nes-icon is-medium heart ${gameState.gameState.gameState.lives < 2 && "is-empty"}`}></i>
                    <i className={`nes-icon is-medium heart ${gameState.gameState.gameState.lives < 3 && "is-empty"}`}></i>
                </section>
            </Grid>
        </Toolbar>
    </AppBar>     
  );
}
