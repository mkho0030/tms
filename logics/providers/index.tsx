import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastProvider } from "./ToastContext";
import { blue } from "@mui/material/colors";
import { AuthProvider } from "./AuthContext";
import { autocompleteClasses, Box } from "@mui/material";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      background: {
        default: "#fcfcfc",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
