import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create user
  if (req.method === "POST") {
    const { uid, name, email, imageUrl } = JSON.parse(req.body);
    //TODO: create user in db. don't bother checking for existing emails
    res.json({ uid, name, email, imageUrl });
  }
  // get user info, settings and notifications
  if (req.method === "GET") {
    const { uid } = JSON.parse(req.body);
    //TODO: get user from db and return details
    res.json({ uid }); //TODO: add rest of fields from db
  }
  // update user info and settings
  if (req.method === "PUT") {
    const { uid, name, email, imageUrl, settings } = JSON.parse(req.body);
    //TODO: update user in db
    res.json({ uid, name, email, imageUrl, settings });
  }
}
