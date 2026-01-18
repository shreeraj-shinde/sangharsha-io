"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import ChatPanel from "@/components/chat/ChatPanel";
import { mockUser, mockJobs, mockResumes } from "@/lib/mockData";
import {
  Upload,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  FileText,
  Target,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Loader2,
} from "lucide-react";
import LLMTest from "@/components/chat/LLMTest";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center animate-fade-in">
          <div className="gradient-primary rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 animate-spin">
            <Loader2 className="h-6 w-6 text-white" />
          </div>
          <p className="text-muted-foreground font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const resume = mockResumes[0];
  const completionPercentage =
    (resume.checklist.filter((item) => item.completed).length /
      resume.checklist.length) *
    100;

  return (
    <div className="min-h-screen bg-muted/10 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-float-delayed" />

      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10 animate-slide-up">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Welcome back,{" "}
            <span className="gradient-text">
              {session?.user?.name || "User"}
            </span>{" "}
            👋
          </h1>
          <p className="text-muted-foreground text-lg">
            "Every expert was once a beginner. Keep pushing forward!"
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 animate-slide-up-delay-1">
          <Card className="hover-lift border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Resume Score
                  </p>
                  <p className="text-3xl font-bold">{resume.atsScore}/100</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-2xl p-3">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <LLMTest />
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Applied Jobs
                  </p>
                  <p className="text-3xl font-bold">{mockUser.appliedJobs}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-3">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Job Matches
                  </p>
                  <p className="text-3xl font-bold">{mockJobs.length}</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-3">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Improvements
                  </p>
                  <p className="text-3xl font-bold">
                    {resume.improvements.length}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-slide-up-delay-2">
            {/* Resume Analysis Card */}
            <Card className="shadow-md border-0 overflow-hidden group">
              <div className="h-1.5 w-full gradient-primary" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Zap className="h-5 w-5 text-orange-500 fill-orange-500" />
                      Resume Analysis
                    </CardTitle>
                    <CardDescription>
                      Your matched profile insights and score
                    </CardDescription>
                  </div>
                  <Link href="/resume/upload">
                    <Button
                      size="sm"
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{resume.fileName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Uploaded{" "}
                        {new Date(resume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={resume.atsScore >= 80 ? "default" : "secondary"}
                    className="text-lg px-4 py-1.5 rounded-full"
                  >
                    {resume.atsScore}% Score
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">
                      ATS Compatibility
                    </span>
                    <span className="font-bold text-foreground">
                      {resume.atsScore}%
                    </span>
                  </div>
                  <Progress value={resume.atsScore} className="h-2.5" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1">
                      Detected Role
                    </p>
                    <p className="font-semibold text-lg text-primary">
                      {resume.detectedRole}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-1">
                      Word Count
                    </p>
                    <p className="font-semibold text-lg">
                      {resume.wordCount} words
                    </p>
                  </div>
                </div>

                <Link href={`/resume/analysis/${resume.id}`}>
                  <Button className="w-full gradient-primary text-white shadow-lg hover:shadow-orange-500/25 transition-all text-base py-6 group/btn">
                    View Full Analysis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card className="shadow-md border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
                      Recommended Jobs
                    </CardTitle>
                    <CardDescription>
                      Top matches based on your skills & experience
                    </CardDescription>
                  </div>
                  <Link href="/jobs">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:text-primary"
                    >
                      View All
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockJobs.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="group border rounded-xl p-5 hover:border-orange-200 dark:hover:border-orange-900 transition-all hover:bg-orange-50/30 dark:hover:bg-orange-900/10 hover-lift relative bg-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm font-medium text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <Badge className="gradient-primary text-white border-0 shadow-sm">
                        {job.matchPercentage}% Match
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
                        <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                        {job.type}
                      </div>
                      <div className="flex items-center bg-muted/50 px-2 py-1 rounded-md">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        {job.postedDate}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 4).map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-background"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/jobs/${job.id}`}>
                      <Button
                        className="w-full bg-white dark:bg-black border hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 dark:border-gray-800 transition-colors"
                        variant="outline"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-slide-up-delay-3">
            {/* Saarthi Chat Button */}
            <Card
              className="gradient-primary text-white border-0 shadow-xl relative overflow-hidden group cursor-pointer hover-lift"
              onClick={() => setIsChatOpen(true)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
              <CardContent className="pt-8 pb-8 relative z-10 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-2xl mb-1">Chat with Saarthi</h3>
                <p className="text-white/90 mb-6 font-medium">
                  Your personal AI career guide
                </p>
                <Button
                  variant="secondary"
                  className="w-full text-primary font-bold shadow-lg h-12 text-lg hover:translate-y-px transition-all"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card className="shadow-md border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Resume Checklist</CardTitle>
                <CardDescription>
                  {resume.checklist.filter((item) => item.completed).length} of{" "}
                  {resume.checklist.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={completionPercentage} className="h-2" />
                <div className="space-y-3">
                  {resume.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 group">
                      <div
                        className={`mt-0.5 rounded-full p-0.5 ${
                          item.completed
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            item.completed
                              ? "text-green-600 dark:text-green-500"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm transition-colors ${
                          item.completed
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-md border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/resume/upload">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 text-base hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all dark:hover:bg-orange-900/20"
                  >
                    <Upload className="h-5 w-5 mr-3 text-muted-foreground" />
                    Upload Resume
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 text-base hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all dark:hover:bg-blue-900/20"
                  >
                    <Briefcase className="h-5 w-5 mr-3 text-muted-foreground" />
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 text-base hover:bg-gray-100 hover:text-foreground transition-all dark:hover:bg-gray-800"
                  >
                    <Target className="h-5 w-5 mr-3 text-muted-foreground" />
                    Update Preferences
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 gradient-primary text-white rounded-full h-16 w-16 shadow-2xl hover:scale-110 hover:shadow-orange-500/40 transition-all z-50 animate-bounce-subtle"
          size="icon"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      )}
    </div>
  );
};

export default DashboardPage;
