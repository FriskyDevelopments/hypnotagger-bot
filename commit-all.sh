#!/bin/bash

echo "🔄 Starting git commit process..."

# Navigate to project directory
cd /Users/pupfrisky/Downloads/hypnotagger-bot-updated

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Configure git user if not set
git config user.email "hypnotagger@example.com" 2>/dev/null || true
git config user.name "HypnoTagger Bot" 2>/dev/null || true

# Add all files
echo "📁 Adding all files to staging..."
git add .

# Show status
echo "📊 Git status:"
git status --short

# Commit with comprehensive message
echo "💾 Committing changes..."
git commit -m "Enhanced HypnoTagger Bot with KinkScout integration and iOS development

Features added:
- Complete KinkScout character system integration
- Enhanced mystical theming throughout bot
- Comprehensive iOS development workflow guides  
- KinkScout profile picture and artwork resources
- Updated configuration with actual Telegram channel IDs
- Diagnostic tools for troubleshooting
- Enhanced curator module with styled tags
- AI generation commands with Civitai integration
- Debug tools for iOS compatibility
- Underground exploration features

Technical improvements:
- Enhanced error handling and logging
- Progress management for video processing
- Chunked video processing for large files
- Fansly integration support
- Curator workflow with queue management
- AI image generation integration"

echo "✅ All changes committed successfully!"
echo "📋 Latest commit:"
git log --oneline -n 1

echo "🎉 Git commit process completed!"
