import * as React from "react";
import { Box, Grid, Typography, } from "@mui/material";
import Auth from "../../utils/auth";
import { useHistory } from 'react-router-dom';
import { toggleFullscreen } from "../../utils/gameUtils/toggleFullscreen";

export default function HudFooter({setGameState}) {
    const navigate = useHistory();

    const handleQuit = () => {
        document.exitFullscreen();
        window.location = "/start";
    }

    const handleRetry = () => {
        //retry
        setGameState((old) => ({
            ...old,
            curLevel: 0,
            score: 0,
            exp: 0,
            lives: 3,
            playerLevel: 0,
            numberOfAsteroids: 0,
            timer: 0,
            paused: 0,
            gameOver: 0,
          }));
         window.location = "/main";
  

    }

    return (
        <div id='hud-footer'>
            <Box
                component="footer"
                sx={{
                    px: 3,
                    mt: 'auto',
                }}
            >
                <Grid container spacing={2} direction="row" alignItems="center">
                    {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?
                        (<>
                            <div id="quitLogoutMobile">
                                <button
                                    type="button"
                                    className="nes-btn upperCase mobile-button"
                                    onClick={handleRetry}>
                                    Retry
                                </button>

                                <button style={{ "opacity": "0", "width": "150px" }}></button> {/*Space between buttons, lol */}
                                <button
                                    type="button"
                                    className="nes-btn upperCase mobile-button"
                                    onClick={handleQuit}>
                                    Quit
                                </button>
                            </div>
                        </>)
                        : (
                            <>
                                <Grid item xs={9}  >
                                    {/* Controls */}
                                    <Typography variant="h6" align="left">
                                        Move with Arrow keys or WSAD | Space to shoot 
                                    </Typography>
                                </Grid>
                                <Grid id="quitLogButtons" item xs={3} align="center">
                                    <Box display="flex" justifyContent="space-between" sx={{ mx: 10 }}>
                                        <button
                                            type="button"
                                            className="nes-btn upperCase"
                                            onClick={handleRetry}>
                                            Retry
                                        </button>
                                        <button
                                            type="button"
                                            className="nes-btn upperCase"
                                            onClick={handleQuit}>
                                            Quit
                                        </button>
                                    </Box>
                                </Grid>
                            </>)
                    }
                </Grid>
            </Box>
        </div>
    );
}
