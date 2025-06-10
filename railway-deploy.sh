#!/bin/bash

# Shopify Order Processor - Railway Deployment Script
# This script prepares and deploys the app to Railway

echo "🚂 Preparing Shopify Order Processor for Railway deployment..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if we're in a Railway project
if [ ! -f "railway.toml" ]; then
    echo "❌ railway.toml not found. Make sure you're in the project directory."
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo "✅ railway.toml - Railway configuration"
echo "✅ Dockerfile - Container configuration"
echo "✅ env.example - Environment template"

echo ""
echo "🔧 Next steps to complete deployment:"
echo ""
echo "1. 🚂 Login to Railway:"
echo "   railway login"
echo ""
echo "2. 🔗 Link this project to Railway:"
echo "   railway link"
echo ""
echo "3. 🔑 Set environment variables:"
echo "   railway variables set SHOPIFY_SHOP_URL=your-shop-name.myshopify.com"
echo "   railway variables set SHOPIFY_ACCESS_TOKEN=your_access_token_here"
echo "   railway variables set NODE_ENV=production"
echo ""
echo "4. 🚀 Deploy to Railway:"
echo "   railway up"
echo ""
echo "💡 Tips:"
echo "• Copy values from your local .env file (if you have one)"
echo "• Your app will be available at: https://your-project-name.railway.app"
echo "• Railway will automatically build using the Dockerfile"
echo "• The health check endpoint is configured at '/'"
echo ""
echo "📚 Railway Documentation: https://docs.railway.app/"
echo ""
echo "🎯 Your app features:"
echo "• React frontend with built static files"
echo "• Express.js proxy server for Shopify API"
echo "• Automatic container health checks"
echo "• Production-ready multi-stage Docker build" 