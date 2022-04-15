import * as React from "react";
import { AppBar, Box, Container, Toolbar, Typography, Grid } from "@mui/material";

export default function Album() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '97vh',
      }}>
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
                <section class="icon-list">
                    <i class="nes-icon is-medium heart"></i>
                    <i class="nes-icon is-medium heart"></i>
                    <i class="nes-icon is-medium heart is-empty"></i>
                </section>
            </Grid>
        </Toolbar>
        </AppBar>
        <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container>
          <Typography variant="h6" align="center">
            Press W: Up | A:Left | D:Right
          </Typography>
        </Container>
      </Box>
    </Box>
    
  );
}
