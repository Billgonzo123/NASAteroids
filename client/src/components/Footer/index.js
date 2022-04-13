import React from "react";
import { Box } from "@mui/material";

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
      <footer>
        <p>COPYRIGHT {new Date().getFullYear()} NASA</p>
      </footer>
    </Box>
  );
};

export default Footer;
