import { initializeApp, cert } from "firebase-admin/app";
import credential from "../credentials/firebase-admin-cred.json";

// @ts-expect-error
const admin = initializeApp({ credential: cert(credential) }, "admin");

export default admin;
