import React from "react";
import Footer from "../components/Footer";
import { Button, Box, Container } from "@mui/material";

const Start = () => {
  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "columm",
          minHeight: "100vh",
        }}
      >
       <Container component="main" maxWidth="sm">
        <div className="logo">
          <h1>ASTEROIDS</h1>
        </div>
        <div className="leader-board">
          <table>
            <tr>
              <td>L33TGAMR</td>
              <td>PAPRSHRDR</td>
              <td>EMDOK</td>
              <td>KT</td>
              <td>KURZ890</td>
              <td>ANGALET</td>
              <td>BEEKILLR</td>
              <td>FFYOGURT</td>
              <td>KILLRBRGR</td>
            </tr>
            <tr>
              <td>500900</td>
              <td>400890</td>
              <td>400777</td>
              <td>399999</td>
              <td>383876</td>
              <td>369870</td>
              <td>200000</td>
              <td>198708</td>
              <td>187907</td>
            </tr>
          </table>
        </div>
        <div>
          <Button variant="text">LOGIN</Button>
          <Button variant="text">SIGNUP</Button>
        </div>
        </Container>
        <Footer />
      </Box>
  );
};

export default Start;
