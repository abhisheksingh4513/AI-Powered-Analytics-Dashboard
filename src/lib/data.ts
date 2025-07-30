export interface MetricCard {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

export interface ChartDataPoint {
  name: string;
  value?: number;
  date?: string;
  revenue?: number;
  users?: number;
  conversions?: number;
}

export interface TableRow {
  id: string;
  campaign: string;
  status: "active" | "paused" | "ended";
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate: string;
  category: "ecommerce" | "brand" | "lead-gen" | "awareness";
  platform: "google" | "facebook" | "instagram" | "linkedin" | "twitter";
}

// Mock metrics data
export const metricsData: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$2,847,590",
    change: 12.5,
    icon: "DollarSign",
    color: "green",
  },
  {
    title: "Active Users",
    value: "48,271",
    change: 8.2,
    icon: "Users",
    color: "blue",
  },
  {
    title: "Conversions",
    value: "3,842",
    change: -2.1,
    icon: "Target",
    color: "purple",
  },
  {
    title: "Growth Rate",
    value: "23.8%",
    change: 4.7,
    icon: "TrendingUp",
    color: "orange",
  },
];

// Revenue chart data (line chart)
export const revenueData: ChartDataPoint[] = [
  { name: "Jan", revenue: 186000 },
  { name: "Feb", revenue: 205000 },
  { name: "Mar", revenue: 178000 },
  { name: "Apr", revenue: 220000 },
  { name: "May", revenue: 245000 },
  { name: "Jun", revenue: 289000 },
  { name: "Jul", revenue: 315000 },
  { name: "Aug", revenue: 298000 },
  { name: "Sep", revenue: 342000 },
  { name: "Oct", revenue: 378000 },
  { name: "Nov", revenue: 395000 },
  { name: "Dec", revenue: 425000 },
];

// User engagement data (bar chart)
export const userEngagementData: ChartDataPoint[] = [
  { name: "Mon", users: 1200 },
  { name: "Tue", users: 1800 },
  { name: "Wed", users: 2400 },
  { name: "Thu", users: 2100 },
  { name: "Fri", users: 2800 },
  { name: "Sat", users: 1500 },
  { name: "Sun", users: 1100 },
];

// Traffic sources data (pie chart)
export const trafficSourcesData: ChartDataPoint[] = [
  { name: "Organic Search", value: 45 },
  { name: "Social Media", value: 25 },
  { name: "Direct", value: 15 },
  { name: "Email", value: 10 },
  { name: "Referral", value: 5 },
];

// Campaigns table data
export const campaignTableData: TableRow[] = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    status: "active",
    impressions: 125000,
    clicks: 3250,
    ctr: 2.6,
    cost: 5420,
    conversions: 78,
    roi: 240,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    category: "ecommerce",
    platform: "google",
  },
  {
    id: "2",
    campaign: "Black Friday Promo",
    status: "active",
    impressions: 98000,
    clicks: 2890,
    ctr: 2.95,
    cost: 4280,
    conversions: 102,
    roi: 315,
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    category: "ecommerce",
    platform: "facebook",
  },
  {
    id: "3",
    campaign: "Holiday Collection",
    status: "paused",
    impressions: 67000,
    clicks: 1560,
    ctr: 2.33,
    cost: 2890,
    conversions: 45,
    roi: 180,
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    category: "brand",
    platform: "instagram",
  },
  {
    id: "4",
    campaign: "Spring Launch",
    status: "ended",
    impressions: 156000,
    clicks: 4120,
    ctr: 2.64,
    cost: 6780,
    conversions: 134,
    roi: 285,
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    category: "ecommerce",
    platform: "google",
  },
  {
    id: "5",
    campaign: "Product Demo",
    status: "active",
    impressions: 89000,
    clicks: 2340,
    ctr: 2.63,
    cost: 3890,
    conversions: 67,
    roi: 225,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    category: "lead-gen",
    platform: "linkedin",
  },
  {
    id: "6",
    campaign: "Brand Awareness",
    status: "active",
    impressions: 234000,
    clicks: 5670,
    ctr: 2.42,
    cost: 8920,
    conversions: 189,
    roi: 290,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    category: "awareness",
    platform: "facebook",
  },
];

// Real-time metrics simulation
export const generateRealtimeData = () => {
  const now = new Date();
  return {
    timestamp: now.toISOString(),
    activeUsers: Math.floor(Math.random() * 1000) + 2000,
    revenue: Math.floor(Math.random() * 10000) + 50000,
    conversions: Math.floor(Math.random() * 20) + 5,
  };
};
