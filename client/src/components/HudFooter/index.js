import * as React from "react";
import { Box, Grid, Typography,  } from "@mui/material";
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
                <Grid item xs={9}  >
                    {/* Controls */}
                    <Typography variant="h6" align="left">
                        Press W: Up | A:Left | D:Right
                    </Typography>
                </Grid>
                <Grid item xs={3} align="center">
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
            </Grid>
        </Box>   
        </div>
);
}
