import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase-admin";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = req.query.id;

    const token = req.cookies?.auth_token ?? "";
    const decodeToken = await auth.verifyIdToken(token);
    const uid = decodeToken.uid;

    //TODO: add uid to project with id

    res.redirect("/");
  }
}
