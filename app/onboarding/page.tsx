"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Upload,
  FileCheck,
  Briefcase,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  HardDrive,
  Link as LinkIcon,
  Unlink,
  Loader2,
} from "lucide-react";

interface Preferences {
  fullTime: boolean;
  partTime: boolean;
  remote: boolean;
  onsite: boolean;
  hybrid: boolean;
}

const OnboardingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    fullTime: true,
    partTime: false,
    remote: true,
    onsite: true,
    hybrid: true,
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  if (status === "unauthenticated") {
    // In a real app we might redirect or show a loader
    router.push("/login");
    return null;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    toast.success("Welcome to Sangharsha! 🎉");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient-bg px-4 py-8">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl animate-float-delayed" />

      <Card className="w-full max-w-2xl glass border-0 shadow-2xl backdrop-blur-xl bg-white/40 dark:bg-black/40 animate-slide-up">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center space-x-2 mb-4 animate-fade-in">
            <div className="gradient-primary rounded-xl p-2.5 shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-2xl gradient-text">Sangharsha</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome! Let's Get Started
          </CardTitle>
          <CardDescription className="text-base">
            Step {currentStep} of {totalSteps}
          </CardDescription>
          <div className="mt-6 relative pt-2">
            <Progress value={progress} className="h-2.5" />
          </div>
        </CardHeader>

        <CardContent className="pt-6 min-h-[400px] flex flex-col justify-between">
          {/* Step 1: Upload Resume */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg hover-glow transition-all">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Let's start by analyzing your resume to provide personalized
                  recommendations
                </p>
              </div>

              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-10 text-center hover:bg-white/30 dark:hover:bg-black/20 transition-all cursor-pointer group hover:border-orange-500/50">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                  <p className="text-sm font-medium text-muted-foreground mb-4 group-hover:text-foreground">
                    Drag and drop your resume or click to browse
                  </p>
                  <label htmlFor="resume-upload">
                    <div className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gradient-primary text-white cursor-pointer hover:shadow-lg hover:shadow-orange-500/25">
                      Choose File
                    </div>
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleFileSelect}
                  />
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported: PDF, DOCX, TXT (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="border border-green-200 dark:border-green-900 rounded-xl p-6 bg-green-50/50 dark:bg-green-900/10 animate-scale-in">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB • Ready to
                        upload
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Analysis Summary */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse-glow">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Resume Analyzed!</h3>
                <p className="text-muted-foreground">
                  Here's a quick summary of your resume
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border shadow-sm hover:shadow-md transition-all bg-white/50 dark:bg-black/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold gradient-text mb-2 animate-scale-in">
                        75%
                      </div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        ATS Score
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border shadow-sm hover:shadow-md transition-all bg-white/50 dark:bg-black/20">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">8/10</div>
                        <p className="text-xs font-medium text-muted-foreground">
                          CHECKLIST ITEMS
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-sm hover:shadow-md transition-all bg-white/50 dark:bg-black/20">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">3</div>
                        <p className="text-xs font-medium text-muted-foreground">
                          IMPROVEMENTS
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                  <p className="text-sm text-foreground/80">
                    💡 <strong>Quick Tip:</strong> Adding TypeScript and Next.js
                    to your skills could increase your ATS score by 5 points!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Job Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg hover-glow transition-all">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Set Your Preferences</h3>
                <p className="text-muted-foreground">
                  Tell us what kind of opportunities you're looking for
                </p>
              </div>

              <div className="space-y-6 bg-white/50 dark:bg-black/20 p-6 rounded-xl border shadow-sm">
                <div>
                  <Label className="text-base font-bold mb-4 block text-primary">
                    Job Type
                  </Label>
                  <div className="space-y-3 pl-1">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                      <Checkbox
                        id="fullTime"
                        checked={preferences.fullTime}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, fullTime: checked })
                        }
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                      />
                      <label
                        htmlFor="fullTime"
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        Full-time
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                      <Checkbox
                        id="partTime"
                        checked={preferences.partTime}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, partTime: checked })
                        }
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                      />
                      <label
                        htmlFor="partTime"
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        Part-time
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-bold mb-4 block text-primary">
                    Work Location
                  </Label>
                  <div className="space-y-3 pl-1">
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                      <Checkbox
                        id="remote"
                        checked={preferences.remote}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, remote: checked })
                        }
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                      />
                      <label
                        htmlFor="remote"
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        Remote
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                      <Checkbox
                        id="onsite"
                        checked={preferences.onsite}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, onsite: checked })
                        }
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                      />
                      <label
                        htmlFor="onsite"
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        Onsite
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                      <Checkbox
                        id="hybrid"
                        checked={preferences.hybrid}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, hybrid: checked })
                        }
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                      />
                      <label
                        htmlFor="hybrid"
                        className="text-sm font-medium cursor-pointer flex-1"
                      >
                        Hybrid
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Connect Google Drive */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg hover-glow transition-all">
                  <HardDrive className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Google Drive</h3>
                <p className="text-muted-foreground">
                  Link your Google Drive to easily access and manage your
                  resumes and documents
                </p>
              </div>

              <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/20">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center space-y-6">
                    {!isGoogleDriveConnected ? (
                      <>
                        <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md animate-float">
                          <svg
                            className="w-12 h-12"
                            viewBox="0 0 87.3 78"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                              fill="#0066da"
                            />
                            <path
                              d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                              fill="#00ac47"
                            />
                            <path
                              d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                              fill="#ea4335"
                            />
                            <path
                              d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
                              fill="#00832d"
                            />
                            <path
                              d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                              fill="#2684fc"
                            />
                            <path
                              d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                              fill="#ffba00"
                            />
                          </svg>
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-lg mb-1">
                            Google Drive
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Securely connect to access your documents
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            setIsConnecting(true);
                            // Simulate connection process
                            setTimeout(() => {
                              setIsGoogleDriveConnected(true);
                              setIsConnecting(false);
                              toast.success(
                                "Google Drive connected successfully!"
                              );
                            }, 1500);
                          }}
                          disabled={isConnecting}
                          className="gradient-primary text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all w-full max-w-xs h-11"
                        >
                          {isConnecting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <LinkIcon className="mr-2 h-4 w-4" />
                              Connect Google Drive
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-scale-in">
                          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                        </div>
                        <div className="text-center animate-fade-in">
                          <h4 className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
                            <span className="text-green-600 dark:text-green-500">
                              Connected
                            </span>
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Your Google Drive is linked to Sangharsha
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            setIsGoogleDriveConnected(false);
                            toast.info("Google Drive disconnected");
                          }}
                          variant="outline"
                          className="text-destructive border-destructive hover:bg-destructive/10 min-w-[150px]"
                        >
                          <Unlink className="mr-2 h-4 w-4" />
                          Disconnect
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-foreground/80">
                  💡 <strong>Why connect?</strong> Access your resumes directly
                  from Google Drive, automatically sync updated documents, and
                  keep all your career files organized in one place.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Finish */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce-subtle">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You're All Set! 🎉</h3>
                <p className="text-muted-foreground">
                  Welcome to Sangharsha. Let's transform your career journey
                  together.
                </p>
              </div>

              <Card className="gradient-primary text-white border-0 shadow-xl overflow-hidden relative group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <CardContent className="pt-6 relative z-10">
                  <h4 className="font-bold text-lg mb-4">What's Next?</h4>
                  <ul className="space-y-3 font-medium">
                    <li className="flex items-start">
                      <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span>Browse personalized job recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span>Improve your resume with AI suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span>Chat with Saarthi for career guidance</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 p-1 rounded-full mr-3 mt-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <span>Track your job applications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons - Always at the bottom */}
          <div className="pt-6 mt-auto">
            <div className="flex gap-4">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 hover:bg-gray-100 hover:text-foreground h-12 text-base transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {currentStep < 5 && (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !selectedFile}
                  className="flex-1 gradient-primary text-white shadow-lg hover:shadow-orange-500/25 h-12 text-base transition-all"
                >
                  {currentStep === 4 && !isGoogleDriveConnected
                    ? "Skip for Now"
                    : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {currentStep === 5 && (
                <Button
                  onClick={handleFinish}
                  className="flex-1 gradient-primary text-white shadow-lg hover:shadow-orange-500/25 h-12 text-base transition-all hover:scale-[1.02]"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
