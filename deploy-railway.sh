#!/bin/bash

echo "🚀 HypnoTagger Bot - Railway Deployment Script"
echo "=============================================="

# Check if running in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Check for required environment variables
if [ -z "$BOT_TOKEN" ]; then
    echo "❌ Error: BOT_TOKEN environment variable not set"
    echo "💡 Set it with: export BOT_TOKEN=your_bot_token_here"
    exit 1
fi

echo "✅ Environment check passed"

# Install Railway CLI if not present
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
    echo "✅ Railway CLI installed"
else
    echo "✅ Railway CLI already installed"
fi

# Login to Railway
echo "🔐 Logging into Railway..."
echo "💡 This will open a browser window for authentication"
railway login

# Initialize Railway project
echo "🎯 Initializing Railway project..."
railway init

# Link to project or create new one
echo "🔗 Setting up Railway project..."
railway link

# Set environment variables using the updated syntax
echo "⚙️ Setting environment variables..."
railway variables --set BOT_TOKEN="$BOT_TOKEN"
railway variables --set CURATOR_ROOM_ID="-1002892425474"
railway variables --set ADMIN_CURATORS="7695459242"
railway variables --set NODE_ENV="production"

# Optional variables if set
if [ ! -z "$CIVITAI_API_KEY" ]; then
    railway variables --set CIVITAI_API_KEY="$CIVITAI_API_KEY"
fi

if [ ! -z "$CHAT_ID" ]; then
    railway variables --set CHAT_ID="$CHAT_ID"
fi

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway deploy

echo ""
echo "🎉 Deployment Complete!"
echo "========================"
echo "✅ Your HypnoTagger Bot is now live on Railway"
echo "🔗 Visit your Railway dashboard to monitor: https://railway.app/dashboard"
echo "🎭 Test your bot by messaging it: /start"
echo ""
echo "📋 Next Steps:"
echo "1. Configure @BotFather with KinkScout profile"
echo "2. Test video submission with /submit [URL]"
echo "3. Set up channel integrations if needed"
echo ""
echo "🔮 Welcome to the mystical realm of automated hypno curation!"
