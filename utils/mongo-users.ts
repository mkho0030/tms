import clientPromise from "./mongodb";
import { ProjectType } from "./mongo-projects";

export type UserType = {
  uid: string;
  name: string;
  email: string;
  photoUrl: string;
  settings?: Object;
};

export const setUser = async (user: UserType): Promise<boolean> => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<UserType>("UserData");
  const result = await col.updateOne(
    { uid: user.uid },
    { $set: user },
    { upsert: true }
  );

  return result.upsertedCount === 1 || result.modifiedCount === 1;
};

export const getUser = async (uid: string): Promise<UserType | null> => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "TMS");
  const col = db.collection<UserType>("UserData");
  const user = await col.findOne({ uid: uid });
  return user;
};
