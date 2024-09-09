import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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

interface User {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  loading: boolean;
  isAuth: boolean;
  user: User | null;
  loginUsingEmail: (values: z.infer<typeof loginSchema>) => void;
  loginUsingGoogle: () => void;
  registerUsingEmail: (values: z.infer<typeof registerSchema>) => void;
  signOutUser: () => void;
}

const initialState: AuthContextType = {
  loading: false,
  isAuth: false,
  user: null,
  loginUsingEmail: async (values: z.infer<typeof loginSchema>) => null,
  loginUsingGoogle: async () => null,
  registerUsingEmail: async (values: z.infer<typeof registerSchema>) => null,
  signOutUser: async () => null,
};

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(app);
  auth.setPersistence(browserSessionPersistence);

  const provider = new GoogleAuthProvider();

  const { setToast } = useToast();
  const router = useRouter();

  const value = {
    loading,
    isAuth,
    user,
    loginUsingEmail: (values: z.infer<typeof loginSchema>) => {
      loginUsingEmail(values);
    },
    loginUsingGoogle: () => {
      loginUsingGoogle();
    },
    registerUsingEmail: (values: z.infer<typeof registerSchema>) => {
      registerUsingEmail(values);
    },
    signOutUser: () => {
      signOutUser();
    },
  };

  const loginUsingEmail = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);

      const { email, password } = values;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser({
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      });

      router.push("/");
      setToast({
        message: "User Authenticated!",
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

  const loginUsingGoogle = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);

      setUser({
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });

      router.push("/");

      setToast({
        message: "User Authenticated!",
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

  const registerUsingEmail = async (values: z.infer<typeof registerSchema>) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser({
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
      });

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

  const signOutUser = async () => {
    try {
      await signOut(auth);
      deleteCookie("auth_token");
      setIsAuth(false);
      setUser(null);
      setToast({
        message: "Signed out successfully",
        type: "success",
      });
      router.push("/auth/login");
    } catch (error) {
      setToast({
        message: (error as Error).message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        // Set User on the front-end
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        // Check if user is created in the db, if not create.
        fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/users?uid=${user.uid}`
        ).then((res) => {
          if (res.status == 404) {
            fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
              method: "POST",
              body: JSON.stringify({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
              }),
            }).then((res) => console.log(res.status));
          }
          console.log(res.status);
          console.log(JSON.stringify(res.json()));
        });

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
        setUser(null);
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
