import { Container, Grid } from "@mui/material";
import React from "react";

// Layout for auth pages
const Layout: React.FC<any> = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: 'url("/login-bg.jpg")',
        backgroundSize: "cover",
      }}
    >
      <Grid container justifyContent="center" alignItems="stretch">
        <Grid item sm={4} md={7}></Grid>
        <Grid item md={4} sx={{ marginTop: "auto", marginBottom: "auto" }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
