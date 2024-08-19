import React, { ReactElement } from "react";
import Layout from "./layout";
import { useAuth } from "../../logics/providers/AuthContext";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../components/Form/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import Logo from "../../components/Logo";
import { TextFieldElement } from "react-hook-form-mui";
import useField from "../../logics/hooks/useField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Register page to allow user to register using email and password
const Register = () => {
  const { loading, registerUsingEmail } = useAuth();
  const { isPassswordVisible, setIsPasswordVisible } = useField();
  const { control, handleSubmit } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await registerUsingEmail(values);
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
            Register
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>
              Already have an account?{" "}
              <Link href={"/auth/login"}>Login now</Link>
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
            id="register-username"
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
            id="register-password"
            label="Password"
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
          <TextFieldElement
            name="confirmPassword"
            control={control}
            required
            disabled={loading}
            type={isPassswordVisible ? "text" : "password"}
            margin="normal"
            fullWidth
            id="register-confirm-password"
            label="Confirm Password"
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
              "Register"
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Register;

Register.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
