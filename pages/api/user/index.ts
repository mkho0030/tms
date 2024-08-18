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
    const { uid } = JSON.parse(req.body);
    const user = await getUser(uid);
    res.json(user);
  }
}
