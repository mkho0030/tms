import { z } from "zod";

export const createTeamSchema = z.object({});

export const joinTeamSchema = z.object({
  link: z
    .string()
    .min(1, { message: "Field cannot be empty" })
    .startsWith(process.env.NEXT_PUBLIC_APP_URL || "", {
      message: "Link format is not valid, please check invite link again.",
    }),
});
