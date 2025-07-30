"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { MetricCards } from "@/components/metric-cards";
import { ChartComponents } from "@/components/chart-components";
import { DataTable } from "@/components/data-table";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { WebsiteInsightsPromo } from "@/components/website-insights-promo";
import { useStorageCleanup } from "@/lib/storage-utils";
import {
  metricsData,
  revenueData,
  userEngagementData,
  trafficSourcesData,
  campaignTableData,
} from "@/lib/data";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Clean up storage on component mount
  useStorageCleanup();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-6">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground">
              Monitor your digital marketing performance with real-time insights
            </p>
          </div>

          {/* Website Insights Promo */}
          <WebsiteInsightsPromo />

          {/* Metrics Cards */}
          <MetricCards metrics={metricsData} />

          {/* Charts Section */}
          <ChartComponents
            revenueData={revenueData}
            userEngagementData={userEngagementData}
            trafficSourcesData={trafficSourcesData}
          />

          {/* Data Table */}
          <DataTable data={campaignTableData} />
        </div>
      </main>
    </div>
  );
}
