import dayjs, {type Dayjs} from "dayjs";
import { z } from "zod";

export const createTaskSchema = z.object({
  // project: z.custom<ProjectTypes>((val) => !val, 'Please add a project'),
  project_id: z.string().min(1, { message: "Field cannot be empty" }),
  name: z.string().min(1, { message: "Field cannot be empty" }),
  dueDate: z.string().datetime({message: "Invalid date"}),
  assignees: z.string().array().optional(),
  description: z.string().optional().or(z.literal(''))
});

export const joinTeamSchema = z.object({
  link: z
    .string()
    .min(1, { message: "Field cannot be empty" })
    .startsWith(process.env.NEXT_PUBLIC_APP_URL || "", {
      message: "Link format is not valid, please check invite link again.",
    }),
});
