import * as React from "react";
import { Box, Grid, Typography, } from "@mui/material";
import Auth from "../../utils/auth";
import { useHistory } from 'react-router-dom';

export default function HudFooter() {
    const navigate = useHistory();

    const handleQuit = () => {
        window.location = "/start";
    }

    const handleLogout = () => {
        Auth.logout();
        window.location = "/";
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
                                    className="nes-btn upperCase"
                                    onClick={handleQuit}>
                                    Quit
                                </button>
                                <button style={{"opacity": "0", "width": "8vw"}}></button> {/*Space between buttons, lol */}
                                <button
                                    type="button"
                                    className="nes-btn upperCase"
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </>)
                        : (
                            <>
                                <Grid item xs={9}  >
                                    {/* Controls */}
                                    <Typography variant="h6" align="left">
                                        Press W: Up | A:Left | D:Right
                                    </Typography>
                                </Grid>
                                <Grid id="quitLogButtons" item xs={3} align="center">
                                    <Box display="flex" justifyContent="space-between" sx={{ mx: 10 }}>
                                        <button
                                            type="button"
                                            className="nes-btn upperCase"
                                            onClick={handleQuit}>
                                            Quit
                                        </button>
                                        <button
                                            type="button"
                                            className="nes-btn upperCase"
                                            onClick={handleLogout}>
                                            Logout
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
