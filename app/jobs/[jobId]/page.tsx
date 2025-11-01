'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';
import { mockJobs } from '@/lib/mockData';
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Target,
  CheckCircle2,
  ArrowLeft,
  Bookmark,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const JobDetailsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  
  const job = mockJobs.find(j => j.id === params.jobId) || mockJobs[0];

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-5xl">{job.logo}</div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                    <p className="text-xl text-muted-foreground mb-4">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
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

                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="text-base px-3 py-1" variant="secondary">
                        {job.salary}
                      </Badge>
                      <Badge variant="outline">{job.experience}</Badge>
                      <Badge variant="outline">{job.platform}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {job.description.split('\n\n').map((paragraph, idx) => (
                    <div key={idx} className="mb-4">
                      {paragraph.split('\n').map((line, lineIdx) => (
                        <p key={lineIdx} className="mb-2 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Fit Panel */}
            <Card className="border-2 border-primary">
              <CardHeader className="gradient-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  AI Match Score
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold gradient-text mb-2">{job.matchPercentage}%</div>
                  <p className="text-sm text-muted-foreground">Profile Match</p>
                </div>

                <Progress value={job.matchPercentage} className="h-3 mb-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Skills Match</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience Match</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location Match</span>
                    <span className="font-medium">100%</span>
                  </div>
                </div>

                <Button className="w-full gradient-primary text-white mb-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve Resume for this Job
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gradient-primary text-white">
                  Apply with Saarthi
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on {job.platform}
                </Button>
              </CardContent>
            </Card>

            {/* Keywords Match */}
            <Card>
              <CardHeader>
                <CardTitle>Keyword Overlap</CardTitle>
                <CardDescription>
                  Skills from job description vs. your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {job.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.company} is a leading technology company focused on innovation and excellence.
                  Join a team of talented professionals working on cutting-edge projects.
                </p>
                <Button variant="outline" className="w-full">
                  View Company Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
