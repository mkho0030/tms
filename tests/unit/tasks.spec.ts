import { Collection, Db } from "mongodb";
import { beforeAll, beforeEach, expect, test, vi } from "vitest";
import {
  ProjectType,
  addUserToProject,
  createProject,
  getProjectById,
} from "../../utils/mongo-projects";
import {
  TaskType,
  addSubtaskToTask,
  addTaskToProject,
  deleteTaskFromProject,
  getTasksById,
  getTasksByUser,
  updateTaskInProject,
} from "../../utils/mongo-tasks";
import { UserType, getUser, setUser } from "../../utils/mongo-users";
import clientPromise from "../../utils/mongodb";

let client: Db;
let taskCol: Collection<TaskType>;
let projectCol: Collection<ProjectType>;
const projectName = "Test Project";
const projectName2 = "Test Project 2";
let project: ProjectType;
let project2: ProjectType;
let user: UserType;

beforeAll(async () => {
  const dbName = "testTasks_vb03w87ytbw308ty30";
  client = (await clientPromise).db(dbName);
  vi.stubEnv("DB_NAME", dbName);
});

beforeEach(async () => {
  await client.dropDatabase();
  taskCol = client.collection<TaskType>("TaskData");
  projectCol = client.collection<ProjectType>("ProjectData");
  project = await createProject(projectName);
  project2 = await createProject(projectName2);
  const newUser: UserType = {
    uid: "test-user-id",
    name: "Test User",
    email: "test@mail.com",
    photoUrl: "https://test.com/photo.jpg",
  };
  await setUser(newUser);
  user = (await getUser("test-user-id")) as UserType;
  await addUserToProject(project._id, user.uid);
});

test("create task", async () => {
  const endDate1 = new Date();
  endDate1.setMilliseconds(0);
  const task1 = {
    projectId: project._id,
    name: "Test Task",
    endDate: endDate1,
  };
  const added = await addTaskToProject(
    project._id,
    task1.name,
    task1.endDate.toString()
  );
  expect(added).toMatchObject(task1);
  const result = await taskCol.findOne({
    projectId: project._id,
    name: task1.name,
  });
  expect(result).not.toBeNull();
  expect(result).toMatchObject(task1);
  const updatedProject = await projectCol.findOne({
    _id: project._id,
  });
  expect(updatedProject).not.toBeNull();
  expect(updatedProject?.taskIds).toContain(result?._id);

  const endDate2 = new Date();
  endDate2.setMilliseconds(0);
  const task2 = {
    projectId: project._id,
    name: "Test Task2",
    endDate: endDate2,
    assignees: [user.uid],
  };
  const added2 = await addTaskToProject(
    project._id,
    task2.name,
    task2.endDate.toString(),
    task2.assignees
  );
  expect(added2).toMatchObject(task2);
  const result2 = await taskCol.findOne({
    projectId: project._id,
    name: task2.name,
  });
  expect(result2).not.toBeNull();
  expect(result2).toMatchObject(task2);
  const updatedProject2 = await projectCol.findOne({
    _id: project._id,
  });
  expect(updatedProject2).not.toBeNull();
  expect(updatedProject2?.taskIds).toContain(result2?._id);

  const endDate3 = new Date();
  endDate3.setMilliseconds(0);
  const task3 = {
    projectId: project._id,
    name: "Test Task3",
    endDate: endDate3,
    assignees: [user.uid],
    definition: "Test Description",
  };
  const added3 = await addTaskToProject(
    project._id,
    task3.name,
    task3.endDate.toString(),
    task3.assignees,
    task3.definition
  );

  expect(added3).toMatchObject(task3);
  const result3 = await taskCol.findOne({
    projectId: project._id,
    name: task3.name,
  });

  expect(result3).not.toBeNull();
  expect(result3).toMatchObject(task3);
  const updatedProject3 = await projectCol.findOne({
    _id: project._id,
  });
  expect(updatedProject3).not.toBeNull();
  expect(updatedProject3?.taskIds).toContain(result3?._id);
});

test("get task by id and ordered", async () => {
  const endDate1 = new Date();
  endDate1.setMilliseconds(0);
  const task1 = {
    projectId: project._id,
    name: "Test Task",
    endDate: endDate1,
  };
  await addTaskToProject(project._id, task1.name, task1.endDate.toString());
  let updatedProject = await getProjectById(project._id);
  const retrievedTask1 = await getTasksById(updatedProject?.taskIds[0] ?? "");

  expect(retrievedTask1).toMatchObject(task1);

  const endDate2 = new Date();
  endDate2.setMilliseconds(0);
  const task2 = {
    projectId: project._id,
    name: "Test Task",
    endDate: endDate2,
  };
  await addTaskToProject(project._id, task2.name, task2.endDate.toString());
  updatedProject = await getProjectById(project._id);
  const retrievedTask2 = await getTasksById(updatedProject?.taskIds[1] ?? "");

  expect(retrievedTask2).toMatchObject(task2);
});

test("get task by user (assignees)", async () => {
  // assigned to 1 task
  const endDate1 = new Date();
  endDate1.setMilliseconds(0);
  const task1 = {
    projectId: project._id,
    name: "Test Task",
    endDate: endDate1,
    assignees: [user.uid],
  };
  await addTaskToProject(
    project._id,
    task1.name,
    task1.endDate.toString(),
    task1.assignees
  );
  let retrievedTasks = await getTasksByUser(user.uid);

  expect(retrievedTasks).toHaveLength(1);

  // assigned to 2 tasks
  const endDate2 = new Date();
  endDate2.setMilliseconds(0);
  const task2 = {
    projectId: project._id,
    name: "Test Task 2",
    endDate: endDate2,
    assignees: [user.uid],
  };
  await addTaskToProject(
    project._id,
    task2.name,
    task2.endDate.toString(),
    task2.assignees
  );
  retrievedTasks = await getTasksByUser(user.uid);

  expect(retrievedTasks).toHaveLength(2);

  // assigned to task in another project
  const endDate3 = new Date();
  endDate3.setMilliseconds(0);
  const task3 = {
    projectId: project2._id,
    name: "Test Task 3",
    endDate: endDate3,
    assignees: [user.uid, "another-user-id"],
  };
  await addTaskToProject(
    project2._id,
    task3.name,
    task3.endDate.toString(),
    task3.assignees
  );
  retrievedTasks = await getTasksByUser(user.uid);

  expect(retrievedTasks).toHaveLength(3);

  // task not assigened to user
  const endDate4 = new Date();
  endDate4.setMilliseconds(0);
  const task4 = {
    projectId: project2._id,
    name: "Test Task 4",
    endDate: endDate4,
    assignees: ["another-user-id"],
  };
  await addTaskToProject(
    project2._id,
    task4.name,
    task4.endDate.toString(),
    task4.assignees
  );
  retrievedTasks = await getTasksByUser(user.uid);

  expect(retrievedTasks).toHaveLength(3);
});

test("add subtask", async () => {
  const taskDate = new Date();
  taskDate.setMilliseconds(0);
  const task = {
    projectId: project._id,
    name: "Test Task",
    endDate: taskDate,
  };
  await addTaskToProject(project._id, task.name, task.endDate.toString());
  let updatedProject = await getProjectById(project._id);
  const task1Id = updatedProject?.taskIds[0] ?? "";

  // // Add a subtask
  // let added = await addSubtaskToTask(task1Id, "Subtask 1");
  // expect(added).toBe(true);
  // updatedProject = await getProjectById(project._id);
  // let updatedTask1 = await getTasksById(task1Id);
  // expect(updatedTask1?.children[0]).toEqual({ name: "Subtask 1" });

  // // Add another subtask
  // added = await addSubtaskToTask(task1Id, "Subtask 2");
  // expect(added).toBe(true);
  // updatedProject = await getProjectById(project._id);
  // updatedTask1 = await getTasksById(task1Id);
  // expect(updatedTask1?.children[1]).toMatchObject({ name: "Subtask 2" });

  // // Don't allow nesting more than 1 level
  // added = await addSubtaskToTask(
  //   updatedTask1?.children[0]._id ?? "",
  //   "Subtask 3"
  // );
  // expect(added).toBe(false);
});

test("updated task", async () => {
  const taskDate = new Date();
  taskDate.setMilliseconds(0);
  let taskInfo = {
    projectId: project._id,
    name: "Test Task",
    endDate: taskDate,
    definition: "",
  };
  await addTaskToProject(
    project._id,
    taskInfo.name,
    taskInfo.endDate.toString()
  );
  let updatedProject = await getProjectById(project._id);
  let taskId = updatedProject?.taskIds[0] ?? "";
  let task = (await getTasksById(taskId))!;
  expect(task).toMatchObject(taskInfo);

  // Update task name
  taskInfo.name = "Updated Task";
  let updated = await updateTaskInProject({
    ...task,
    ...taskInfo,
  });
  expect(updated).toBe(true);
  task = (await getTasksById(taskId))!;
  expect(task).toMatchObject(taskInfo);

  // Update task endDate
  taskInfo.endDate = new Date("2024-12-31T23:59:59");
  taskInfo.endDate.setMilliseconds(0);
  updated = await updateTaskInProject({
    ...task,
    ...taskInfo,
  });
  expect(updated).toBe(true);
  task = (await getTasksById(taskId))!;
  expect(task).toMatchObject(taskInfo);

  // Update task description
  taskInfo.definition = "Updated Task description";
  updated = await updateTaskInProject({
    ...task,
    ...taskInfo,
  });
  expect(updated).toBe(true);
  task = (await getTasksById(taskId))!;
  expect(task).toMatchObject(taskInfo);
});

test("delete task", async () => {
  const taskDate = new Date();
  taskDate.setMilliseconds(0);
  const task = {
    projectId: project._id,
    name: "Test Task",
    endDate: taskDate,
  };
  await addTaskToProject(project._id, task.name, task.endDate.toString());
  let updatedProject = await getProjectById(project._id);
  const taskId = updatedProject?.taskIds[0] ?? "";
  expect(updatedProject?.taskIds).toHaveLength(1);

  let deleted = await deleteTaskFromProject(project._id, taskId);
  expect(deleted).toBe(true);
  updatedProject = await getProjectById(project._id);
  expect(updatedProject?.taskIds).toHaveLength(0);
});

vi.unstubAllEnvs();
