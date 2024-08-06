import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create user
  if (req.method === "POST") {
    const { uid, name, email, photoUrl } = JSON.parse(req.body);
    //TODO: upsert user in db. don't bother checking for existing emails
    res.json({ uid, name, email, photoUrl });
  }
  // get user info, settings and notifications
  if (req.method === "GET") {
    const { uid } = JSON.parse(req.body);
    //TODO: get user from db and return details
    res.json({ uid }); //TODO: add rest of fields from db
  }
}
