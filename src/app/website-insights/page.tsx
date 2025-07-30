"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsiteIntegration, WebsiteInsights } from "@/components/website-integration";
import { WebsiteInsightsDashboard } from "@/components/website-insights-dashboard";
import { ArrowLeft, Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WebsiteInsightsPage() {
  const [websiteInsights, setWebsiteInsights] = useState<WebsiteInsights | null>(null);

  const handleWebsiteAnalyzed = (insights: WebsiteInsights) => {
    setWebsiteInsights(insights);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Website Insights</h1>
                  <p className="text-muted-foreground">
                    Analyze any website to get comprehensive performance insights
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Powered by AI Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          {!websiteInsights && (
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Welcome to Website Insights</CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  Enter any website URL below to get real-time analytics including performance metrics, 
                  SEO scores, traffic analysis, and detailed insights about page performance.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Performance Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Get detailed speed and optimization scores
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Traffic Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Understand visitor sources and behavior
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">SEO Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor search engine optimization
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Website Integration Component */}
          <WebsiteIntegration onWebsiteAnalyzed={handleWebsiteAnalyzed} />

          {/* Website Insights Dashboard - Show only if website has been analyzed */}
          {websiteInsights && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Analysis Results</h2>
                  <p className="text-muted-foreground">
                    Comprehensive insights for your analyzed website
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setWebsiteInsights(null)}
                  className="gap-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Analyze Another Website
                </Button>
              </div>
              <WebsiteInsightsDashboard insights={websiteInsights} />
            </div>
          )}

          {/* Features Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                What You Get
              </CardTitle>
              <CardDescription>
                Comprehensive website analysis with actionable insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Performance Metrics</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Page load times</li>
                    <li>• Performance scores</li>
                    <li>• Optimization recommendations</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Traffic Analysis</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Visitor demographics</li>
                    <li>• Traffic sources</li>
                    <li>• User behavior patterns</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">SEO Insights</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Search rankings</li>
                    <li>• Keyword analysis</li>
                    <li>• Technical SEO health</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Page Analytics</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Top performing pages</li>
                    <li>• Bounce rate analysis</li>
                    <li>• User engagement metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
