import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import { addUserToProject } from "../../../utils/mongo-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { id } = JSON.parse(req.body);
    
    if (typeof id !== "string") {
      return res.status(400).send({ error: "Invalid project ID" });
    }

    const success = await addUserToProject(id, uid);
    if (!success) {
      return res.status(500).send({ error: "Failed to join project" });
    }

    return res.status(200).json({id: id}); // TODO: Replace / with path to correct project page
  }
}
