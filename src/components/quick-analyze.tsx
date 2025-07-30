"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Star } from "lucide-react";

interface QuickAnalyzeProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const popularWebsites = [
  {
    name: "GitHub",
    url: "https://github.com",
    category: "Development",
    description: "The world's leading software development platform",
    icon: "💻"
  },
  {
    name: "Netflix",
    url: "https://netflix.com",
    category: "Entertainment",
    description: "Global streaming entertainment service",
    icon: "🎬"
  },
  {
    name: "Shopify",
    url: "https://shopify.com",
    category: "E-commerce",
    description: "Leading commerce platform for businesses",
    icon: "🛒"
  },
  {
    name: "Medium",
    url: "https://medium.com",
    category: "Publishing",
    description: "Online publishing platform for writers",
    icon: "✍️"
  },
  {
    name: "Spotify",
    url: "https://spotify.com",
    category: "Music",
    description: "Digital music streaming service",
    icon: "🎵"
  },
  {
    name: "Airbnb",
    url: "https://airbnb.com",
    category: "Travel",
    description: "Online marketplace for accommodations",
    icon: "🏠"
  }
];

export function QuickAnalyze({ onAnalyze, isAnalyzing }: QuickAnalyzeProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <CardTitle>Quick Analyze</CardTitle>
        </div>
        <CardDescription>
          Try analyzing popular websites to see the dashboard in action
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularWebsites.map((website, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-background to-muted/20 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{website.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{website.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {website.category}
                    </Badge>
                  </div>
                </div>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                {website.description}
              </p>
              
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={() => onAnalyze(website.url)}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              Demo Mode
            </span>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            This feature uses simulated data for demonstration purposes. In a real application, 
            this would integrate with analytics APIs like Google Analytics, web scraping services, 
            or performance monitoring tools to provide actual website insights.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
