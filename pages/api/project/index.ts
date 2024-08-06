import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create team
  if (req.method === "POST") {
    const { name } = JSON.parse(req.body);
    const token = req.cookies?.auth_token ?? "";
    const decodeToken = await auth.verifyIdToken(token);
    const uid = decodeToken.uid;

    //TODO: create project with name
    //TODO: add uid to created project

    res.json({ name }); //TODO: return created project id
  }
}
