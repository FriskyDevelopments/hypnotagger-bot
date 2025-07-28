#!/bin/bash

echo "🔄 HypnoTagger Bot - Heroku Deployment Script"
echo "============================================="

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

# Install Heroku CLI if not present
if ! command -v heroku &> /dev/null; then
    echo "📦 Installing Heroku CLI..."
    npm install -g heroku
    echo "✅ Heroku CLI installed"
else
    echo "✅ Heroku CLI already installed"
fi

# Login to Heroku
echo "🔐 Logging into Heroku..."
heroku login

# Create Heroku app
echo "🎯 Creating Heroku app..."
APP_NAME="hypnotagger-bot-$(date +%s)"
heroku create $APP_NAME

# Set environment variables
echo "⚙️ Setting environment variables..."
heroku config:set BOT_TOKEN="$BOT_TOKEN" --app $APP_NAME
heroku config:set CURATOR_ROOM_ID="-1002892425474" --app $APP_NAME
heroku config:set ADMIN_CURATORS="7695459242" --app $APP_NAME
heroku config:set NODE_ENV="production" --app $APP_NAME

# Optional variables if set
if [ ! -z "$CIVITAI_API_KEY" ]; then
    heroku config:set CIVITAI_API_KEY="$CIVITAI_API_KEY" --app $APP_NAME
fi

if [ ! -z "$CHAT_ID" ]; then
    heroku config:set CHAT_ID="$CHAT_ID" --app $APP_NAME
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: HypnoTagger Bot with KinkScout integration"
fi

# Add Heroku remote
heroku git:remote -a $APP_NAME

# Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git push heroku main

# Scale web dyno
heroku ps:scale web=1 --app $APP_NAME

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "✅ Your HypnoTagger Bot is now live on Heroku"
echo "🔗 App URL: https://$APP_NAME.herokuapp.com"
echo "🎭 Test your bot by messaging it: /start"
echo ""
echo "📋 Heroku Commands:"
echo "heroku logs --tail --app $APP_NAME  # View logs"
echo "heroku restart --app $APP_NAME      # Restart app"
echo "heroku config --app $APP_NAME       # View config"
echo ""
echo "🔮 Welcome to the mystical realm of automated hypno curation!"
