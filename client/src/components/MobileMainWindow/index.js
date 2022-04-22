import * as React from 'react';
import { Typography, Container } from '@mui/material';

export default function MobileMainWindow() {
  window.location.reload();
  return (
  <Container component="main" sx={{mb: 2 }} maxWidth="lg">
    <Typography
      variant="h3"
      align="center"
      gutterBottom
      sx={{ textTransform: 'uppercase', py:2, mt: 10, fontSize: '30px' }}
    >
      Houston, we've got an error! This game is not compatible on mobile device!
    </Typography>
  </Container>
);
}
