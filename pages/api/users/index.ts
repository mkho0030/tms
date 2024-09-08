import { NextApiRequest, NextApiResponse } from "next";
import { getUser, setUser } from "../../../utils/mongo-users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create user
  if (req.method === "POST") {
    const { uid, name, email, photoUrl } = req.body;
    await setUser({ uid, name, email, photoUrl });
    return res.status(200).json({ uid, name, email, photoUrl });
  }

  // get user info, settings and notifications
  if (req.method === "GET") {
    const uid = req.query.uid;
    if (typeof uid !== "string") {
      return res.status(400).send({ error: "Invalid user ID" });
    }
    const user = await getUser(uid);
    if (!user) {
      return res.status(404).send({ error: "" });
    }
    return res.status(200).json(user);
  }
}
