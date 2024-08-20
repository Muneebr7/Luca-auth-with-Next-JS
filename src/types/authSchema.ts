import { z } from "zod";

export const singInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const singUpSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(3, { message: "Password Should be at least 3 characters" }),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesnt match",
    path: ["confirmPassword"],
  });
