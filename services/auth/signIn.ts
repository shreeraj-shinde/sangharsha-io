import { z } from "zod";
import api from "@/lib/api";

const signInSchema = z.object({
  email: z.email(),
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

  try {
    const response = await api.post("/auth/login", credentials);
    return {
      success: true,
      data: response.data.user,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Invalid email or password";
    return {
      error: errorMessage,
    };
  }
};
