import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../utils/mongodb";
import { mongoHelper } from "../../../utils/mongo-wrapper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const data = mongoHelper("userData", "READ");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("TMS");
      const collection = db.collection("UserData");

      const result = await collection.insertOne(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to insert data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
