import { Collection, Db } from "mongodb";
import { beforeAll, beforeEach, expect, test, vi } from "vitest";
import {
  ProjectType,
  addUserToProject,
  createProject,
  getProjectById,
  getProjectsForUser,
} from "../../utils/mongo-projects";
import clientPromise from "../../utils/mongodb";

let client: Db;
let col: Collection<ProjectType>;

beforeAll(async () => {
  const dbName = "testProjects_489w57tygh489tyg458tyg4";
  client = (await clientPromise).db(dbName);
  vi.stubEnv("DB_NAME", dbName);
});

beforeEach(async () => {
  await client.dropDatabase();
  col = client.collection<ProjectType>("ProjectData");
});

test("create project", async () => {
  const name = "Test Project";
  const project = await createProject(name);
  const result = await col.findOne({ _id: project._id, name });
  expect(result).not.toBeNull();
});

test("get project", async () => {
  const name = "Test Project";
  const project = await createProject(name);
  const result = await col.findOne({ _id: project._id, name });
  const found = await getProjectById(project._id);
  expect(found).toEqual(result);
});

test("add user to project", async () => {
  const name = "Test Project";
  const project = await createProject(name);
  const added = await addUserToProject(project._id, "test-user-id");
  expect(added).toBe(true);
  const updatedProject = await col.findOne({ _id: project._id });
  expect(updatedProject).not.toBeNull();
  expect(updatedProject?.members).lengthOf(1);
  expect(updatedProject?.members).toContain("test-user-id");
  const reAdded = await addUserToProject(project._id, "test-user-id");
  expect(reAdded).toBe(true);
  const reUpdatedProject = await col.findOne({ _id: project._id });
  expect(reUpdatedProject).not.toBeNull();
  expect(reUpdatedProject?.members).lengthOf(1);
  expect(reUpdatedProject?.members).toContain("test-user-id");
});

test("add user to project", async () => {
  const name1 = "Test Project";
  const project1 = await createProject(name1);
  await addUserToProject(project1._id, "test-user-id");
  let projects = await getProjectsForUser("test-user-id");
  expect(projects).lengthOf(1);
  const name2 = "Test Project 2";
  const project2 = await createProject(name1);
  await addUserToProject(project2._id, "test-user-id");
  projects = await getProjectsForUser("test-user-id");
  expect(projects).lengthOf(2);
});

vi.unstubAllEnvs();
