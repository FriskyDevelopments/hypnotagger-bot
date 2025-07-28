#!/bin/bash

echo "🔍 HypnoTagger Bot - Deployment Health Check"
echo "============================================"

# Check if bot token is configured
if [ -f ".env" ]; then
    if grep -q "BOT_TOKEN=" .env && ! grep -q "BOT_TOKEN=YOUR_BOT_TOKEN_HERE" .env; then
        echo "✅ Bot token configured in .env"
    else
        echo "❌ Bot token not configured in .env"
        echo "💡 Run ./setup-env.sh and edit .env file"
    fi
else
    echo "⚠️  No .env file found"
    echo "💡 Run ./setup-env.sh to create configuration"
fi

# Check for deployment platform
echo ""
echo "🌐 Checking deployment platforms..."

# Check Railway
if command -v railway &> /dev/null; then
    echo "✅ Railway CLI installed"
    if railway status 2>/dev/null; then
        echo "✅ Railway deployment active"
    else
        echo "📱 Railway ready for deployment"
    fi
else
    echo "📦 Railway CLI not installed (run ./deploy-railway.sh)"
fi

# Check Heroku
if command -v heroku &> /dev/null; then
    echo "✅ Heroku CLI installed"
    if heroku apps 2>/dev/null | grep -q "hypnotagger"; then
        echo "✅ Heroku deployment found"
    else
        echo "📱 Heroku ready for deployment"
    fi
else
    echo "📦 Heroku CLI not installed (run ./deploy-heroku.sh)"
fi

# Check Node.js dependencies
echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Node modules installed"
else
    echo "📥 Run 'npm install' to install dependencies"
fi

# Check key files
echo ""
echo "📁 Checking project files..."
files=("index.js" "package.json" "kinkscout-logic.js" "curator-module.js")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "🎯 Deployment Status Summary:"
echo "============================"

# Overall status
missing_files=0
for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        ((missing_files++))
    fi
done

if [ $missing_files -eq 0 ]; then
    if [ -f ".env" ] && ! grep -q "BOT_TOKEN=YOUR_BOT_TOKEN_HERE" .env; then
        echo "🎉 READY TO DEPLOY!"
        echo ""
        echo "🚀 Quick Deploy Commands:"
        echo "./deploy-railway.sh    # Deploy to Railway (Recommended)"
        echo "./deploy-heroku.sh     # Deploy to Heroku"
        echo ""
        echo "📱 For iOS: Use GitHub Codespaces + Railway"
    else
        echo "⚠️  CONFIGURATION NEEDED"
        echo "💡 Configure bot token in .env file"
    fi
else
    echo "❌ MISSING FILES"
    echo "💡 Ensure all project files are present"
fi

echo ""
echo "🔮 Your mystical bot deployment awaits!"
