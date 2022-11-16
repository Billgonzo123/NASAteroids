import React, { useEffect, useRef } from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function HudHeader({gameState, setGameState}) {

    const { loading, error, data } = useQuery(GET_ME);

    const user = data?.me || {};


    useEffect(() => {
        if (gameState.loggedIn) {
            setGameState((old) => ({ ...old, username: user.username}));
        }
      
    }, [user]);

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
                    {gameState.username}
                </Typography>
                {/* Player Current Score */}
                <Typography variant="h6" sx={{ flexGrow: .2 }}>
                    SCORE: {gameState.score}
                </Typography>
                <Typography variant="h6" sx={{ flexGrow: .2 }}>
                    LVL: {gameState.curLevel}
                </Typography>
                {/* Player Current Score */}
                <Typography variant="h6">
                    Time: {gameState.timer}
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
                    <i className={`nes-icon is-medium heart ${gameState.lives < 1 && "is-empty"}`}></i>
                    <i className={`nes-icon is-medium heart ${gameState.lives < 2 && "is-empty"}`}></i>
                    <i className={`nes-icon is-medium heart ${gameState.lives < 3 && "is-empty"}`}></i>
                </section>
            </Grid>
        </Toolbar>
    </AppBar>     
  );
}
