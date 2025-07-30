"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRight, Zap, BarChart3, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export function WebsiteInsightsPromo() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Globe className="h-20 w-20 text-blue-600 transform rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10">
          <BarChart3 className="h-16 w-16 text-purple-600 transform -rotate-12" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TrendingUp className="h-24 w-24 text-indigo-600 transform rotate-45" />
        </div>
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
                Website Insights Analyzer
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Get comprehensive analytics for any website
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            <Zap className="h-3 w-3 mr-1" />
            New Feature
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Target className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Performance Scores</p>
              <p className="text-xs text-muted-foreground">Speed & SEO analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Traffic Analytics</p>
              <p className="text-xs text-muted-foreground">Visitor insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Page Performance</p>
              <p className="text-xs text-muted-foreground">Top pages breakdown</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-blue-800 dark:text-blue-200 mb-4 leading-relaxed">
            Analyze any website to get detailed insights including performance metrics, SEO scores, 
            traffic sources, and page analytics. Perfect for competitor analysis, client audits, 
            or monitoring your own websites.
          </p>
          
          {/* Demo Sites Preview */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Try with:</span>
            <div className="flex gap-1">
              {["GitHub", "Netflix", "Shopify"].map((site) => (
                <Badge key={site} variant="outline" className="text-xs">
                  {site}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">+ 3 more</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
            <Link href="/website-insights" className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Test Website Insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Small print */}
        <div className="text-center">
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
            Demo mode with simulated data • Real-time analysis simulation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
