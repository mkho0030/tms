import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase-admin";
import { addUserToProject } from "../../../utils/mongo-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = req.query.id;
    if (typeof id !== "string") {
      res.status(400).send({ error: "Invalid project ID" });
      return;
    }

    const token = req.cookies?.auth_token ?? "";
    const decodeToken = await auth.verifyIdToken(token);
    const uid = decodeToken.uid;

    const success = await addUserToProject(id, uid);
    if (!success) {
      res.status(500).send({ error: "Failed to join project" });
    }

    res.redirect("/");
  }
}
