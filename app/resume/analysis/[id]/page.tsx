'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import { mockResumes } from '@/lib/mockData';
import {
  FileText,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

const ResumeAnalysisPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  
  const resume = mockResumes[0];

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
          <p className="text-muted-foreground">
            Detailed AI-powered analysis of your resume
          </p>
        </div>

        {/* Summary Panel */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{resume.atsScore}%</div>
                <p className="text-sm text-muted-foreground">ATS Score</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{resume.detectedRole}</div>
                <p className="text-sm text-muted-foreground">Detected Role</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{resume.wordCount}</div>
                <p className="text-sm text-muted-foreground">Word Count</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* File Info */}
            <Card>
              <CardHeader>
                <CardTitle>Resume File</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-medium">{resume.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Keyword Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Keyword Analysis
                </CardTitle>
                <CardDescription>
                  Keywords found vs. missing for your target role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Present Keywords</span>
                    <Badge variant="default">{resume.keywords.present.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resume.keywords.present.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Missing Keywords</span>
                    <Badge variant="destructive">{resume.keywords.missing.length}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resume.keywords.missing.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resume Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Checklist</CardTitle>
                <CardDescription>
                  {resume.checklist.filter(item => item.completed).length} of{' '}
                  {resume.checklist.length} items completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resume.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      {item.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          item.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Improvement Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Improvement Suggestions
                </CardTitle>
                <CardDescription>
                  Actionable steps to boost your ATS score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resume.improvements.map((improvement, idx) => (
                    <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className={
                            improvement.priority === 'high'
                              ? 'border-red-500 text-red-700'
                              : improvement.priority === 'medium'
                              ? 'border-yellow-500 text-yellow-700'
                              : 'border-blue-500 text-blue-700'
                          }
                        >
                          {improvement.priority.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-green-600 font-medium">
                          {improvement.impact}
                        </span>
                      </div>
                      <p className="text-sm mb-1">
                        <strong>{improvement.type.charAt(0).toUpperCase() + improvement.type.slice(1)}:</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="gradient-primary text-white border-0">
              <CardHeader>
                <CardTitle>Ready to Improve?</CardTitle>
                <CardDescription className="text-white/90">
                  Download your analysis or get help from Saarthi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full text-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white/20">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Chat with Saarthi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisPage;
