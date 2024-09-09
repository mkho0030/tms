import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import credential from "../credentials/firebase-admin-cred.json";
import { getAuth } from "firebase-admin/auth";

const admin = !getApps().length
  ? //@ts-ignore
    initializeApp({ credential: cert(credential) }, "admin")
  : getApp("admin");

export const auth = getAuth(admin);
