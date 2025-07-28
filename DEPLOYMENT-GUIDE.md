# 🚀 HypnoTagger Bot Deployment Guide

*Complete deployment solutions for iOS and desktop environments*

## 🎯 Quick Deploy Options

### 1. 🌐 Railway (Recommended for iOS)

**Best for:** iOS users, automatic deployments, PostgreSQL database

```bash
# 1. Create Railway account at railway.app
# 2. Connect your GitHub repository
# 3. One-click deploy from web interface
```

**iOS Setup Steps:**

1. Visit `railway.app` on iPhone/iPad
2. Connect GitHub account
3. Import your bot repository
4. Set environment variables in Railway dashboard
5. Deploy instantly!

**Environment Variables for Railway:**

```
BOT_TOKEN=your_bot_token_here
CHAT_ID=your_chat_id_here
CURATOR_ROOM_ID=-1002892425474
ADMIN_CURATORS=7695459242
NODE_ENV=production
```

### 2. 📱 GitHub Codespaces + Railway

**Perfect iOS Development + Deployment Combo**

```bash
# In Codespaces terminal:
npm install -g @railway/cli
railway login
railway init
railway up
```

### 3. 🔄 Heroku (Alternative)

**Good for:** Free tier, easy scaling

```bash
# Install Heroku CLI in Codespaces
npm install -g heroku
heroku login
heroku create hypnotagger-bot
heroku config:set BOT_TOKEN=your_token
heroku config:set CURATOR_ROOM_ID=-1002892425474
git push heroku main
```

### 4. ⚡ Replit (Instant Deploy)

**Best for:** Immediate testing, no setup required

1. Visit `replit.com` on any device
2. Import from GitHub: `your-username/hypnotagger-bot`
3. Set environment variables in Secrets panel
4. Click Run - instant deployment!

## 🛠️ Pre-Deployment Checklist

### ✅ Required Environment Variables

```bash
BOT_TOKEN=                    # Your Telegram bot token
CHAT_ID=                      # Main chat for notifications
CURATOR_ROOM_ID=-1002892425474  # Weird Hypnobating room
ADMIN_CURATORS=7695459242     # Your user ID
```

### ✅ Optional Integrations

```bash
# AI Generation (Optional)
CIVITAI_API_KEY=              # For AI image generation
AUTOMATIC1111_URL=            # Local AI server

# Advanced Features (Optional)
FANSLY_INTEGRATION=true       # Fansly content support
PYTHON_PATH=python3           # For advanced processing

# Channel IDs (Configure when ready)
VAULT_CHANNEL_ID=             # Public teasers
ELITE_CHANNEL_ID=             # VIP content
LOUNGE_CHANNEL_ID=            # Discussion group
```

## 🎭 Bot Setup with @BotFather

### Create KinkScout Profile

```bash
# 1. Message @BotFather on Telegram
# 2. Use these commands:

/setname KinkScout HypnoTagger
/setdescription 🕵️ Underground exploration guide & hypnotic content curator. Specializing in fetish discovery, trance experiences, and mystical digital realms. Your trusted scout for the hypno underground. 🔮

/setuserpic
# Upload the profile picture from KINKSCOUT-BOT-PICTURE.md

/setcommands
submit - Submit video URL for processing
classify - Test AI classification
categories - View available tags
generate - AI image generation
kinkscout - Generate KinkScout character
scout_guide - Underground exploration guidance
underground_map - Explore mystical realms
start - Begin your journey
```

## 🌐 iOS Deployment Workflow

### Method 1: GitHub Codespaces + Railway

```bash
# 1. Open GitHub Codespaces (recommended)
#    github.com → Your Repo → Code → Create Codespace

# 2. Install Railway CLI
npm install -g @railway/cli

# 3. Login and deploy
railway login
railway init hypnotagger-bot
railway up

# 4. Set environment variables in Railway dashboard
# 5. Bot deploys automatically!
```

### Method 2: Direct Railway Deploy

```bash
# 1. Visit railway.app on iPhone/iPad
# 2. Connect GitHub account
# 3. Select hypnotagger-bot repository
# 4. Configure environment variables
# 5. Deploy with one click
```

### Method 3: Replit Mobile

```bash
# 1. Open replit.com on mobile browser
# 2. Import from GitHub
# 3. Add environment variables in Secrets
# 4. Click Run button
# 5. Bot runs instantly!
```

## 🔧 Deployment Scripts

### Quick Railway Deploy

```bash
#!/bin/bash
echo "🚀 Deploying HypnoTagger Bot to Railway..."

# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up

echo "✅ Deployment complete!"
echo "🎭 Configure environment variables in Railway dashboard"
echo "🔮 Your bot will be live in minutes!"
```

### Environment Setup Script

```bash
#!/bin/bash
echo "⚙️ Setting up environment variables..."

# Required variables
railway variables set BOT_TOKEN=$BOT_TOKEN
railway variables set CURATOR_ROOM_ID=-1002892425474
railway variables set ADMIN_CURATORS=7695459242
railway variables set NODE_ENV=production

echo "✅ Environment configured!"
```

## 📊 Monitoring & Management

### Check Bot Status

```bash
# Railway logs
railway logs

# Heroku logs
heroku logs --tail

# Direct health check
curl https://your-app.railway.app/health
```

### Update Deployment

```bash
# Push updates
git add .
git commit -m "Bot updates"
git push origin main

# Railway auto-deploys from main branch
# Heroku: git push heroku main
```

## 🔮 Advanced iOS Development Setup

### Complete Mobile Workflow

1. **Development:** GitHub Codespaces (full VS Code in browser)
2. **Code Management:** GitHub Mobile app (review, merge PRs)
3. **File Editing:** Working Copy app (iOS Git client)
4. **Deployment:** Railway web dashboard (one-click deploy)
5. **Monitoring:** Railway mobile dashboard

### iOS-Optimized Tools

- **Blink Shell:** Terminal access on iPad
- **GitHub Mobile:** Repository management
- **Working Copy:** Advanced Git operations
- **Safari:** All web-based development tools

## 🎯 Production Checklist

### Before Going Live

- [ ] Bot token configured and tested
- [ ] Curator room ID set correctly
- [ ] Admin user IDs added
- [ ] Profile picture uploaded to @BotFather
- [ ] Bot description set with KinkScout theme
- [ ] Commands configured in @BotFather
- [ ] Railway/Heroku environment variables set
- [ ] Domain configured (optional)
- [ ] Monitoring set up

### After Deployment

- [ ] Test `/start` command
- [ ] Test `/submit` with video URL
- [ ] Verify curator commands work
- [ ] Check channel integrations
- [ ] Test KinkScout features
- [ ] Monitor logs for errors

## 🚨 Troubleshooting

### Common Issues

```bash
# Bot not responding
# Check: BOT_TOKEN is correct
# Check: Bot has proper permissions

# Curator commands not working  
# Check: CURATOR_ROOM_ID is set
# Check: Your user ID is in ADMIN_CURATORS

# Video processing fails
# Check: File size limits (50MB max)
# Check: URL is accessible

# iOS development issues
# Solution: Use GitHub Codespaces
# Alternative: Use Replit for quick testing
```

### Quick Fixes

```bash
# Restart deployment
railway restart

# Check environment variables
railway variables

# View real-time logs
railway logs --tail
```

## 🎉 Success! Your Bot is Live

Once deployed, your HypnoTagger Bot with KinkScout integration will be:

✅ **Processing video submissions** with mystical theming  
✅ **Generating AI content** via Civitai integration  
✅ **Managing curator workflow** with styled tags  
✅ **Providing KinkScout guidance** for underground exploration  
✅ **Running 24/7** on professional infrastructure  

**Test your deployment:**

1. Message your bot: `/start`
2. Submit a video: `/submit [YouTube URL]`
3. Test KinkScout: `/scout_guide`
4. Check underground map: `/underground_map`

🎭 **Welcome to the mystical realm of automated hypno curation!** 🔮
