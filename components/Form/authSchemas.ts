import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: "Field cannot be empty"})
    .email("This is not a valid email"),
  password: z.string().min(1,  { message: "Field cannot be empty" })
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, {message: "Field cannot be empty"})
    .email("This is not a valid email"),
  password: z.string().min(1,  { message: "Field cannot be empty" }),
  confirmPassword: z.string().min(1,  { message: "Field cannot be empty" })
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
})