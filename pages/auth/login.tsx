import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Divider,
	IconButton,
	Link,
	Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useAuth } from "../../logics/providers/AuthContext";
import { z } from "zod";
import Layout from "./layout";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextFieldElement } from "react-hook-form-mui";
import Logo from "../../components/Logo";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";

import { loginSchema } from "../../components/Form/authSchemas";
import useField from "../../logics/hooks/useField";

// Register page to allow user to login using email and password or google sso
const Login: NextPageWithLayout = () => {
	const { loading, loginUsingEmail, loginUsingGoogle } = useAuth();
	const { isPassswordVisible, setIsPasswordVisible } = useField();
	const { control, handleSubmit } = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		try {
			await loginUsingEmail(values);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Card
			sx={{
				height: "100vh",
				padding: "1.75rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
				justifyContent: "center",
			}}
		>
			<CardHeader title={<Logo />} sx={{ paddingBottom: 0 }} />
			<CardContent>
				<Box sx={{ mb: "0.875rem" }}>
					<Typography variant="h4" fontWeight={"500"}>
						{" "}
						Login
					</Typography>
					<Box sx={{ display: "flex" }}>
						<Typography>
							Don't have an account? <Link href={'/auth/register'}>Register now</Link>
						</Typography>
					</Box>
				</Box>
				{/* Email & Password */}
				<Box
					component="form"
					id="login-form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextFieldElement
						name="email"
						control={control}
						required
						disabled={loading}
						margin="normal"
						fullWidth
						id="login-username"
						label="Email"
					/>
					<TextFieldElement
						name="password"
						control={control}
						required
						disabled={loading}
						type={isPassswordVisible ? "text" : "password"}
						margin="normal"
						fullWidth
						id="login-password"
						label="Password"
						helperText={
							<>
								Forget your password? <Link>Click here to reset</Link>
							</>
						}
						InputProps={{
							endAdornment: (
								<IconButton
									onClick={() => setIsPasswordVisible(!isPassswordVisible)}
								>
									{isPassswordVisible ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							),
						}}
					/>
					<Button
						type="submit"
						form="login-form"
						variant="contained"
						fullWidth
						sx={{ marginTop: 2, marginBottom: 2 }}
						disabled={loading}
					>
						{loading ? (
							<CircularProgress color="inherit" size={"24px"} />
						) : (
							"Login"
						)}
					</Button>
				</Box>

				{/* SSO */}
				<Divider> or </Divider>
				<Box sx={{ display: "flex", gap: "8px" }}>
					<Button
						variant="outlined"
						startIcon={<Google />}
						fullWidth
						sx={{ marginTop: 2 }}
						onClick={loginUsingGoogle}
					>
						Google
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
