# ADmyBRAND Insights Dashboard

A modern, visually stunning analytics dashboard for digital marketing agencies built with Next.js 15, TypeScript, and shadcn/ui.

![Dashboard P### ChartComponents
Interactive data visualizations:
- Line Chart: Revenue trends over time
- Bar Chart: User engagement by day
- Pie Chart: Traffic sources distribution

### DataTable
Advanced campaign performance table with:
- Sorting by all columns
- Multi-level filtering
- Search functionality
- Pagination
- Export capabilities

### AdvancedFilters
Comprehensive filtering system:
- Date range selection
- Status filtering (Active, Paused, Ended)
- Category filtering (E-commerce, Brand, Lead-gen, Awareness)
- Platform filtering (Google, Facebook, Instagram, LinkedIn, Twitter)
- ROI and cost range filtering
- Real-time searchhttps://img.shields.io/badge/Status-Complete-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)

## 🚀 Features

### ✨ Core Dashboard Features
- **📊 Main Dashboard** - Comprehensive overview with key metrics and performance indicators
- **🌐 Website Insights** - Dedicated page for analyzing any website's performance metrics
- **📈 Interactive Charts** - Line charts, bar charts, and pie charts using Recharts
- **📋 Advanced Data Table** - Sortable, filterable campaign performance table
- **🎨 Responsive Design** - Optimized for desktop, tablet, and mobile
- **🌓 Dark/Light Mode** - Seamless theme switching with next-themes
- **⚡ Real-time Updates** - Live data simulation with smooth animations

### 🌐 Website Integration Features
- **🔍 URL Analysis** - Analyze any website by entering its URL
- **📊 Performance Metrics** - Page views, unique visitors, bounce rate, session duration
- **⚡ Performance Scores** - Website speed optimization ratings with visual progress bars
- **🔍 SEO Analysis** - Search engine optimization scores and recommendations
- **📈 Traffic Analytics** - Interactive charts showing traffic source breakdown
- **📄 Top Pages** - Analysis of most visited pages with performance data
- **⚡ Quick Demo** - Pre-configured popular websites for instant testing
- **🎯 Navigation** - Seamless navigation between dashboard and website insights

### 🔧 Advanced Features
- **🎛️ Advanced Filters** - Date ranges, status, category, platform, ROI, and cost filtering
- **📁 Export Functionality** - CSV and HTML/PDF export capabilities
- **💫 Loading Skeletons** - Beautiful loading states for enhanced UX
- **🔍 Search & Pagination** - Powerful data navigation and discovery
- **📱 Mobile-First** - Touch-friendly responsive design
- **♿ Accessibility** - ARIA labels and keyboard navigation support

### 🎯 Technical Highlights
- **⚡ Performance Optimized** - Efficient rendering and state management
- **🔒 Type Safety** - Full TypeScript implementation
- **🎨 Modern UI** - shadcn/ui components with Tailwind CSS
- **📦 Component Architecture** - Reusable, composable components
- **🗂️ Clean Code** - Well-organized file structure and best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript 5.0
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4.0
- **Charts**: Recharts 3.1.0
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Export**: jsPDF for PDF generation

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vibe_assignment
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── website-insights/  # Website analysis page
│   │   └── page.tsx       # Dedicated website insights dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main dashboard page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── advanced-filters.tsx       # Advanced filtering system
│   ├── chart-components.tsx       # Interactive charts
│   ├── dashboard-header.tsx       # Header with navigation
│   ├── data-table.tsx            # Campaign performance table
│   ├── metric-cards.tsx          # KPI metric cards
│   ├── website-integration.tsx    # Website URL analysis component
│   ├── website-insights-dashboard.tsx # Website analytics display
│   ├── website-insights-promo.tsx # CTA card for website insights
│   ├── quick-analyze.tsx         # Demo websites for testing
│   └── ...
├── lib/                   # Utilities and data
│   ├── data.ts           # Mock data and interfaces
│   ├── storage-utils.ts  # Storage management
│   └── utils.ts          # Utility functions
```

## 🎨 Key Components

### Dashboard Components
**MetricCards** - Displays key performance indicators with animated change indicators:
- Total Revenue
- Active Users  
- Conversions
- Growth Rate

**ChartComponents** - Interactive data visualizations:
- Line Chart: Revenue trends over time
- Bar Chart: User engagement by day
- Pie Chart: Traffic sources distribution

**DataTable** - Advanced campaign performance table with:
- Sorting by all columns
- Multi-level filtering
- Search functionality
- Pagination
- Export capabilities

**AdvancedFilters** - Comprehensive filtering system:
- Date range selection
- Status filtering (Active, Paused, Ended)
- Category filtering (E-commerce, Brand, Lead-gen, Awareness)
- Platform filtering (Google, Facebook, Instagram, LinkedIn, Twitter)
- ROI and cost range filtering
- Real-time search

### Website Insights Components
**WebsiteIntegration** - Main URL analysis component:
- URL input with validation
- Real-time analysis simulation
- Loading states and error handling
- Results display with metrics

**WebsiteInsightsDashboard** - Comprehensive analytics display:
- Performance metrics with gradient cards
- Interactive charts for traffic analysis
- SEO and speed score visualizations
- Top pages and traffic source breakdowns

**QuickAnalyze** - Demo section with popular websites:
- Pre-configured website examples
- One-click analysis for testing
- Category-based organization
- Visual website cards with descriptions

**WebsiteInsightsPromo** - Call-to-action card:
- Attractive promo design
- Navigation to website insights page
- Feature highlights and benefits

### ChartComponents
Interactive data visualizations:
- **Line Chart**: Revenue trends over time
- **Bar Chart**: User engagement by day
- **Pie Chart**: Traffic sources distribution

### DataTable
Advanced campaign performance table with:
- Sorting by all columns
- Multi-level filtering
- Search functionality
- Pagination
- Export capabilities

### AdvancedFilters
Comprehensive filtering system:
- Date range selection
- Status filtering (Active, Paused, Ended)
- Category filtering (E-commerce, Brand, Lead-gen, Awareness)
- Platform filtering (Google, Facebook, Instagram, LinkedIn, Twitter)
- ROI and cost range filtering
- Real-time search

### Website Integration Components
- **URL Analysis**: Input any website URL for real-time insights
- **Performance Metrics**: Page views, unique visitors, bounce rate, session duration
- **SEO & Speed Scores**: Website optimization ratings with visual progress bars
- **Traffic Analytics**: Source breakdown with interactive pie charts
- **Quick Demo**: Pre-configured popular websites (GitHub, Netflix, Shopify, etc.)
- **Visual Dashboard**: Dedicated insights page with comprehensive analytics
- **Navigation**: Seamless routing between main dashboard and website insights page

## 🚀 Navigation & User Flow

### Main Dashboard (`/`)
- Campaign performance overview
- Key metrics and charts
- Data table with advanced filtering
- Call-to-action card for website insights

### Website Insights (`/website-insights`)
- Dedicated page for website analysis
- URL input with validation
- Quick demo websites for testing
- Comprehensive analytics dashboard
- Back navigation to main dashboard

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop** (1200px+): Full layout with all features
- **Tablet** (768px-1199px): Adapted layout with touch optimizations  
- **Mobile** (320px-767px): Mobile-first design with collapsible components

## ⚡ Performance Features

- **Loading Skeletons**: Smooth loading states for better perceived performance
- **Lazy Loading**: Efficient component rendering
- **Optimized Images**: Next.js image optimization
- **Minimal Bundle**: Tree-shaking and code splitting
- **Fast Refresh**: Instant feedback during development

## 🔒 TypeScript Integration

Full TypeScript implementation with:
- **Strict Type Checking**: No any types, full type safety
- **Interface Definitions**: Well-defined data structures
- **Component Props**: Typed component interfaces
- **Utility Types**: Proper generic type usage

## 🎯 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: CSS Grid, Flexbox, ES2020+ features

## 📈 Future Enhancements

### Dashboard Features
- [ ] Real API integration for live data
- [ ] User authentication and role management
- [ ] Custom dashboard builder with drag-and-drop
- [ ] Data export scheduling and automation
- [ ] Multi-tenant support for agencies

### Website Insights Features
- [ ] Real-time website monitoring alerts
- [ ] Historical data tracking and trends
- [ ] Competitor website comparison
- [ ] Custom metrics and KPI definition
- [ ] Integration with Google Analytics, Search Console
- [ ] Performance optimization recommendations
- [ ] SEO audit reports and suggestions

### Technical Improvements
- [ ] Progressive Web App (PWA) support
- [ ] Advanced caching strategies
- [ ] Real-time WebSocket connections
- [ ] Advanced data visualization options
- [ ] AI-powered insights and recommendations

## 🚀 Getting Started Guide

### 1. Quick Start
```bash
git clone <repository-url>
cd vibe_assignment
npm install
npm run dev
```

### 2. Explore Features
1. **Main Dashboard**: View campaign metrics and performance charts
2. **Website Insights**: Click "Test Website Insights" to analyze any website
3. **Advanced Filters**: Use date ranges and multi-select filters on data table
4. **Theme Toggle**: Switch between dark and light modes
5. **Export Data**: Download campaign data in CSV or HTML format

### 3. Demo Websites
Try the website insights feature with these pre-configured sites:
- GitHub (Development platform)
- Netflix (Entertainment service)
- Shopify (E-commerce platform)
- Medium (Publishing platform)
- Spotify (Music streaming)
- Airbnb (Travel marketplace)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Recharts** for powerful charting capabilities
- **Radix UI** for accessible primitives
- **Tailwind CSS** for utility-first styling
- **Lucide React** for modern icons

---

**Built with ❤️ for digital marketing agencies**
- **shadcn/ui Components**: Beautiful, accessible UI components
- **TypeScript**: Full type safety and better developer experience
- **Recharts**: Interactive and responsive data visualizations
- **Mock Data Integration**: Realistic sample data with real-time simulation

### 🌟 Bonus Features
- **Real-time Updates**: Live data simulation with 5-second intervals
- **Export Functionality**: CSV and report exports for campaign data
- **Advanced Filters**: Search and status filtering for data table
- **Beautiful Loading Skeletons**: Smooth loading experience
- **Responsive Charts**: Fully responsive data visualizations

## 🛠️ Technology Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vibe_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Features Overview

### Dashboard Components

1. **Metric Cards**
   - Total Revenue with 12.5% growth
   - Active Users with 8.2% increase  
   - Conversions with -2.1% change
   - Growth Rate at 23.8%

2. **Interactive Charts**
   - Revenue trends line chart showing monthly progression
   - Weekly user engagement bar chart
   - Traffic sources pie/donut chart
   - Quick insights summary card

3. **Data Table**
   - Campaign performance metrics
   - Sorting by any column
   - Status filtering (Active, Paused, Ended)
   - Search functionality
   - Pagination with 5 items per page
   - Export to CSV and report formats

4. **Real-time Features**
   - Live data updates every 5 seconds
   - Pause/resume functionality
   - Real-time active users and revenue display

## 🎨 Design Highlights

- **Color Scheme**: Professional blue, green, purple, and orange accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation support
- **Mobile-First**: Responsive design for all screen sizes

## 🚀 Performance Features

- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Optimized build output
- **Code Splitting**: Minimal bundle sizes
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Optimized for production

## 📄 License

This project is created as a demo for ADmyBRAND Insights platform.

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
