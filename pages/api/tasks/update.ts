import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import { getTasksById, updateTaskInProject } from "../../../utils/mongo-tasks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { taskIds, status, task } = JSON.parse(req.body);

    console.log(taskIds, status);

    if (taskIds && (status || status == 0)) {
      const taskData = await Promise.all(taskIds.map(getTasksById));

      await Promise.all(
        taskData.map((task) => updateTaskInProject({ ...task, status: status }))
      );
      return res.status(200).json({ message: "Updated successfully" });
    }

    if (task) {
      await updateTaskInProject(task);
      return res.status(200).json({ message: "Updated successfully" });
    }
    return res.status(501).json({ message: "Forbidden request" });
  }

  return res.status(501).json({ message: "Forbidden request" });
}
