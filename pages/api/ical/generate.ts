import { NextApiRequest, NextApiResponse } from "next";
import { getRequestUser } from "../../../utils/auth-utils";
import { createICalToken } from "../../../logics/ical/ical-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = await getRequestUser(req);
  if (!uid) {
    return res.status(401);
  }

  if (req.method === "GET") {
    const token = createICalToken(uid, []);
    const host = req.headers.host;
    if (!host) {
      return res.status(500).send("Host header is missing");
    }
    const scheme = host?.includes("localhost") ? "http" : "https";
    const url = `${scheme}://${host}/api/ical?token=${token}`;
    return res.status(200).send({ data: { url }, message: "Generated url" });
  }
}
