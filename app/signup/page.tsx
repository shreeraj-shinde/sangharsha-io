"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Loader2,
  ArrowRight,
  User,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { signUp } from "@/services/auth/signUp";
import { sendOtp, verifyOtp } from "@/services/auth/verify";
import { z } from "zod";

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

type Step = "form" | "otp";

const formDataSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Please enter a valid email"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
});

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /** Step 1: Validate form, send OTP */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validated = formDataSchema.safeParse(formData);
    if (!validated.success) {
      toast.error(validated.error.issues[0].message);
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (validated.data.password !== validated.data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await sendOtp({
        countryCode: validated.data.countryCode,
        phone: validated.data.phone,
      });
      toast.success("OTP sent to your phone number!");
      setStep("otp");
    } catch {
      toast.error("Failed to send OTP. Please check your phone number.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Step 2: Verify OTP, then register */
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const verifyResult = await verifyOtp({
        countryCode: formData.countryCode,
        phone: formData.phone,
        code: otp,
      });

      if (!verifyResult.success) {
        toast.error("Invalid or expired OTP. Please try again.");
        return;
      }

      // OTP verified — now register
      const response = await signUp({
        name: formData.name,
        email: formData.email,
        countryCode: formData.countryCode,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.success) {
        toast.success("Account created successfully!");
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          router.push("/login");
        } else {
          router.push("/onboarding");
        }
      } else {
        toast.error(response.error ?? "Registration failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Resend OTP */
  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await sendOtp({
        countryCode: formData.countryCode,
        phone: formData.phone,
      });
      toast.success("OTP resent!");
      setOtp("");
    } catch {
      toast.error("Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/onboarding" });
    } catch {
      toast.error("Google sign-in failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient-bg px-4 py-8">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl animate-float-delayed" />

      <div className="w-full max-w-5xl relative z-10 animate-slide-up">
        <Card className="glass border-0 shadow-2xl backdrop-blur-xl bg-white/40 dark:bg-black/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Branding & Info */}
            <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-orange-500/10 to-transparent border-r border-white/20">
              <div className="mb-12 animate-fade-in">
                <Link
                  href="/"
                  className="inline-flex items-center space-x-3 group cursor-pointer hover-lift"
                >
                  <div className="gradient-primary rounded-2xl p-3.5 shadow-xl group-hover:shadow-orange-500/20 transition-all duration-300">
                    <span className="text-white font-bold text-2xl">S</span>
                  </div>
                  <span className="font-bold text-3xl gradient-text">
                    Sangharsha
                  </span>
                </Link>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Begin Your <br />
                  <span className="gradient-text">Sangharsha 🚀</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
                  Join Saarthi today and experience a new era of guided success.
                  Your journey towards excellence starts with a single step.
                </p>

                <div className="pt-8 space-y-4">
                  {[
                    "Personalized Guidance",
                    "Success Tracking",
                    "Community Support",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 lg:p-12">
              {/* Mobile Logo */}
              <div className="lg:hidden mb-8 text-center animate-fade-in">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center space-x-2 group cursor-pointer hover-lift"
                >
                  <div className="gradient-primary rounded-xl p-2.5 shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <span className="font-bold text-2xl gradient-text">
                    Sangharsha
                  </span>
                </Link>
              </div>

              {step === "form" ? (
                <>
                  <div className="mb-8 lg:mb-10 text-center lg:text-left">
                    <CardTitle className="text-2xl font-bold mb-2">
                      Create Account
                    </CardTitle>
                    <CardDescription className="text-base">
                      Fill in your details to get started with Saarthi.
                    </CardDescription>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-9 bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-9 bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="countryCode">Code</Label>
                        <Select
                          value={formData.countryCode}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              countryCode: value,
                            }))
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300">
                            <SelectValue placeholder="+91" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91 (IN)</SelectItem>
                            <SelectItem value="+1">+1 (US)</SelectItem>
                            <SelectItem value="+44">+44 (UK)</SelectItem>
                            <SelectItem value="+977">+977 (NP)</SelectItem>
                            <SelectItem value="+61">+61 (AU)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-9 bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-9 bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="pl-9 bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={(checked: boolean) =>
                          setAcceptTerms(checked)
                        }
                        disabled={isLoading}
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-muted-foreground leading-none"
                      >
                        I accept the{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms
                        </Link>{" "}
                        &{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy
                        </Link>
                      </label>
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
                      <Button
                        type="submit"
                        className="w-full gradient-primary text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 h-11"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <div className="relative">
                        <Separator className="bg-gray-200 dark:bg-gray-800" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 px-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground backdrop-blur-sm rounded-full">
                          OR
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full bg-white/50 border-gray-200 hover:bg-white/80 transition-all duration-300 h-10 text-sm"
                          onClick={handleGoogleSignIn}
                          disabled={isLoading}
                        >
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                        <Link href="/login" className="w-full">
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full hover:bg-orange-50 transition-all duration-300 h-10 text-sm"
                            disabled={isLoading}
                          >
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                /* OTP Verification Step */
                <>
                  <div className="mb-8 lg:mb-10 text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary mb-4 shadow-lg">
                      <ShieldCheck className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">
                      Verify Your Phone
                    </CardTitle>
                    <CardDescription className="text-base">
                      We sent a 6-digit OTP to{" "}
                      <span className="font-semibold text-foreground">
                        {formData.countryCode} {formData.phone}
                      </span>
                      . Enter it below to continue.
                    </CardDescription>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="otp">One-Time Password</Label>
                      <Input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="123456"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        className="text-center text-2xl tracking-[0.5em] font-bold bg-white/50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 h-14"
                        disabled={isLoading}
                        autoFocus
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        OTP expires in 10 minutes
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button
                        type="submit"
                        className="w-full gradient-primary text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 h-11"
                        disabled={isLoading || otp.length !== 6}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Verify & Create Account
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-between">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setStep("form")}
                          disabled={isLoading}
                        >
                          ← Change number
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-orange-500 hover:text-orange-600"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                        >
                          <RefreshCw className="mr-1 h-3 w-3" />
                          Resend OTP
                        </Button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
