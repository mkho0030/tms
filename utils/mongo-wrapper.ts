import clientPromise from "./mongodb";

type ReqT = "CREATE" | "READ" | "UPDATE" | "DELETE";

export const mongoHelper = async (
  collection: string,
  request: ReqT,
  data?: Object
) => {
  const client = await clientPromise;
  const db = client.db("TMS");
  const mongoCollection = db.collection(collection);

  if (request === "READ") {
    const data = await mongoCollection.find({}).toArray();
  }
};
