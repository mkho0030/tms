import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { loginSchema, registerSchema } from "../../components/Form/authSchemas";
import { z } from "zod";
import app from "../../utils/firebase";
import { useToast } from "./ToastContext";
import { deleteCookie, setCookie } from "cookies-next";
import { GoogleAuthProvider } from "firebase/auth";

import { useRouter } from "next/router";

interface AuthContextType {
	loading: boolean;
	isAuth: boolean;
	loginUsingEmail: (values: z.infer<typeof loginSchema>) => void;
	loginUsingGoogle: () => void;
	registerUsingEmail: (values: z.infer<typeof registerSchema>) => void;
}

const initialState: AuthContextType = {
	loading: false,
	isAuth: false,
	loginUsingEmail: async (values: z.infer<typeof loginSchema>) => null,
	loginUsingGoogle: async () => null,
	registerUsingEmail: async (values: z.infer<typeof registerSchema>) => null,
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [loading, setLoading] = useState(true);
	const [isAuth, setIsAuth] = useState(true);
	const [user, setIsUser] = useState();

	const auth = getAuth(app);
	auth.setPersistence(browserSessionPersistence);

	const provider = new GoogleAuthProvider();

	const { setToast } = useToast();
	const router = useRouter();

	const value = {
		loading,
		isAuth,
		loginUsingEmail: (values: z.infer<typeof loginSchema>) => {
			loginUsingEmail(values);
		},
		loginUsingGoogle: () => {
			loginUsingGoogle();
		},
		registerUsingEmail: (values: z.infer<typeof registerSchema>) => {
			registerUsingEmail(values);
		},
	};

	const loginUsingEmail = async (values: z.infer<typeof loginSchema>) => {
		try {
			setLoading(true);

			const { email, password } = values;

			await signInWithEmailAndPassword(auth, email, password);
			router.push("/");
		} catch (error) {
			setToast({
				message: (error as Error).message,
				type: "error",
			});
			setLoading(false);
		}
	};

	const loginUsingGoogle = async () => {
		try {
			setLoading(true);

			await signInWithPopup(auth, provider);
			router.push("/");
		} catch (error) {
			setToast({
				message: (error as Error).message,
				type: "error",
			});
			setLoading(false);
		}
	};

	const registerUsingEmail = async (values: z.infer<typeof registerSchema>) => {
		try {
			setLoading(true);
			const { email, password } = values;
			await createUserWithEmailAndPassword(auth, email, password);
			router.push("/auth/login");
			setToast({
				message: "Account created successfully!",
				type: "success",
			});
		} catch (error) {
			setToast({
				message: (error as Error).message,
				type: "error",
			});
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		auth.onAuthStateChanged(function handleAuth(user) {
			if (user) {
				console.log(user);
				user
					.getIdToken()
					.then((idToken) => {
						setCookie("auth_token", idToken);
						setIsAuth(true);
						setLoading(false);
					})
					.catch((error) => {
						setToast({
							message: error.message,
							type: "error",
						});
						setIsAuth(false);
						setLoading(false);
					});
			} else {
				setToast({
					message: "Not Authenticated",
					type: "error",
				});
				console.log("Not authenticated");
				setIsAuth(false);
				setLoading(false);
			}
		});
		return () => {};
	}, [auth]);

	useEffect(() => {
		if (!isAuth && !loading) {
			deleteCookie("auth_token");
			router.push("/auth/login");
		}
		return () => {};
	}, [isAuth]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined)
		throw new Error("useAuth must be used within AuthProvider");

	return context;
};
