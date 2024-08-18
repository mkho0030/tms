import { auth } from "./firebase-admin";
import { NextApiRequest } from "next";

export const getRequestUser = async (req: NextApiRequest) => {
  // in testing, return uid test
  if (process.env.SKIP_SERVER_AUTH) return "test";

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
