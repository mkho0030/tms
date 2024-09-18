import { initializeApp, cert, getApps, getApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const admin = !getApps().length
  ? //@ts-ignore
    initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string))}, "admin")
  : getApp("admin");

export const auth = getAuth(admin);
