<<<<<<< HEAD
# 🎭 HypnoTagger Bot

![Version](https://img.shields.io/badge/version-1.0.0-ff6b6b?style=for-the-badge&logo=semantic-release)
![Status](https://img.shields.io/badge/status-active-4ecdc4?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-45b7d1?style=for-the-badge)
![Node](https://img.shields.io/badge/node-%3E%3D%2018.0.0-96ceb4?style=for-the-badge&logo=node.js)

## An intelligent Telegram bot that downloads videos and generates contextual hashtags using AI classification

## ✨ Features

- 🎬 **Video Download**: Seamlessly downloads videos from various platforms using `yt-dlp`
- 🏷️ **Smart Tagging**: AI-powered hashtag generation based on video content and metadata
- 📱 **Telegram Integration**: Clean, intuitive bot interface with real-time feedback
- 🔄 **Auto-cleanup**: Automatically removes temporary files after processing
- ⚡ **Fast Processing**: Optimized for quick turnaround times
- 🎯 **Interactive Categories**: User-prompted category creation and management
- 📊 **Confidence Scoring**: Advanced classification with confidence levels
- 🛠️ **Category Management**: Export, import, and manage classification categories

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- `yt-dlp` installed on your system
- Telegram Bot Token
- Chat ID for your target channel/group

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/[YOUR_USERNAME]/hypnotagger-bot.git
   cd hypnotagger-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   BOT_TOKEN=your_telegram_bot_token_here
   CHAT_ID=your_target_chat_id_here
   ```

4. **Launch the bot**

   ```bash
   npm start
   ```

## 🎯 Usage

### Bot Commands

Send these commands to your bot:

```text
/submit <video_url>     - Download and tag video
/classify <text>        - Test text classification
/categories             - List all available categories
/health                 - Check bot status
/help                   - Show help
/export                 - Export categories (admin only)
```

**Example:**

```text
/submit https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Interactive Classification Tool

Use the enhanced classification utility for manual testing and category management:

```bash
# Start interactive mode
node classify.js

# Available commands in interactive mode:
classify <text>           # Classify text
categories               # List all categories
interactive on/off       # Toggle category suggestions
export                   # Backup categories to file
import <file>            # Restore categories from file
help                     # Show command help
```

### Category Management

The system can automatically suggest new categories when it encounters unknown keywords:

1. **Automatic Detection**: System identifies potentially new keywords
2. **User Prompt**: Asks whether to create new category or assign to existing
3. **Interactive Creation**: Guides through category creation process
4. **Backup/Restore**: Export and import category configurations

The bot will:

1. 🌀 Extract video metadata
2. 📥 Download the video in best quality
3. 🧠 Analyze content and generate relevant hashtags
4. 📤 Post the video with generated tags to your specified chat

## 🛠️ Project Structure

```text
hypnotagger-bot/
├── 📄 index.js          # Main bot logic and Telegram integration
├── 🏷️ tagger.js         # AI classification engine
├── 📦 package.json      # Dependencies and scripts
├── 🚀 Procfile          # Deployment configuration
├── 🔒 .env              # Environment variables (create this)
└── 📖 README.md         # This file
```

## 🎨 Customization

### Modifying Tag Classification

Edit `tagger.js` to customize the AI classification logic:

```javascript
// Add custom tag categories
const customCategories = {
  technology: ['tech', 'coding', 'ai', 'software'],
  entertainment: ['music', 'gaming', 'comedy', 'movies'],
  // Add your own categories...
};
```

### Bot Responses

Customize bot messages in `index.js`:

```javascript
// Customize loading message
bot.sendMessage(chatId, `🌀 Your custom loading message...`);

// Customize error messages
bot.sendMessage(chatId, "❌ Your custom error message.");
```

## 🔧 Configuration

| Environment Variable | Description | Required |
|---------------------|-------------|----------|
| `BOT_TOKEN` | Your Telegram Bot API token | ✅ |
| `CHAT_ID` | Target chat/channel ID | ✅ |

## 📋 Requirements

- **System**: macOS, Linux, or Windows
- **Node.js**: Version 18.0.0 or higher
- **yt-dlp**: Latest version recommended
- **Memory**: 512MB+ available RAM
- **Storage**: Temporary space for video processing

## 🔄 Deployment

### Heroku Deployment

1. **Prepare for Heroku**

   ```bash
   heroku create your-app-name
   heroku config:set BOT_TOKEN=your_token_here
   heroku config:set CHAT_ID=your_chat_id_here
   ```

2. **Deploy**

   ```bash
   git push heroku main
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Security

- Never commit your `.env` file
- Keep your bot token secure
- Use environment variables for sensitive data
- Regularly update dependencies

## ⚡ Performance Tips

- Monitor bot memory usage during video processing
- Consider implementing queue system for high-traffic scenarios
- Use video format selection to optimize file sizes
- Implement rate limiting if needed

## 📞 Support

- 🐛 **Bug Reports**: Open an issue with detailed reproduction steps
- 💡 **Feature Requests**: Describe your use case and proposed solution
- 📚 **Documentation**: Help improve our docs
- 💬 **Questions**: Check existing issues before creating new ones

---

## 🏆 Built with ❤️ for the community

### Making video sharing smarter, one hashtag at a time
=======
# hypnotagger-bot
A Telegram bot that downloads videos and automatically generates hashtags using AI classification
>>>>>>> f5607455a09ea0d172946c2266ab6c0623917e38
