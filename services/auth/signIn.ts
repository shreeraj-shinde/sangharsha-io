"use server";

import { z } from "zod";
import { getUserByEmail } from "../user/getUserbyEmail";
import { comparePassword } from "@/utils/auth";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const isUserValid = signInSchema.safeParse(credentials);

  if (!isUserValid.success) {
    return {
      error: isUserValid.error.issues[0].message,
    };
  }

  const { email, password } = isUserValid.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return {
      error: "Invalid password",
    };
  }

  return {
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};
