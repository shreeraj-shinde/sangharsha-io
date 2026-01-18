"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockTestimonials } from "@/lib/mockData";
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
  Award,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32 hero-gradient-bg">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400/20 to-amber-400/20 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/15 to-amber-500/15 blur-2xl animate-float-delayed" />
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block mb-6 animate-slide-up">
            <span className="gradient-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover-glow cursor-default inline-flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Powered by AI • Built by Swarajya Labs
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up-delay-1 leading-tight">
            From <span className="gradient-text-animated">Sangharsha</span> to
            Success.
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up-delay-2 leading-relaxed">
            Transform your job search with AI-powered resume analysis,
            intelligent job matching, and your personal career guide -{" "}
            <span className="font-semibold text-foreground">Saarthi</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-3">
            <Link href="/signup">
              <Button
                size="lg"
                className="gradient-primary text-white w-full sm:w-auto text-lg px-8 py-6 hover-glow animate-pulse-glow group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-6 hover-lift border-2"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto animate-slide-up-delay-4">
            <div className="text-center p-6 rounded-2xl glass hover-lift cursor-default">
              <div className="text-4xl md:text-5xl font-bold gradient-text-animated mb-2">
                10K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Resumes Analyzed
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl glass hover-lift cursor-default">
              <div className="text-4xl md:text-5xl font-bold gradient-text-animated mb-2">
                95%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Success Rate
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl glass hover-lift cursor-default">
              <div className="text-4xl md:text-5xl font-bold gradient-text-animated mb-2">
                5K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Jobs Matched
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-12 animate-slide-up-delay-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm">24/7 AI Support</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold gradient-text uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Three simple steps to accelerate your career journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-subtle shadow-lg">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold gradient-text mb-2">01</div>
                <CardTitle className="text-xl">Upload Resume</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base">
                  Upload your resume in any format. Our AI instantly analyzes it
                  for ATS compatibility, keywords, and structure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-subtle shadow-lg">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold gradient-text mb-2">02</div>
                <CardTitle className="text-xl">Get Insights</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base">
                  Receive detailed analysis with ATS scores, missing keywords,
                  and actionable suggestions to improve your resume.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover-lift group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-subtle shadow-lg">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold gradient-text mb-2">03</div>
                <CardTitle className="text-xl">Match & Apply</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base">
                  Get matched with relevant jobs based on your skills. Let
                  Saarthi help you apply with optimized applications.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 hero-gradient-bg opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold gradient-text uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything you need to land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover-lift group border-2 hover:border-orange-500/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">AI Resume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get instant ATS score, keyword analysis, and personalized
                  improvement suggestions powered by advanced AI.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift group border-2 hover:border-orange-500/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Smart Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Find jobs that match your skills with AI-powered matching. See
                  your compatibility score for each role.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift group border-2 hover:border-orange-500/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Saarthi - AI Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your personal AI career coach available 24/7 to answer
                  questions and guide your job search journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift group border-2 hover:border-orange-500/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Resume Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get specific, actionable recommendations to improve your
                  resume for target roles and industries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift group border-2 hover:border-orange-500/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">ATS Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Ensure your resume passes Applicant Tracking Systems with our
                  specialized formatting and keyword analysis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover-lift group border-2 hover:border-orange-500/30 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">Auto-Apply Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Let our AI agent help you apply to multiple jobs efficiently
                  with tailored applications for each role.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold gradient-text uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join thousands who have transformed their career with Sangharsha
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="hover-lift group border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="font-medium">
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 hero-gradient-bg" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="gradient-primary text-white border-0 max-w-4xl mx-auto overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-amber-600/20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <CardHeader className="text-center relative z-10 pt-12">
              <CardTitle className="text-4xl md:text-5xl mb-4 font-bold">
                Ready to Transform Your Career?
              </CardTitle>
              <CardDescription className="text-white/90 text-xl max-w-2xl mx-auto">
                Join Sangharsha today and let Saarthi guide you from struggle to
                success.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10 pb-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-primary font-semibold text-lg px-10 py-6 hover-lift shadow-xl"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
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
