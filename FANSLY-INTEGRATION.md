# 🌟 Fansly Integration Guide

HypnoTagger Bot now supports **native Fansly content processing** with automatic detection, mystical classification, and seamless integration! 🎭✨

## 🔮 **What is Fansly Integration?**

Your HypnoTagger Bot can now automatically detect Fansly URLs and process them using the powerful [Fansly Downloader](https://github.com/Avnsx/fansly-downloader) by Avnsx. This means:

- ✅ **Automatic Detection**: Bot recognizes Fansly URLs instantly
- ⚡ **Native Processing**: Downloads content directly from Fansly
- 🎭 **Mystical Classification**: Applies hypnotic tags to Fansly content
- 🔗 **Seamless Integration**: Works alongside existing video processing
- 📱 **Progress Tracking**: Real-time updates with mystical themes

## 🚀 **Quick Setup**

### 1. **Install Fansly Integration**

```bash
chmod +x setup-fansly.sh
./setup-fansly.sh
```

### 2. **Configure Fansly Access**

Edit `config.ini` file:

```ini
[MyAccount]
Authorization_Token = YOUR_FANSLY_TOKEN_HERE
User_Agent = YOUR_BROWSER_USER_AGENT
```

### 3. **Get Your Fansly Token**

1. Login to Fansly in your browser
2. Open Developer Tools (F12)
3. Go to **Application** → **Local Storage** → **fansly.com**
4. Find `session_active_session` key
5. Copy the authorization token value

## 📱 **How It Works**

### **Automatic URL Detection**

```
User: /submit https://fansly.com/post/123456789
Bot: 🔮 Detected Fansly URL! Switching to mystical Fansly processor...
```

### **Processing Flow**

1. **🔮 Detection**: Bot recognizes Fansly URL pattern
2. **📥 Download**: Uses Fansly downloader to get content
3. **🎭 Classification**: Applies mystical tagging system
4. **📤 Upload**: Delivers classified content to Telegram
5. **🧹 Cleanup**: Automatic cleanup of temporary files

### **Mystical Progress Updates**

```
🔮 Connecting to Fansly realm... 25%
📥 Extracting mystical content... 50%
🎭 Classifying Fansly media... 75%
📤 Uploading enchanted files... 100%
✨ Fansly content successfully enchanted and uploaded!
```

## 🎯 **Supported Content Types**

| Content Type | Support | Classification | Upload |
|--------------|---------|----------------|--------|
| **Videos** | ✅ Full | 🎭 Hypnotic tags | 📱 Telegram video |
| **Images** | ✅ Full | 🌟 Visual analysis | 🖼️ Telegram photo |
| **Audio** | ✅ Basic | 🔮 Content-based | 🎵 Telegram audio |
| **Collections** | ✅ Batch | 📦 Multi-file | 📂 Sequential upload |

## ⚙️ **Configuration Options**

### **Fansly-Specific Settings**

```ini
[Options]
download_mode = Single              # Single post mode for bot
show_downloads = True               # Show download progress
download_media_previews = False     # Skip preview content
metadata_handling = Advanced        # Enhanced metadata support
```

### **Bot Integration Settings**

```javascript
const fanslyIntegration = new FanslyIntegration({
  pythonPath: 'python3',                    # Python executable
  tempDir: '/tmp',                          # Temporary files
  configPath: './config.ini'               # Fansly config
});
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### ❌ **"Fansly downloader not found"**

```bash
# Re-run setup script
./setup-fansly.sh

# Or manually download
curl -L -o fansly.zip "https://github.com/Avnsx/fansly-downloader/archive/master.zip"
```

#### ❌ **"Authorization token invalid"**

1. Clear browser cache and re-login to Fansly
2. Get fresh authorization token from browser storage
3. Update `config.ini` with new token

#### ❌ **"Python dependencies missing"**

```bash
pip3 install requests loguru python-dateutil plyvel-ci psutil imagehash m3u8 av pillow rich pyexiv2 mutagen
```

#### ❌ **"Post not accessible"**

- Make sure you're subscribed to the creator
- Verify the post URL is correct
- Check if the post requires special access

### **Debug Mode**

Enable detailed logging:

```javascript
// In index.js
log(`Fansly processing: ${url}`, 'DEBUG');
```

## 🌟 **Advanced Features**

### **Batch Processing**

Bot can handle multiple Fansly URLs:

```
/submit https://fansly.com/post/123
/submit https://fansly.com/post/456
```

### **Fallback Support**

If Fansly integration fails, bot automatically falls back to yt-dlp:

```
🔮 Fansly integration unavailable, using fallback method...
```

### **Smart Classification with Stylized Tags**

Fansly content gets enhanced classification with underground aesthetic:

```
🎬 Fansly Content Enchanted
📁 20241128_preview_id_123456.mp4
📦 Size: 42.3MB
🏷️ #ʜʏᴘɴᴏ #ᴘᴜᴘ #ᴘɪꜱꜱ #ꜰᴀɴꜱʟʏ #ᴘʀᴇᴍɪᴜᴍ

✨ Downloaded from the mystical Fansly realm
🎭 Added to curator queue for distribution
```

## 📊 **Benefits**

| Feature | Standard Processing | Fansly Integration |
|---------|-------------------|-------------------|
| **URL Support** | YouTube, general | + Fansly native |
| **Content Access** | Public only | + Subscription content |
| **Metadata** | Basic | + Rich Fansly data |
| **Classification** | Generic tags | + Platform-specific |
| **User Experience** | Standard | + Mystical themes |

## 🔒 **Privacy & Security**

- ✅ **Local Processing**: Your tokens stay on your server
- 🔐 **Encrypted Config**: Secure storage of credentials
- 🧹 **Auto-Cleanup**: Temporary files deleted automatically
- 🛡️ **Safe Downloads**: No malicious content execution
- 📝 **Audit Trail**: Full logging of all operations

## 🚀 **Performance**

- **Speed**: Native Fansly API = faster downloads
- **Reliability**: Direct content access = fewer failures  
- **Quality**: Original resolution preservation
- **Efficiency**: Intelligent chunking for large files

## 💡 **Tips & Best Practices**

1. **Keep Token Fresh**: Update authorization token regularly
2. **Monitor Usage**: Respect Fansly's rate limits
3. **Test URLs**: Verify post accessibility before batch processing
4. **Storage Management**: Large Fansly files use chunked processing
5. **Classification**: Review and adjust mystical tags as needed

## 🎭 **Integration with Fetish Hypno Hub**

Fansly integration works seamlessly with your new curator workflow:

- ✅ **Stylized Tags**: Automatic conversion to underground aesthetic (#ʜʏᴘɴᴏ #ᴘᴜᴘ #ᴘɪꜱꜱ)
- ✅ **Curator Queue**: Fansly content goes to curator review like other submissions
- ✅ **Multi-Channel Distribution**: Curators can push to vault/elite channels
- ✅ **Progress Management**: Real-time mystical updates with dark themes
- ✅ **Chunked Processing**: Large Fansly videos (>50MB) handled automatically
- ✅ **Classification System**: Full hypnotic tagging with fetish categories
- ✅ **Error Handling**: Graceful fallbacks to standard processing
- ✅ **Auto-cleanup**: Temporary file management and cleanup

## 📞 **Support**

Need help with Fansly integration?

- 🐛 **Bot Issues**: Check main HypnoTagger documentation
- 🔧 **Fansly Issues**: Visit [Fansly Downloader GitHub](https://github.com/Avnsx/fansly-downloader)
- 💬 **Community**: Join discussions and share tips

---

**🌟 Your HypnoTagger Bot now has mystical Fansly powers!** ✨

Process Fansly content with the same hypnotic magic as any other video, but with native platform integration for the best possible experience! 🎭🔮
