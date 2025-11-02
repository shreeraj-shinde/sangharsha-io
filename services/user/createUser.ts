"use server";

import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const createUser = async (userData: z.infer<typeof userSchema>) => {
  const isUserValid = userSchema.safeParse(userData);

  if (!isUserValid.success) {
    return {
      error: isUserValid.error.issues[0].message,
    };
  }

  const { name, email, password } = isUserValid.data;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
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
