#!/bin/bash

# 🎭 Fansly Integration Setup Script for HypnoTagger Bot
# This script downloads and sets up the Fansly downloader

echo "🔮 Setting up Fansly integration for HypnoTagger Bot..."

# Create temp directory for downloads
TEMP_DIR="/tmp/fansly_setup"
mkdir -p "$TEMP_DIR"

# Download Fansly downloader
echo "📥 Downloading Fansly downloader..."
cd "$TEMP_DIR"
curl -L -o fansly-downloader.zip "https://github.com/Avnsx/fansly-downloader/archive/refs/heads/master.zip"

# Extract files
echo "📦 Extracting Fansly downloader..."
unzip -q fansly-downloader.zip

# Copy necessary files to bot directory
FANSLY_DIR="fansly-downloader-master"
BOT_DIR="/Users/pupfrisky/Downloads/hypnotagger-bot-updated"

echo "📁 Copying Fansly files to bot directory..."
cp "$FANSLY_DIR/fansly_downloader.py" "$BOT_DIR/"
cp "$FANSLY_DIR/requirements.txt" "$BOT_DIR/fansly_requirements.txt"
cp -r "$FANSLY_DIR/utils" "$BOT_DIR/"

# Copy default config if it doesn't exist
if [ ! -f "$BOT_DIR/config.ini" ]; then
    if [ -f "$FANSLY_DIR/config.ini" ]; then
        cp "$FANSLY_DIR/config.ini" "$BOT_DIR/"
        echo "📋 Copied default config.ini"
    fi
fi

# Install Python dependencies
echo "🐍 Installing Python dependencies for Fansly downloader..."
cd "$BOT_DIR"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m pip install --user requests loguru python-dateutil plyvel-ci psutil imagehash m3u8 av pillow rich pyexiv2 mutagen
    echo "✅ Python dependencies installed"
else
    echo "❌ Python 3 not found. Please install Python 3 first."
    exit 1
fi

# Create Fansly config template if needed
if [ ! -f "config.ini" ]; then
    echo "📝 Creating Fansly config template..."
    cat > config.ini << EOF
[TargetedCreator]
username = ReplaceMe

[MyAccount]
Authorization_Token = ReplaceMe
User_Agent = ReplaceMe

[Options]
download_mode = Single
show_downloads = True
download_media_previews = False
open_folder_when_finished = False
separate_messages = False
separate_previews = False
separate_timeline = False
metadata_handling = Advanced
utilise_duplicate_threshold = True

[TextSettings]
fansly_show_logo = False
fansly_show_intro = False
EOF
    echo "✅ Created config.ini template"
fi

# Cleanup
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo ""
echo "🎭 Fansly integration setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit config.ini and add your Fansly authorization token"
echo "2. Set the target creator username in config.ini"
echo "3. Your bot can now process Fansly URLs!"
echo ""
echo "🔮 To get your Fansly authorization token:"
echo "1. Login to Fansly in your browser"
echo "2. Open browser developer tools (F12)"
echo "3. Go to Application/Storage > Local Storage > fansly.com"
echo "4. Look for 'session_active_session' key"
echo "5. Copy the authorization token value"
echo ""
echo "✨ Happy mystical Fansly processing!"
