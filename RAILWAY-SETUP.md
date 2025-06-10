# 🚂 Railway Deployment Guide

This guide will help you deploy your Shopify Order Processor to Railway.

## Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- Railway CLI installed
- Your Shopify API credentials

## Quick Deploy

1. **Run the deployment script:**
   ```bash
   npm run deploy:railway
   ```

2. **Follow the prompts in the script to:**
   - Login to Railway
   - Link your project
   - Set environment variables
   - Deploy!

## Manual Setup

### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login to Railway

```bash
railway login
```

### 3. Create/Link Project

For a new project:
```bash
railway login
railway init
```

For an existing project:
```bash
railway link
```

### 4. Set Environment Variables

```bash
railway variables set SHOPIFY_SHOP_URL=your-shop-name.myshopify.com
railway variables set SHOPIFY_ACCESS_TOKEN=your_access_token_here
railway variables set NODE_ENV=production
```

### 5. Deploy

```bash
railway up
```

## Configuration Files

- **`railway.toml`** - Railway configuration
- **`Dockerfile`** - Multi-stage Docker build
- **`env.example`** - Environment variables template

## Architecture

Your deployed app will:
- Serve the React frontend as static files
- Run the Express.js proxy on the same port
- Handle Shopify API requests through the proxy
- Include health checks for reliability

## Accessing Your App

After deployment, your app will be available at:
```
https://your-project-name.railway.app
```

## Troubleshooting

### Build Issues
- Check that all dependencies are in `package.json`
- Verify the Dockerfile builds locally: `docker build -t test .`

### Runtime Issues
- Check Railway logs: `railway logs`
- Verify environment variables are set: `railway variables`

### API Issues
- Ensure Shopify credentials are correct
- Check that your Shopify app has the necessary permissions

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SHOPIFY_SHOP_URL` | Your Shopify store URL | `my-store.myshopify.com` |
| `SHOPIFY_ACCESS_TOKEN` | Shopify Admin API access token | `shpat_...` |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port (auto-set by Railway) | `3001` |

## Need Help?

- [Railway Documentation](https://docs.railway.app/)
- [Shopify API Documentation](https://shopify.dev/docs/admin-api)
- Check the logs: `railway logs --follow` 