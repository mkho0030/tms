import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {
      const { id } = req.query;
      // To-do: Update Error message
      if (!id) throw Error();

      //Update user id to database,
      // Redirect user to teams page

      return res.status(200).json({
        id: id,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(501)
        .json({ message: "Session has expired! Please re-login." });
    }
  }

  return res.status(500).json({ message: "Action not allowed" });
}
