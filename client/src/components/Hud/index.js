import * as React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import HudHeader from "../../components/HudHeader"

export default function Hud() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '97vh',
      }}>
        <HudHeader />
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
