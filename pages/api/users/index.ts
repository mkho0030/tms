import { NextApiRequest, NextApiResponse } from "next";
import { getUser, setUser } from "../../../utils/mongo-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create user
  if (req.method === "POST") {
    const { uid, name, email, photoUrl } = JSON.parse(req.body);
    await setUser({ uid, name, email, photoUrl });
    res.json({ uid, name, email, photoUrl });
  }

  // get user info, settings and notifications
  if (req.method === "GET") {
    const uid = req.query.uid;
    if (typeof uid !== "string") {
      res.status(400).send({ error: "Invalid user ID" });
      return;
    }
    const user = await getUser(uid);
    if (!user) {
      res.status(404).send({ error: "" });
    }
    res.json(user);
  }
}
