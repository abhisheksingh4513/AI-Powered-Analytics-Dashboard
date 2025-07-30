"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp, 
  ArrowUpIcon,
  ArrowDownIcon 
} from "lucide-react";
import { MetricCard } from "@/lib/data";

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
};

const colorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500", 
  purple: "bg-purple-500",
  orange: "bg-orange-500",
};

interface MetricCardsProps {
  metrics: MetricCard[];
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon as keyof typeof iconMap];
        const isPositive = metric.change > 0;
        
        return (
          <Card 
            key={index} 
            className="transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4"
            style={{ borderLeftColor: `var(--${metric.color}-500)` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${colorMap[metric.color]} bg-opacity-10`}>
                <Icon className={`h-4 w-4 text-${metric.color}-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 text-red-500" />
                )}
                <Badge 
                  variant={isPositive ? "default" : "destructive"}
                  className="text-xs"
                >
                  {isPositive ? "+" : ""}{metric.change}%
                </Badge>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
