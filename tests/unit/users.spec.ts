import { Collection, Db } from "mongodb";
import { beforeAll, beforeEach, expect, test, vi } from "vitest";
import { UserType, getUser, setUser } from "../../utils/mongo-users";
import clientPromise from "../../utils/mongodb";

let client: Db;
let col: Collection<UserType>;

beforeAll(async () => {
  const dbName = "testUsers_q23958fn3w49q85n3g40wf895y";
  client = (await clientPromise).db(dbName);
  vi.stubEnv("DB_NAME", dbName);
});

beforeEach(async () => {
  await client.dropDatabase();
  col = client.collection<UserType>("UserData");
});

test("create and update user", async () => {
  const user: UserType = {
    uid: "test-user-id",
    name: "Test User",
    email: "test@mail.com",
    photoUrl: "https://test.com/photo.jpg",
  };
  const created = await setUser(user);
  expect(created).toBe(true);
  const result = await col.findOne({
    uid: "test-user-id",
  });
  expect(result).not.toBeNull();
  user.photoUrl = "https://test.com/photo2.jpg";
  const updated = await setUser(user);
  expect(updated).toBe(true);
});

test("get user", async () => {
  const user: UserType = {
    uid: "test-user-id",
    name: "Test User",
    email: "test@mail.com",
    photoUrl: "https://test.com/photo.jpg",
  };
  await setUser(user);
  const result = await getUser("test-user-id");
  expect(result).toMatchObject(user);
});

vi.unstubAllEnvs();
