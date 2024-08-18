import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import {
  addUserToProject,
  createProject,
  getProjectsForUser,
} from "../../../utils/mongo-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    res.status(401);
    return;
  }

  // create team
  if (req.method === "POST") {
    const { name } = JSON.parse(req.body);
    const newProject = await createProject(name);
    await addUserToProject(newProject._id, uid);

    res.status(201).json(newProject);
  }

  // get teams that user belongs to
  if (req.method === "POST") {
    const projects = await getProjectsForUser(uid);
    return projects;
  }
}
