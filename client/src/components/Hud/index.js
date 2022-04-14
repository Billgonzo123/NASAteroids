import * as React from 'react';
import {AppBar, Toolbar, Typography, Link} from '@mui/material';

export default function Album() {
  return (
      <AppBar position="relative" sx={{backgroundColor: "transparent"}}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Angalet
          </Typography>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            SCORE: 534
          </Typography>
          <nav>
            <section class="icon-list">
                 {/* heart  */}
                <i class="nes-icon is-medium heart"></i>
                <i class="nes-icon is-medium heart"></i>
                <i class="nes-icon is-medium heart is-empty"></i>
            </section>
          </nav>
        </Toolbar>
      </AppBar>
  );
}