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
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session?.user?.name || "User"} 👋
          </h1>
          <p className="text-muted-foreground">
            "Every expert was once a beginner. Keep pushing forward!"
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resume Score</p>
                  <p className="text-2xl font-bold">{resume.atsScore}/100</p>
                </div>
                <div className="gradient-primary rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applied Jobs</p>
                  <p className="text-2xl font-bold">{mockUser.appliedJobs}</p>
                </div>
                <div className="gradient-primary rounded-full p-3">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Job Matches</p>
                  <p className="text-2xl font-bold">{mockJobs.length}</p>
                </div>
                <div className="gradient-primary rounded-full p-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Improvements</p>
                  <p className="text-2xl font-bold">
                    {resume.improvements.length}
                  </p>
                </div>
                <div className="gradient-primary rounded-full p-3">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Analysis Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resume Analysis</CardTitle>
                    <CardDescription>
                      Your latest resume analysis results
                    </CardDescription>
                  </div>
                  <Link href="/resume/upload">
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-medium">{resume.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on{" "}
                        {new Date(resume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={resume.atsScore >= 80 ? "default" : "secondary"}
                    className="text-lg px-3 py-1"
                  >
                    {resume.atsScore}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ATS Compatibility
                    </span>
                    <span className="font-medium">{resume.atsScore}%</span>
                  </div>
                  <Progress value={resume.atsScore} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Detected Role
                    </p>
                    <p className="font-medium">{resume.detectedRole}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Word Count
                    </p>
                    <p className="font-medium">{resume.wordCount} words</p>
                  </div>
                </div>

                <Link href={`/resume/analysis/${resume.id}`}>
                  <Button className="w-full gradient-primary text-white">
                    View Full Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recommended Jobs</CardTitle>
                    <CardDescription>
                      Top matches based on your profile
                    </CardDescription>
                  </div>
                  <Link href="/jobs">
                    <Button size="sm" variant="ghost">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockJobs.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{job.logo}</div>
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <Badge className="gradient-primary text-white">
                        {job.matchPercentage}% Match
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.postedDate}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.slice(0, 4).map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/jobs/${job.id}`}>
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saarthi Chat Button */}
            <Card className="gradient-primary text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Chat with Saarthi</h3>
                    <p className="text-sm opacity-90">Your AI career guide</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  variant="secondary"
                  className="w-full text-primary"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Checklist</CardTitle>
                <CardDescription>
                  {resume.checklist.filter((item) => item.completed).length} of{" "}
                  {resume.checklist.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={completionPercentage} className="h-2 mb-4" />
                {resume.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <CheckCircle2
                      className={`h-5 w-5 mt-0.5 ${
                        item.completed
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        item.completed
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.item}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/resume/upload">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resume
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
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
          className="fixed bottom-6 right-6 gradient-primary text-white rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default DashboardPage;
