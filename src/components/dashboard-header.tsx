"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell, Settings, User, Activity, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateRealtimeData } from "@/lib/data";
import Link from "next/link";

export function DashboardHeader() {
  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 2500,
    revenue: 75000,
    conversions: 15
  });
  const [isLive, setIsLive] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setRealtimeData(generateRealtimeData());
  }, []);

  useEffect(() => {
    if (!isLive || !isClient) return;

    const interval = setInterval(() => {
      setRealtimeData(generateRealtimeData());
    }, 10000); // Update every 10 seconds instead of 5 to reduce memory usage

    return () => clearInterval(interval);
  }, [isLive, isClient]);

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">ADmyBRAND Insights</h1>
                <p className="text-sm text-muted-foreground">Analytics Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Real-time indicators */}
            <Card className="px-3 py-2">
              <CardContent className="p-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-xs font-medium">
                    {isLive ? 'LIVE' : 'PAUSED'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Active Users: <span className="font-semibold text-foreground">
                    {isClient ? realtimeData.activeUsers.toLocaleString() : "2,500"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Revenue: <span className="font-semibold text-green-600">
                    ${isClient ? realtimeData.revenue.toLocaleString() : "75,000"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Pause' : 'Resume'} Live Data
            </Button>

            <Button variant="outline" size="sm" asChild>
              <Link href="/website-insights" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website Insights
              </Link>
            </Button>

            <ThemeToggle />
            
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
