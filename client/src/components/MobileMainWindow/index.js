import * as React from 'react';
import { Typography, Container } from '@mui/material';

export default function MobileMainWindow() {
  return (
  <Container component="main" sx={{mb: 2 }} maxWidth="lg">
    <Typography
      variant="h1"
      align="center"
      gutterBottom
      sx={{ fontFamily: 'Press Start 2P', mt: 15, textTransform: 'uppercase', py:2 }}
    >
      Houston we have an error!  Game is not combatible on mobile device.
    </Typography>
  </Container>
);
}
