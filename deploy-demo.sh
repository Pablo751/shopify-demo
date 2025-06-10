#!/bin/bash

# Shopify Order Processor - Demo Deployment Script
# This script builds and prepares the demo for deployment

echo "🚀 Building Shopify Order Processor Demo..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. For Netlify: Drag and drop the 'build' folder to https://app.netlify.com/drop"
    echo "2. For Vercel: Run 'vercel --prod' in the project directory"
    echo "3. For GitHub Pages: Run 'npm run deploy' (after setting up gh-pages)"
    echo ""
    echo "🎯 Demo features:"
    echo "• Interactive demo mode with sample data"
    echo "• No API credentials required"
    echo "• Full order processing workflow"
    echo "• CSV export functionality"
    echo "• Perfect for showcasing to recruiters!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi 