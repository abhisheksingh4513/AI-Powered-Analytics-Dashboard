"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { QuickAnalyze } from "@/components/quick-analyze";
import { 
  Globe, 
  Search, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

export interface WebsiteInsights {
  url: string;
  title: string;
  status: "online" | "offline" | "slow";
  loadTime: number;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: { page: string; views: number }[];
  trafficSources: { source: string; percentage: number }[];
  performanceScore: number;
  seoScore: number;
  lastUpdated: string;
}

interface WebsiteIntegrationProps {
  onWebsiteAnalyzed: (insights: WebsiteInsights) => void;
}

export function WebsiteIntegration({ onWebsiteAnalyzed }: WebsiteIntegrationProps) {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteInsights | null>(null);
  const [error, setError] = useState("");

  // Mock website analysis function - in real app, this would call an API
  const analyzeWebsite = async (websiteUrl: string): Promise<WebsiteInsights> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract domain for display
    const domain = new URL(websiteUrl).hostname;
    
    // Generate mock data based on the URL
    const mockInsights: WebsiteInsights = {
      url: websiteUrl,
      title: `${domain.replace('www.', '').split('.')[0]} Analytics`,
      status: Math.random() > 0.1 ? "online" : "slow",
      loadTime: Math.round((Math.random() * 3 + 0.5) * 100) / 100,
      pageViews: Math.floor(Math.random() * 50000) + 10000,
      uniqueVisitors: Math.floor(Math.random() * 25000) + 5000,
      bounceRate: Math.round((Math.random() * 40 + 30) * 100) / 100,
      avgSessionDuration: `${Math.floor(Math.random() * 5 + 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      topPages: [
        { page: "/", views: Math.floor(Math.random() * 5000) + 2000 },
        { page: "/about", views: Math.floor(Math.random() * 2000) + 500 },
        { page: "/products", views: Math.floor(Math.random() * 3000) + 1000 },
        { page: "/contact", views: Math.floor(Math.random() * 1000) + 200 }
      ],
      trafficSources: [
        { source: "Organic Search", percentage: Math.floor(Math.random() * 30) + 40 },
        { source: "Direct", percentage: Math.floor(Math.random() * 20) + 20 },
        { source: "Social Media", percentage: Math.floor(Math.random() * 15) + 10 },
        { source: "Referral", percentage: Math.floor(Math.random() * 10) + 5 }
      ],
      performanceScore: Math.floor(Math.random() * 30) + 70,
      seoScore: Math.floor(Math.random() * 25) + 75,
      lastUpdated: new Date().toISOString()
    };

    return mockInsights;
  };

  const handleAnalyze = async () => {
    if (!url) {
      setError("Please enter a website URL");
      return;
    }

    await analyzeUrl(url);
  };

  const analyzeUrl = async (websiteUrl: string) => {
    // Basic URL validation
    try {
      new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      const normalizedUrl = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
      const insights = await analyzeWebsite(normalizedUrl);
      setCurrentWebsite(insights);
      onWebsiteAnalyzed(insights);
      setUrl(normalizedUrl); // Update the input with the normalized URL
    } catch (error) {
      setError("Failed to analyze website. Please try again.");
      console.error("Website analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "slow": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "offline": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "slow": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "offline": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Website Integration</CardTitle>
          </div>
          <CardDescription>
            Analyze any website to get real-time insights and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="website-url" className="text-sm font-medium">
              Website URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="website-url"
                placeholder="Enter website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                disabled={isAnalyzing}
                className="flex-1"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !url}
                className="gap-2"
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing website performance...
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          )}

          {/* Results */}
          {currentWebsite && !isAnalyzing && (
            <div className="space-y-6">
              {/* Website Header */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(currentWebsite.status)}
                    <h3 className="font-semibold">{currentWebsite.title}</h3>
                  </div>
                  <Badge className={getStatusColor(currentWebsite.status)}>
                    {currentWebsite.status.toUpperCase()}
                  </Badge>
                </div>
                <a
                  href={currentWebsite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Visit Site <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Page Views</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{currentWebsite.pageViews.toLocaleString()}</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900 dark:text-green-300">Unique Visitors</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{currentWebsite.uniqueVisitors.toLocaleString()}</p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Bounce Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{currentWebsite.bounceRate}%</p>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-300">Avg. Session</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{currentWebsite.avgSessionDuration}</p>
                </div>
              </div>

              {/* Performance Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Performance Score</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentWebsite.performanceScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-blue-600">{currentWebsite.performanceScore}/100</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">SEO Score</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${currentWebsite.seoScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-green-600">{currentWebsite.seoScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Top Pages */}
              <div className="space-y-3">
                <h4 className="font-medium">Top Pages</h4>
                <div className="space-y-2">
                  {currentWebsite.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="font-mono text-sm">{page.page}</span>
                      <Badge variant="secondary">{page.views.toLocaleString()} views</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="space-y-3">
                <h4 className="font-medium">Traffic Sources</h4>
                <div className="space-y-2">
                  {currentWebsite.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-sm">{source.source}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{source.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-xs text-muted-foreground text-center">
                Last updated: {new Date(currentWebsite.lastUpdated).toLocaleString()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Quick Analyze Section */}
      <QuickAnalyze onAnalyze={analyzeUrl} isAnalyzing={isAnalyzing} />
    </div>
  );
}
