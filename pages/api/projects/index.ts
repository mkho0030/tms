import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import { getProjectsForUser, getUser } from "../../../utils/mongo-users";
import {
  addUserToProject,
  createProject,
  getProjectById,
} from "../../../utils/mongo-projects";

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
    const { name } = JSON.parse(req.body);
    console.log("Function called, name:", name);
    const newProject = await createProject(name);
    await addUserToProject(newProject._id, uid);

    return res.status(201).json(newProject);
  }

  // get teams that user belongs to
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      const projects = await getProjectsForUser(uid);
      return res.status(200).json(projects);
    }

    const project = await getProjectById(id as string);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const members = project.members;

    var memberDataPromises = members.map(async (uid) => await getUser(uid));
    var memberData: any = [];

    Promise.all(memberDataPromises).then((data) => {
      if (data) {
        return res.status(200).json({ ...project, members: data });
      }
      return res.status(500).json({ error: "Something is wrong" });
    });
  }
}
