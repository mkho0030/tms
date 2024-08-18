import { auth } from "./firebase-admin";
import { NextApiRequest } from "next";

export const getRequestUser = async (req: NextApiRequest) => {
  const token = req.cookies?.auth_token ?? "";
  if (!token) return null;
  try {
    const decodeToken = await auth.verifyIdToken(token);
    const uid = decodeToken.uid;
    return uid;
  } catch {
    return null;
  }
};
