#!/bin/bash

# 🔮 Fetish Hypno Hub Quick Start
echo "🌀 Starting Fetish Hypno Hub..."
echo "=============================="

# Check if we're in the right directory
if [ ! -f "index.js" ]; then
    echo "❌ index.js not found. Please run from bot directory."
    exit 1
fi

# Check environment
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    exit 1
fi

echo "✅ Environment validated"
echo "🚀 Starting HypnoTagger Bot with Fetish Hypno Hub architecture..."
echo ""
echo "🎭 Welcome to Fetish Hypno Hub!"
echo ""
echo "📋 FIRST TIME SETUP:"
echo "• Follow TELEGRAM-SETUP-GUIDE.md to create channels"
echo "• Use SETUP-CHECKLIST.md to track progress"  
echo "• Run: node get-channel-ids.js (to verify setup)"
echo ""
echo "  • Curator workflow with stylized tags"
echo "  • Multi-channel distribution system"
echo "  • Chunked video processing (>50MB)"
echo "  • Fansly integration support"
echo "  • Enhanced progress tracking"
echo ""
echo "🏷️ Stylized Tags: #ʜʏᴘɴᴏ #ᴘᴜᴘ #ᴘɪꜱꜱ #ʙᴇᴀʀ #ᴄᴜᴍᴄᴏɴᴛʀᴏʟ"
echo ""
echo "📋 Curator Commands:"
echo "  /start - Curator interface"
echo "  /tag #tags - Apply stylized tags"  
echo "  /sendpreview - Send to vault"
echo "  /sendfull - Send to elite"
echo "  /queue - View pending content"
echo ""
echo "🌀 Starting bot..."

echo ""
echo "🎨 AI Generation Features:"
echo "• /generate [prompt] - Generate AI images using Stable Diffusion"
echo "• /kinkscout [scenario] - Generate KinkScout character variations"
echo "• /aimodels - List available AI models"
echo "• /switchmodel [name] - Switch between AI models"
echo ""
echo "📋 AI Setup Requirements:"
echo "• Automatic1111 WebUI running on http://localhost:7860"
echo "• NSFW models installed (see CIVITAI-INTEGRATION.md)"
echo "• Sufficient GPU memory (6GB+ recommended)"
echo ""
echo "🧪 Test AI integration:"
echo "   node test-civitai.js --generate"
echo ""

# Start the bot
node index.js
