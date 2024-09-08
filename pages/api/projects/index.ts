import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import {
  addUserToProject,
  createProject,
  getProjectsForUser,
} from "../../../utils/mongo-users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401);
  }

  // create team
  if (req.method === "POST") {
    const { name } = req.body;
    const newProject = await createProject(name);
    await addUserToProject(newProject._id, uid);

    return res.status(201).json(newProject);
  }

  // get teams that user belongs to
  if (req.method === "GET") {
    const projects = await getProjectsForUser(uid);
    return res.status(200).json(projects);
  }
}
