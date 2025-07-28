#!/bin/bash

echo "🔧 HypnoTagger Bot - Environment Setup Script"
echo "=============================================="

# Create .env file with all required variables
cat > .env << EOF
# 🎭 HypnoTagger Bot Configuration
# Generated: $(date)

# ===== REQUIRED SETTINGS =====
BOT_TOKEN=YOUR_BOT_TOKEN_HERE
CHAT_ID=YOUR_CHAT_ID_HERE
CURATOR_ROOM_ID=-1002892425474
ADMIN_CURATORS=7695459242

# ===== OPTIONAL INTEGRATIONS =====
# AI Generation (Civitai)
CIVITAI_API_KEY=
AUTOMATIC1111_URL=http://localhost:7860

# Fansly Integration
FANSLY_INTEGRATION=true
PYTHON_PATH=python3

# ===== CHANNEL CONFIGURATION =====
# Configure these when ready for multi-channel distribution
VAULT_CHANNEL_ID=          # @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ (Public teasers)
ELITE_CHANNEL_ID=          # @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ (VIP content)
LOUNGE_CHANNEL_ID=         # @ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ (Discussion)

# ===== TECHNICAL SETTINGS =====
NODE_ENV=development
MAX_DURATION_SECONDS=3600
TEMP_DIR=/tmp

# ===== ADVANCED CURATOR SETTINGS =====
SENIOR_CURATORS=
JUNIOR_CURATORS=
TRAINEE_CURATORS=
EOF

echo "✅ Created .env file with configuration template"

# Create .env.production for deployment
cat > .env.production << EOF
# 🎭 HypnoTagger Bot - Production Configuration
BOT_TOKEN=\${BOT_TOKEN}
CHAT_ID=\${CHAT_ID}
CURATOR_ROOM_ID=-1002892425474
ADMIN_CURATORS=7695459242
NODE_ENV=production
MAX_DURATION_SECONDS=3600
TEMP_DIR=/tmp
EOF

echo "✅ Created .env.production for deployment"

# Make deployment scripts executable
chmod +x deploy-railway.sh
chmod +x deploy-heroku.sh
chmod +x start-bot.sh

echo "✅ Made deployment scripts executable"

echo ""
echo "📋 Configuration Complete!"
echo "========================="
echo "1. Edit .env file with your actual bot token"
echo "2. Set CHAT_ID to your Telegram chat ID"
echo "3. Configure optional integrations as needed"
echo ""
echo "🚀 Quick Deploy Options:"
echo "./deploy-railway.sh    # Deploy to Railway (Recommended)"
echo "./deploy-heroku.sh     # Deploy to Heroku"
echo ""
echo "🧪 Local Testing:"
echo "npm install           # Install dependencies"
echo "./start-bot.sh        # Start bot locally"
echo ""
echo "🎭 Don't forget to configure @BotFather with KinkScout profile!"
