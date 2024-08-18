import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import { addUserToProject } from "../../../utils/mongo-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    res.status(401);
    return;
  }

  if (req.method === "POST") {
    const id = req.query.id;
    if (typeof id !== "string") {
      res.status(400).send({ error: "Invalid project ID" });
      return;
    }

    const success = await addUserToProject(id, uid);
    if (!success) {
      res.status(500).send({ error: "Failed to join project" });
    }

    res.redirect(307, "/"); // TODO: Replace / with path to correct project page
  }
}
