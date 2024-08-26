import { NextApiRequest, NextApiResponse } from "next";
import { verifyICalToken } from "../../../logics/ical/ical-auth";
import { ICalEvent, generateICal } from "../../../logics/ical/ical";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token;
  if (typeof token !== "string") {
    return res.status(401);
  }
  const info = verifyICalToken(token);
  if (!info) {
    return res.status(401);
  }
  // TODO: get all future events for user and subscribed projects
  const events: ICalEvent[] = [];
  const icalString = generateICal(events);
  return res.status(200).send(icalString);
}
