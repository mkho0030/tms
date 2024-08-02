import React from "react";
import AppDrawer, { drawerWidth } from "../components/AppDrawer";
import AppBar from "../components/AppBar";
import { Box, Grid } from "@mui/material";

// Layout of most pages except for the auth pages.
// Contains the side navigation bar and application bar

// TODO: change and set props
const Layout: React.FC<any> = ({ children }) => {

	return (
		<Box sx={{display: 'flex', justifyContent:'flex-end'}}>
			<AppDrawer />
      <Box sx={{width: `calc(100% - ${drawerWidth}px)`}}>
        <AppBar />
        <Grid container pl={'24px'} pr={'24px'}>
           {children}
        </Grid>
      </Box>
		</Box>
	);
};

export default Layout;
