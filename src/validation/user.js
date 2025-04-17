import z from "zod";

export const userSchema = {
  signIn: z.object({
    email: z.string().email(),
    password: z.string().min(5).max(15),
  }),
  signUp: z.object({
    username: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5).max(15),
  }),
};
