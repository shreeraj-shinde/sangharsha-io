'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { mockTestimonials } from '@/lib/mockData';
import {
  Upload,
  Search,
  Target,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium">
              Powered by AI • Built by Swarajya Labs
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            From <span className="gradient-text">Sangharsha</span> to Success.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your job search with AI-powered resume analysis, intelligent job matching,
            and your personal career guide - Saarthi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gradient-primary text-white w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold gradient-text">10K+</div>
              <div className="text-sm text-muted-foreground">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">5K+</div>
              <div className="text-sm text-muted-foreground">Jobs Matched</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to accelerate your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2">
              <CardHeader>
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <CardTitle>1. Upload Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload your resume in any format. Our AI instantly analyzes it for ATS compatibility,
                  keywords, and structure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <CardTitle>2. Get Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive detailed analysis with ATS scores, missing keywords, and actionable
                  suggestions to improve your resume.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle>3. Match & Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get matched with relevant jobs based on your skills. Let Saarthi help you apply
                  with optimized applications.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Resume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant ATS score, keyword analysis, and personalized improvement suggestions
                  powered by advanced AI.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Smart Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find jobs that match your skills with AI-powered matching. See your compatibility
                  score for each role.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Saarthi - AI Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your personal AI career coach available 24/7 to answer questions and guide your
                  job search journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Resume Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get specific, actionable recommendations to improve your resume for target roles
                  and industries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle>ATS Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ensure your resume passes Applicant Tracking Systems with our specialized
                  formatting and keyword analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Auto-Apply Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Let our AI agent help you apply to multiple jobs efficiently with tailored
                  applications for each role.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands who have transformed their career with Sangharsha
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-primary text-white border-0 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Ready to Transform Your Career?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Join Sangharsha today and let Saarthi guide you from struggle to success.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="text-primary">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
