"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import z from "zod";
import { createUser } from "../user/createUser";
import { hashPassword } from "@/utils/auth";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
});

export const signUp = async (userData: z.infer<typeof signUpSchema>) => {
  const isUserValid = signUpSchema.safeParse(userData);

  if (!isUserValid.success) {
    return {
      error: isUserValid.error.issues[0].message,
    };
  }

  const { name, email, password, confirmPassword } = isUserValid.data;

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const hashedPassword = await hashPassword(password);
  try {
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    return {
      success: true,
      data: user,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: "User already exists",
        };
      }
    }
    return {
      error: "Failed to create user",
    };
  }
};
