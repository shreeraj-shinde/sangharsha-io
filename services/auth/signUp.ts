import z from "zod";
import api from "@/lib/api";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
});

export const signUp = async (userData: z.infer<typeof signUpSchema>) => {
  // validate user data
  const isUserValid = signUpSchema.safeParse(userData);

  // if user data is not valid, return error
  if (!isUserValid.success) {
    return {
      error: isUserValid.error.issues[0].message,
    };
  }

  try {
    const response = await api.post("/auth/signup", userData);
    return {
      success: true,
      data: response.data.user,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to create user";
    return {
      error: errorMessage,
    };
  }
};
