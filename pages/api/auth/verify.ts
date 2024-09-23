import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { auth } from "../../../utils/firebase-admin";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    // Check for req.body details
    const { idToken } = JSON.parse(req.body);
    // Create session Token cookie

    try {
      const decodeToken = await auth.verifyIdToken(idToken.value);
      const uid = decodeToken.uid;

      res.status(200).json({ message: "Verified, Please proceed." });
    } catch (error) {
      return res
        .status(501)
        .json({ message: "Session has expired! Please re-login." });
    }
  }
}
