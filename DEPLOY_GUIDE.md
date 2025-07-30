# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Dashboard Deployment (Easiest)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository: AI-Powered-Analytics-Dashboard
5. Click "Deploy" (Vercel auto-detects Next.js settings)

### Option 2: CLI Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# ? Set up and deploy "~/vibe_assignment"? [Y/n] y
# ? Which scope should contain your project? [Your Account]
# ? What's your project's name? ai-powered-analytics-dashboard
# ? In which directory is your code located? ./
```

## Environment Configuration

Your app should work out of the box, but if you need environment variables:

### Create vercel.json (optional)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

## Post-Deployment

After deployment, you'll get:
- ✅ Live URL (e.g., https://your-app.vercel.app)
- ✅ Automatic SSL certificate
- ✅ Global CDN
- ✅ Auto-deploys on GitHub pushes
- ✅ Preview deployments for pull requests

## Features That Will Work
- ✅ Main dashboard with real-time metrics
- ✅ Website insights page (/website-insights)
- ✅ Interactive charts and data visualization
- ✅ Dark/light theme switching
- ✅ Responsive design
- ✅ Export functionality
- ✅ Advanced filtering
- ✅ All animations and loading states

## Custom Domain (Optional)
After deployment, you can add a custom domain:
1. Go to your project dashboard on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
