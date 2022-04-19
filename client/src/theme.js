import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  root: {
    width: '100vw',
    height: '100vh',
  },
  typography: {
    fontFamily: ["Press Start 2P"],
    body1: {
      textTransform: "uppercase",
    },
    h6: {
      textTransform: "uppercase",
    },
  },
  palette: {
    text: {
      primary: "#FFFFFF",
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&&::before": {
            borderBottom: "1px solid rgba(255, 255, 255, 1)",
          },
          "&&::after": {
            borderBottom: "1px solid rgba(255, 255, 255, 1)",
          },
        },
      },
    },
  },
});

export default theme