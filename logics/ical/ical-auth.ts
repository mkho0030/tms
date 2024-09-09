import jwt from "jsonwebtoken";

type ICalTokenPayload = {
  uid: string;
  projectIds: string[];
};

export const createICalToken = (uid: string, projectIds: string[]) => {
  const payload: ICalTokenPayload = {
    uid,
    projectIds,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
};

export const verifyICalToken = (token: string) => {
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET!);
    return result as ICalTokenPayload;
  } catch (e) {
    return null;
  }
};
