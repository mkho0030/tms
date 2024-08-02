import { Notifications } from "@mui/icons-material";
import { Avatar, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";

const CustomAppBar = () => {
	const handleOnClick = async () => {
		await fetch("http://localhost:3000/api/hello");
	};

	return (
		<Toolbar
      variant="dense"
			sx={{
				background: "transparent",
				alignItems: "flex-end",
				justifyContent: "end",
			}}
		>
			{/* Notification bell */}
      <IconButton >
        <Notifications />
      </IconButton>
			{/* Account */}
			<IconButton
				onClick={() => handleOnClick()}
			>
        <Avatar sx={{ width: 24, height: 24 }}/>
			</IconButton>
		</Toolbar>
	);
};

export default CustomAppBar;
