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
  const [selectedFile, setSelectedFile] = useState(null);
  const [preferences, setPreferences] = useState<Preferences>({
    fullTime: true,
    partTime: false,
    remote: true,
    onsite: true,
    hybrid: true,
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
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
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="gradient-primary rounded-lg p-2">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-2xl gradient-text">Sangharsha</span>
          </div>
          <CardTitle className="text-center">
            Welcome! Let's Get Started
          </CardTitle>
          <CardDescription className="text-center">
            Step {currentStep} of {totalSteps}
          </CardDescription>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>

        <CardContent className="pt-6">
          {/* Step 1: Upload Resume */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-muted-foreground">
                  Let's start by analyzing your resume to provide personalized
                  recommendations
                </p>
              </div>

              {!selectedFile ? (
                <div className="border-2 border-dashed rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your resume or click to browse
                  </p>
                  <label htmlFor="resume-upload">
                    <Button asChild>
                      <span>Choose File</span>
                    </Button>
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
                <div className="border rounded-lg p-6 bg-muted/50">
                  <div className="flex items-center justify-center space-x-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={!selectedFile}
                className="w-full gradient-primary text-white"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Analysis Summary */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resume Analyzed!</h3>
                <p className="text-muted-foreground">
                  Here's a quick summary of your resume
                </p>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold gradient-text mb-2">
                        75%
                      </div>
                      <p className="text-sm text-muted-foreground">ATS Score</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">8/10</div>
                        <p className="text-sm text-muted-foreground">
                          Checklist Items
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">3</div>
                        <p className="text-sm text-muted-foreground">
                          Improvements
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Quick Tip:</strong> Adding TypeScript and Next.js
                    to your skills could increase your ATS score by 5 points!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 gradient-primary text-white"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Job Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Set Your Preferences
                </h3>
                <p className="text-muted-foreground">
                  Tell us what kind of opportunities you're looking for
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Job Type
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fullTime"
                        checked={preferences.fullTime}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, fullTime: checked })
                        }
                      />
                      <label
                        htmlFor="fullTime"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Full-time
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="partTime"
                        checked={preferences.partTime}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, partTime: checked })
                        }
                      />
                      <label
                        htmlFor="partTime"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Part-time
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Work Location
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={preferences.remote}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, remote: checked })
                        }
                      />
                      <label
                        htmlFor="remote"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Remote
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="onsite"
                        checked={preferences.onsite}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, onsite: checked })
                        }
                      />
                      <label
                        htmlFor="onsite"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Onsite
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hybrid"
                        checked={preferences.hybrid}
                        onCheckedChange={(checked: boolean) =>
                          setPreferences({ ...preferences, hybrid: checked })
                        }
                      />
                      <label
                        htmlFor="hybrid"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Hybrid
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 gradient-primary text-white"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Finish */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  You're All Set! 🎉
                </h3>
                <p className="text-muted-foreground">
                  Welcome to Sangharsha. Let's transform your career journey
                  together.
                </p>
              </div>

              <Card className="gradient-primary text-white border-0">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">What's Next?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Browse personalized job recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Improve your resume with AI suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Chat with Saarthi for career guidance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Track your job applications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleFinish}
                  className="flex-1 gradient-primary text-white"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
