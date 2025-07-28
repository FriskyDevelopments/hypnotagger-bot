# 🎭 HypnoTagger Bot - Commands Reference

## 🚀 Deployment Commands

### Step 1: Initial Setup

```bash
# Navigate to project directory
cd hypnotagger-bot-updated

# Install dependencies
npm install

# Run the interactive setup helper
node setup-helper.js
```

### Step 2: BotFather Commands (in Telegram)

**Essential Commands:**

```text
/newbot                     # Create new bot
/setcommands               # Set bot command menu
/setdescription            # Set bot description
/setname                    # Change bot name
/setuserpic                # Set bot profile picture
```

**Management Commands:**

```text
/mybots                     # List your bots
/token                      # Get/regenerate bot token
/revoke                     # Revoke bot token
/deletebot                 # Delete bot (careful!)
```

**Advanced Commands:**

```text
/setjoingroups             # Allow bot to join groups
/setprivacy                # Set privacy mode
/setinline                 # Enable inline mode
/setinlinefeedback         # Inline feedback settings
/setdomainpic              # Set domain picture
/deleteuserpic             # Delete bot profile picture
```

### Step 3: Configure Bot Commands Menu

Send this to BotFather with `/setcommands`:

```text
submit - Download and tag video
classify - Test text classification
categories - List all available categories
health - Check bot status
help - Show help message
export - Export categories (admin only)
```

## 🤖 Bot Commands (for users)

### Core Commands

```text
/start                     # Initialize bot
/help                      # Show help message
/health                    # Check bot status
```

### Video Processing

```text
/submit <video_url>        # Download and tag video
/submit https://youtu.be/example
/submit https://www.youtube.com/watch?v=example
```

### Classification & Categories

```text
/classify <text>           # Test text classification
/classify "hypno spiral video"

/categories               # List all available categories
/export                   # Export categories (admin only)
```

## 🛠️ Development Commands

### Setup & Installation

```bash
# Clone repository
git clone <repository_url>
cd hypnotagger-bot

# Install dependencies
npm install

# Setup bot configuration
node setup-helper.js

# Create environment file manually
cp .env.example .env
```

### Running the Bot

```bash
# Start bot in production
npm start

# Start bot in development mode
npm run dev

# Run with PM2 process manager
pm2 start index.js --name hypnotagger-bot
```

### Testing & Validation

```bash
# Run all tests
npm test

# Run classification tests specifically
npm run test:classify

# Test interactive classification tool
node classify.js

# Check for security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

### Classification Tool Commands

```bash
# Start interactive classification tool
node classify.js

# Available commands in classify.js:
classify <text>           # Classify text and show confidence
categories               # List all categories
interactive on/off       # Toggle category suggestions
export                   # Backup categories to file
import <file>            # Restore categories from file
help                     # Show command help
exit                     # Exit tool
```

## 🐳 Docker Commands

### Building & Running

```bash
# Build Docker image
docker build -t hypnotagger-bot .

# Run container
docker run -d \
  --name hypnotagger-bot \
  --env-file .env \
  hypnotagger-bot

# Run with volume for persistent data
docker run -d \
  --name hypnotagger-bot \
  --env-file .env \
  -v $(pwd)/data:/app/data \
  hypnotagger-bot
```

### Docker Management

```bash
# View logs
docker logs hypnotagger-bot

# Stop container
docker stop hypnotagger-bot

# Remove container
docker rm hypnotagger-bot

# Remove image
docker rmi hypnotagger-bot
```

## 🔧 System Administration

### Process Management

```bash
# Start with PM2
pm2 start index.js --name hypnotagger-bot

# View PM2 status
pm2 status

# View logs
pm2 logs hypnotagger-bot

# Restart bot
pm2 restart hypnotagger-bot

# Stop bot
pm2 stop hypnotagger-bot
```

### Monitoring

```bash
# Monitor system resources
htop

# Check disk space
df -h

# Monitor log files
tail -f logs/bot.log

# Check bot process
ps aux | grep node
```

## 🔐 Security Commands

### Pre-deployment Security Check

```bash
# Run security audit
npm audit

# Check for vulnerabilities
npm audit fix

# Lint code for security issues
npm run lint

# Check environment variables
grep -v "^#" .env | grep -v "^$"
```

### Token Management

```bash
# Generate secure random string
openssl rand -hex 32

# Check bot token validity
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"

# Revoke old token (through BotFather)
# Send /revoke to @BotFather
```

## 📊 Maintenance Commands

### Regular Updates

```bash
# Update dependencies
npm update

# Check outdated packages
npm outdated

# Update specific package
npm install package@latest

# Clean npm cache
npm cache clean --force
```

### Backup & Restore

```bash
# Backup categories
node classify.js
# Then use: export

# Backup entire configuration
cp .env .env.backup
cp -r data/ data.backup/

# Restore from backup
cp .env.backup .env
cp -r data.backup/ data/
```

## 🔍 Troubleshooting Commands

### Debug Information

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check bot status
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"

# Test yt-dlp installation
yt-dlp --version

# Check available disk space
df -h /tmp
```

### Log Analysis

```bash
# View recent bot logs
tail -n 100 logs/bot.log

# Search for errors
grep -i error logs/bot.log

# Monitor live logs
tail -f logs/bot.log

# Check system logs
journalctl -u hypnotagger-bot
```

## 🌐 Environment Variables

### Required Configuration

```bash
# Essential variables
export BOT_TOKEN="your_bot_token_here"
export CHAT_ID="your_chat_id_here"

# Optional variables
export NODE_ENV="production"
export LOG_LEVEL="info"
export MAX_FILE_SIZE="50MB"
export TEMP_DIR="/tmp"
```

### Development Configuration

```bash
# Development mode
export NODE_ENV="development"
export LOG_LEVEL="debug"

# Testing mode
export NODE_ENV="test"
export DRY_RUN="true"
```

## 🎯 Quick Reference

### Emergency Commands

```bash
# Stop bot immediately
pkill -f "node.*index.js"
pm2 stop all

# Clear temporary files
rm -rf /tmp/hypnotagger-*

# Reset to clean state
git checkout .
npm install
```

### Health Check Commands

```bash
# Quick system status
npm run health

# Detailed system check
npm run health:detailed

# Test bot connectivity
curl "https://api.telegram.org/bot$BOT_TOKEN/getMe"
```

---

## 📱 Example Usage Session

```bash
# 1. Setup
cd hypnotagger-bot-updated
npm install
node setup-helper.js

# 2. Start bot
npm start

# 3. Test in Telegram
# Send: /start
# Send: /submit https://youtu.be/example

# 4. Monitor
tail -f logs/bot.log

# 5. Manage categories
node classify.js
# Use: categories, classify "test content"
```

This covers all the commands you'll need for deployment, management, and troubleshooting of your HypnoTagger Bot!
