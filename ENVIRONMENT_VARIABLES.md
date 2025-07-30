# Environment Variables Guide for ADmyBRAND Insights Dashboard

## Current Status
✅ **No environment variables required for deployment**
✅ **Ready to deploy as-is on Vercel**

## Optional Future Environment Variables

### Analytics & API Integration
```env
# Google Analytics (if you want real analytics data)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console API (for real SEO data)
GOOGLE_SEARCH_CONSOLE_API_KEY=your_api_key_here

# PageSpeed Insights API (for real performance data)
NEXT_PUBLIC_PAGESPEED_API_KEY=your_pagespeed_api_key

# Custom API endpoints (if you build a backend)
NEXT_PUBLIC_API_BASE_URL=https://your-api.com/v1
API_SECRET_KEY=your_secret_key
```

### Authentication (Future Feature)
```env
# NextAuth.js configuration
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_random_secret_string

# OAuth providers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Database (Future Feature)
```env
# Database connection
DATABASE_URL=postgresql://username:password@host:port/database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### External Services (Future Feature)
```env
# Email service (for reports)
SENDGRID_API_KEY=your_sendgrid_api_key
RESEND_API_KEY=your_resend_api_key

# File storage (for exports)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET_NAME=your_bucket_name
```

## How to Add Environment Variables on Vercel

### Method 1: During Deployment
1. When deploying on Vercel dashboard
2. In the "Environment Variables" section
3. Add key-value pairs as needed

### Method 2: After Deployment
1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add variables and redeploy

### Method 3: Using Vercel CLI
```bash
# Set environment variable
vercel env add VARIABLE_NAME

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME
```

## Environment Variable Types in Vercel

### 1. Build-time Variables
- Available during build process
- Use for configuration that doesn't change

### 2. Runtime Variables
- Available at runtime
- Use for API keys, database URLs

### 3. Public Variables (NEXT_PUBLIC_*)
- Exposed to the browser
- Use for public API keys, analytics IDs

## Security Best Practices

### ✅ DO:
- Use NEXT_PUBLIC_ prefix for browser-safe variables
- Keep API secrets on server-side only
- Use different variables for development/production
- Rotate secrets regularly

### ❌ DON'T:
- Put secrets in NEXT_PUBLIC_ variables
- Commit .env files to git
- Use production secrets in development
- Share secrets in plain text

## Example .env.local (for local development)
```env
# Copy this to .env.local for local development
# (This file should be in .gitignore)

# Public variables (safe for browser)
NEXT_PUBLIC_APP_NAME=ADmyBRAND Insights
NEXT_PUBLIC_APP_VERSION=1.0.0

# Private variables (server-side only)
API_SECRET_KEY=your_secret_key_here
DATABASE_URL=your_database_url_here
```

## Current Project: Ready to Deploy!

Since your current project doesn't use any environment variables:
1. ✅ Deploy directly to Vercel
2. ✅ No configuration needed
3. ✅ All features will work immediately
4. ✅ Add environment variables later if needed

Your dashboard will work perfectly without any environment variables!
