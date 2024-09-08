import { NextApiRequest, NextApiResponse } from "next";
import { addTaskToProject, getTasksById, getTasksByUser } from "../../../utils/mongo-users";
import { getRequestUser } from "../../../utils/auth-utils";

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
		const { projectId, name } = JSON.parse(req.body);
		const newTask = await addTaskToProject(projectId, name);

		return res.status(201).json(newTask);
	}

	// get teams that user belongs to
	if (req.method === "GET") {

		const { id, projectId } = req.query;
		// individual task
		if (id != null) {
			const task = getTasksById(id as string);
			return res.status(200).json(task)
		}
		if (projectId != null) {
			const project = await getProjectById(projectId as string);
			const taskIds = project.taskIds;
			const tasks = taskIds.map(getTasksById)
			return res.status(200).json(tasks)
		}
		const tasks = await getTasksByUser(uid);
		return res.status(200).json(tasks);
	}
}
  