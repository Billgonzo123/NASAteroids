import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body1" align="center">
        COPYRIGHT {new Date().getFullYear()} NASA
      </Typography>
    </Box>
  );
};

export default Footer;
