#!/bin/bash

# HypnoTagger Bot Startup Script with Progress Indicators
# This script provides clear visual feedback during bot startup

echo "🌟 HypnoTagger Bot Startup Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to show progress bar
show_progress() {
    local duration=$1
    local message=$2
    echo -n "${CYAN}${message}${NC}"
    for i in $(seq 1 $duration); do
        echo -n "."
        sleep 0.2
    done
    echo " ${GREEN}✅${NC}"
}

# Check if bot is already running
echo -e "${YELLOW}🔍 Checking for existing bot processes...${NC}"
if pgrep -f "node.*index.js" > /dev/null; then
    echo -e "${RED}⚠️  Bot is already running! Stopping existing process...${NC}"
    pkill -f "node.*index.js"
    sleep 2
else
    echo -e "${GREEN}✅ No existing bot processes found${NC}"
fi

# Check Node.js
echo -e "${YELLOW}🔍 Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js found: ${NODE_VERSION}${NC}"
else
    echo -e "${RED}❌ Node.js not found! Please install Node.js first.${NC}"
    exit 1
fi

# Check npm packages
echo -e "${YELLOW}🔍 Checking npm dependencies...${NC}"
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json found${NC}"
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ node_modules directory exists${NC}"
    else
        echo -e "${YELLOW}⚠️  node_modules not found, running npm install...${NC}"
        npm install
    fi
else
    echo -e "${RED}❌ package.json not found! Are you in the right directory?${NC}"
    exit 1
fi

# Check environment file
echo -e "${YELLOW}🔍 Checking environment configuration...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file found${NC}"
    
    # Check for required variables
    if grep -q "BOT_TOKEN=" .env; then
        echo -e "${GREEN}✅ BOT_TOKEN configured${NC}"
    else
        echo -e "${RED}❌ BOT_TOKEN not found in .env${NC}"
        exit 1
    fi
    
    if grep -q "CHAT_ID=" .env; then
        echo -e "${GREEN}✅ CHAT_ID configured${NC}"
    else
        echo -e "${RED}❌ CHAT_ID not found in .env${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ .env file not found! Please create one with BOT_TOKEN and CHAT_ID${NC}"
    exit 1
fi

# Check bot file
echo -e "${YELLOW}🔍 Checking bot files...${NC}"
if [ -f "index.js" ]; then
    echo -e "${GREEN}✅ index.js found${NC}"
else
    echo -e "${RED}❌ index.js not found!${NC}"
    exit 1
fi

# Syntax check
echo -e "${YELLOW}🔍 Checking JavaScript syntax...${NC}"
if node -c index.js; then
    echo -e "${GREEN}✅ Syntax check passed${NC}"
else
    echo -e "${RED}❌ Syntax errors found! Please fix them first.${NC}"
    exit 1
fi

echo ""
echo -e "${PURPLE}🚀 Starting HypnoTagger Bot...${NC}"
echo "=================================="
echo ""
echo -e "${CYAN}📊 You should see the following startup sequence:${NC}"
echo -e "   1. ${YELLOW}Module loading messages${NC}"
echo -e "   2. ${YELLOW}Environment variable checks${NC}"
echo -e "   3. ${YELLOW}Bot connectivity test${NC}"
echo -e "   4. ${GREEN}Startup notification sent to chat${NC}"
echo -e "   5. ${GREEN}Ready to process URLs${NC}"
echo ""
echo -e "${CYAN}🎯 To test the bot, send:${NC}"
echo -e "   ${BLUE}/submit https://hypnotube.com/video/furry-sir-poppers-pmv-101313.html${NC}"
echo ""
echo -e "${YELLOW}📝 Press Ctrl+C to stop the bot${NC}"
echo ""
echo "=================================="
echo -e "${GREEN}🔥 Bot Output:${NC}"
echo ""

# Start the bot
node index.js
