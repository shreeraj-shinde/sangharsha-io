import api from "@/lib/api";
import { z } from "zod";

const sendOtpSchema = z.object({
  countryCode: z.string().min(1),
  phone: z.string().min(10),
});

const verifyOtpSchema = z.object({
  countryCode: z.string().min(1),
  phone: z.string().min(10),
  code: z.string().length(6),
});

interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * Sends an OTP to the given phone number.
 */
export const sendOtp = async (
  data: z.infer<typeof sendOtpSchema>,
): Promise<ApiResponse> => {
  const validated = sendOtpSchema.parse(data);
  const response = await api.post<ApiResponse>("/verify/send-otp", validated);
  return response.data;
};

/**
 * Verifies the OTP entered by the user.
 */
export const verifyOtp = async (
  data: z.infer<typeof verifyOtpSchema>,
): Promise<ApiResponse> => {
  const validated = verifyOtpSchema.parse(data);
  const response = await api.post<ApiResponse>("/verify/check-otp", validated);
  return response.data;
};
