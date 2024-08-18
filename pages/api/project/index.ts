import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase-admin";
import { addUserToProject, createProject } from "../../../utils/mongo-utils";

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

    const newProject = await createProject(name);
    await addUserToProject(newProject._id, uid);

    res.json(newProject);
  }
}
