#!/bin/bash

# 🔮 Fetish Hypno Hub Setup Script
# Complete setup for the enhanced HypnoTagger Bot with curator workflow

echo "🌀 Setting up Fetish Hypno Hub Architecture..."
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🔮 $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the HypnoTagger Bot directory."
    exit 1
fi

print_header "🎭 Fetish Hypno Hub Setup Process"
echo

# 1. Check Node.js version
print_info "Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_status "Node.js found: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# 2. Install dependencies
print_info "Installing Node.js dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# 3. Check if .env file exists and has basic configuration
print_info "Checking environment configuration..."
if [ -f ".env" ]; then
    if grep -q "BOT_TOKEN=" .env && grep -q "CHAT_ID=" .env; then
        print_status "Basic .env configuration found"
    else
        print_warning ".env file exists but missing required fields"
    fi
else
    print_warning ".env file not found - will create template"
    # Create basic .env if it doesn't exist
    cat > .env << 'EOF'
# 🎭 HypnoTagger Bot Configuration
# Generated for deployment

# Telegram Bot Token from @BotFather
BOT_TOKEN=YOUR_BOT_TOKEN_HERE

# Chat ID where bot will send tagged videos
CHAT_ID=YOUR_CHAT_ID_HERE

# 🌀 Fetish Hypno Hub Architecture - Multi-Channel Configuration
# Add your channel IDs below for complete curator workflow

# Channel IDs for Fetish Hypno Hub Distribution
VAULT_CHANNEL_ID=          # ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ 🔓 (Public Teasers)
ELITE_CHANNEL_ID=          # ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ 🔐 (VIP Full Access)
LOUNGE_CHANNEL_ID=         # ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ 💬 (Chat/Discussion)
CURATOR_ROOM_ID=           # ᴡᴇɪʀᴅʜʏᴘɴᴏʙᴀᴛɪɴɢᴠᴀᴜʟᴛ 🧠 (Private Curator Room)

# Curator Access Control (Telegram User IDs)
ADMIN_CURATORS=            # Full admin access (comma-separated)
SENIOR_CURATORS=           # Senior curator permissions (comma-separated)
JUNIOR_CURATORS=           # Junior curator permissions (comma-separated)
TRAINEE_CURATORS=          # Trainee/view-only access (comma-separated)

# Optional: Advanced Settings
MAX_DURATION_SECONDS=3600  # Maximum video length (1 hour)
TEMP_DIR=/tmp              # Temporary file directory
PYTHON_PATH=python3        # Python executable path
EOF
    print_warning "Created .env template - please edit with your values"
fi

# 4. Check for required system dependencies
print_info "Checking system dependencies..."

# Check yt-dlp
if command -v yt-dlp &> /dev/null; then
    YT_DLP_VERSION=$(yt-dlp --version)
    print_status "yt-dlp found: $YT_DLP_VERSION"
else
    print_warning "yt-dlp not found. Installing..."
    if command -v python3 &> /dev/null; then
        python3 -m pip install --upgrade yt-dlp
        if [ $? -eq 0 ]; then
            print_status "yt-dlp installed successfully"
        else
            print_error "Failed to install yt-dlp"
        fi
    else
        print_error "Python3 not found. Please install Python3 and yt-dlp manually."
    fi
fi

# Check ffmpeg
if command -v ffmpeg &> /dev/null; then
    FFMPEG_VERSION=$(ffmpeg -version | head -n1 | cut -d' ' -f3)
    print_status "ffmpeg found: $FFMPEG_VERSION"
else
    print_warning "ffmpeg not found. This is required for chunked video processing."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_info "On macOS, install with: brew install ffmpeg"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_info "On Ubuntu/Debian: sudo apt update && sudo apt install ffmpeg"
        print_info "On CentOS/RHEL: sudo yum install ffmpeg"
    fi
fi

# 5. Test bot configuration
print_info "Testing bot configuration..."
if [ -f ".env" ]; then
    # Source the .env file to get BOT_TOKEN
    export $(grep -v '^#' .env | xargs)
    
    if [ ! -z "$BOT_TOKEN" ] && [ "$BOT_TOKEN" != "YOUR_BOT_TOKEN_HERE" ]; then
        print_status "Bot token configured"
        if [ ! -z "$CHAT_ID" ] && [ "$CHAT_ID" != "YOUR_CHAT_ID_HERE" ]; then
            print_status "Chat ID configured"
        else
            print_warning "Chat ID not configured - bot will need this to send messages"
        fi
    else
        print_warning "Bot token not configured - please edit .env file"
    fi
fi

# 6. Create startup script if it doesn't exist
if [ ! -f "start-fetish-hub.sh" ]; then
    print_info "Creating enhanced startup script..."
    cat > start-fetish-hub.sh << 'EOF'
#!/bin/bash

# 🔮 Fetish Hypno Hub Startup Script
# Enhanced startup with architecture validation

echo "🌀 Starting Fetish Hypno Hub..."
echo "=============================="

# Check environment
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Validate core configuration
if [ -z "$BOT_TOKEN" ] || [ "$BOT_TOKEN" = "YOUR_BOT_TOKEN_HERE" ]; then
    echo "❌ BOT_TOKEN not configured in .env"
    exit 1
fi

if [ -z "$CHAT_ID" ] || [ "$CHAT_ID" = "YOUR_CHAT_ID_HERE" ]; then
    echo "⚠️  CHAT_ID not configured - bot may not function properly"
fi

# Check curator configuration
CURATOR_COUNT=0
[ ! -z "$ADMIN_CURATORS" ] && CURATOR_COUNT=$((CURATOR_COUNT + 1))
[ ! -z "$SENIOR_CURATORS" ] && CURATOR_COUNT=$((CURATOR_COUNT + 1))
[ ! -z "$JUNIOR_CURATORS" ] && CURATOR_COUNT=$((CURATOR_COUNT + 1))
[ ! -z "$TRAINEE_CURATORS" ] && CURATOR_COUNT=$((CURATOR_COUNT + 1))

if [ $CURATOR_COUNT -gt 0 ]; then
    echo "✅ Curator workflow configured"
else
    echo "⚠️  No curators configured - running in direct mode"
fi

# Check channel configuration
CHANNEL_COUNT=0
[ ! -z "$VAULT_CHANNEL_ID" ] && CHANNEL_COUNT=$((CHANNEL_COUNT + 1))
[ ! -z "$ELITE_CHANNEL_ID" ] && CHANNEL_COUNT=$((CHANNEL_COUNT + 1))
[ ! -z "$LOUNGE_CHANNEL_ID" ] && CHANNEL_COUNT=$((CHANNEL_COUNT + 1))
[ ! -z "$CURATOR_ROOM_ID" ] && CHANNEL_COUNT=$((CHANNEL_COUNT + 1))

echo "📺 Configured channels: $CHANNEL_COUNT/4"

# Start the bot
echo "🚀 Starting HypnoTagger Bot with Fetish Hypno Hub architecture..."
node index.js
EOF
    chmod +x start-fetish-hub.sh
    print_status "Created start-fetish-hub.sh startup script"
fi

# 7. Create quick configuration helper
if [ ! -f "configure-hub.sh" ]; then
    print_info "Creating configuration helper..."
    cat > configure-hub.sh << 'EOF'
#!/bin/bash

# 🔮 Fetish Hypno Hub Configuration Helper
# Interactive setup for channel IDs and curator permissions

echo "🌀 Fetish Hypno Hub Configuration"
echo "=================================="

# Backup current .env
if [ -f ".env" ]; then
    cp .env .env.backup
    echo "📋 Backed up current .env to .env.backup"
fi

echo
echo "🏷️ Telegram Channel Configuration"
echo "--------------------------------"
echo "For each channel, provide the channel ID (including the minus sign for groups/channels)"
echo "Example: -1001234567890"
echo

read -p "📺 ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ (Public Teasers) Channel ID: " VAULT_ID
read -p "🔐 ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ (VIP Full Access) Channel ID: " ELITE_ID
read -p "💬 ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ (Chat/Discussion) Channel ID: " LOUNGE_ID
read -p "🧠 ᴡᴇɪʀᴅʜʏᴘɴᴏʙᴀᴛɪɴɢᴠᴀᴜʟᴛ (Private Curator) Channel ID: " CURATOR_ID

echo
echo "👤 Curator Access Configuration"
echo "------------------------------"
echo "Provide Telegram User IDs (comma-separated for multiple users)"
echo "Example: 123456789,987654321"
echo

read -p "👑 Admin Curators (Full Access): " ADMIN_USERS
read -p "⭐ Senior Curators (Can Approve & Distribute): " SENIOR_USERS
read -p "🎭 Junior Curators (Can Tag & Suggest): " JUNIOR_USERS
read -p "📚 Trainee Curators (View Only): " TRAINEE_USERS

# Update .env file
sed -i.bak "s/VAULT_CHANNEL_ID=.*/VAULT_CHANNEL_ID=$VAULT_ID/" .env
sed -i.bak "s/ELITE_CHANNEL_ID=.*/ELITE_CHANNEL_ID=$ELITE_ID/" .env
sed -i.bak "s/LOUNGE_CHANNEL_ID=.*/LOUNGE_CHANNEL_ID=$LOUNGE_ID/" .env
sed -i.bak "s/CURATOR_ROOM_ID=.*/CURATOR_ROOM_ID=$CURATOR_ID/" .env

sed -i.bak "s/ADMIN_CURATORS=.*/ADMIN_CURATORS=$ADMIN_USERS/" .env
sed -i.bak "s/SENIOR_CURATORS=.*/SENIOR_CURATORS=$SENIOR_USERS/" .env
sed -i.bak "s/JUNIOR_CURATORS=.*/JUNIOR_CURATORS=$JUNIOR_USERS/" .env
sed -i.bak "s/TRAINEE_CURATORS=.*/TRAINEE_CURATORS=$TRAINEE_USERS/" .env

echo
echo "✅ Configuration updated!"
echo "🔧 You can now start the bot with: ./start-fetish-hub.sh"
EOF
    chmod +x configure-hub.sh
    print_status "Created configure-hub.sh configuration helper"
fi

# 8. Final status report
echo
print_header "🎭 Setup Complete!"
echo
print_status "✅ HypnoTagger Bot is ready for Fetish Hypno Hub architecture"
echo
print_info "📋 Next Steps:"
echo "  1. Edit .env file with your bot token and channel IDs"
echo "  2. Run ./configure-hub.sh for interactive configuration"
echo "  3. Start the bot with: ./start-fetish-hub.sh"
echo
print_info "🎭 Curator Commands Available:"
echo "  • /start - Load curator interface"
echo "  • /tag #tags - Apply stylized tags"
echo "  • /sendpreview - Send to public vault"
echo "  • /sendfull - Send to VIP elite"
echo "  • /reject - Archive content"
echo "  • /queue - View pending content"
echo "  • /stats - Curation statistics"
echo
print_info "🏷️ Stylized Tag Examples:"
echo "  • #ʜʏᴘɴᴏ #ᴘᴜᴘ #ᴘɪꜱꜱ #ʙᴇᴀʀ #ᴄᴜᴍᴄᴏɴᴛʀᴏʟ"
echo "  • #ɪɴᴛᴇɴꜱᴇ #ᴛʀᴀɴꜱғᴏʀᴍᴀᴛɪᴏɴ #ᴍɪɴᴅᴄᴏɴᴛʀᴏʟ"
echo
print_header "🌀 Welcome to the Fetish Hypno Hub!"

exit 0
