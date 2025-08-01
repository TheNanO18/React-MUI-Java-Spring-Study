// index.js (또는 main.jsx)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#3f3939ff",
    },
  },
  typography: {
    fontFamily: "'Bitcount Single', cursive, 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontFamily: "'Bitcount Single', cursive",
      fontWeight: 700,
      fontSize: '2rem',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
