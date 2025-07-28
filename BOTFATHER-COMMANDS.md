# 🤖 BotFather Commands - Quick Reference

## 📋 **Complete BotFather Command List**

### **🚀 Bot Creation & Setup**

```text
/newbot                     # Create a new bot
/setname                    # Change bot display name
/setdescription            # Set bot description (shown in chat)
/setabouttext              # Set "About" text for bot profile
/setuserpic                # Upload bot profile picture
/deleteuserpic             # Remove bot profile picture
```

### **⚙️ Bot Configuration**

```text
/setcommands               # Set bot command menu
/setjoingroups             # Allow/disallow bot joining groups
/setprivacy                # Set privacy mode (groups only)
/setinline                 # Enable/disable inline mode
/setinlinefeedback         # Configure inline feedback
/setinlinegeo              # Set inline location requests
```

### **🔧 Bot Management**

```text
/mybots                     # List all your bots
/token                      # Get or regenerate bot token
/revoke                     # Revoke current bot token
/deletebot                 # Delete bot permanently
```

### **📱 Domain & Web Features**

```text
/setdomain                 # Set bot domain
/setdomainpic              # Set domain picture
/deletedomain              # Remove domain
```

### **📊 Bot Information**

```text
/stats                      # View bot statistics
/getcommands               # View current bot commands
/getdescription            # View current description
/getname                   # View current bot name
```

---

## 🎯 **Step-by-Step Bot Setup**

### **1. Create Your Bot**

```text
/start                      # Start conversation with BotFather
/newbot                     # Create new bot
```

**Follow prompts:**

- **Bot Name**: `HypnoTagger Bot` (display name)
- **Username**: `hypnotagger_bot` (must end with "_bot")

### **2. Configure Commands Menu**

```text
/setcommands
```

**Paste this command list:**

```text
start - Initialize bot and show welcome
help - Show help message and available commands
health - Check bot status and connectivity
submit - Download and tag video from URL
classify - Test text classification system
categories - List all available topic categories
export - Export category configuration (admin only)
```

### **3. Set Description**

```text
/setdescription
```

**Paste this description:**

```text
🎭 An intelligent Telegram bot that downloads videos and generates contextual hashtags using AI classification. Automatically categorizes content into topics and provides smart tagging for easy organization.
```

### **4. Set About Text**

```text
/setabouttext
```

**Paste this about text:**

```text
🎯 HypnoTagger Bot - AI-powered video classification
🎬 Downloads videos from various platforms
🏷️ Generates smart hashtags automatically
📊 Interactive category management
⚡ Fast processing with real-time feedback

Send /help to get started!
```

### **5. Configure Settings**

```text
/setjoingroups              # Choose: Enable (allows group usage)
/setprivacy                 # Choose: Disable (bot sees all messages)
```

---

## 🔑 **Important Tokens & IDs**

After creating your bot, BotFather will give you:

### **Bot Token** (Keep Secret!)

```text
123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

### **Getting Chat ID**

1. Add bot to your target channel/group
2. Send a test message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
4. Find the `chat.id` value

---

## 🛠️ **Useful BotFather Tips**

### **Token Management**

```text
/token                      # View current token
/revoke                     # Generate new token (old one stops working)
```

### **Bot Information**

```text
/mybots                     # See all your bots
/stats                      # View usage statistics
```

### **Command Updates**

```text
/setcommands               # Update command menu anytime
/getcommands               # View current commands
```

---

## 📱 **Example BotFather Conversation**

```text
You: /newbot
BotFather: Alright, a new bot. How are we going to call it?

You: HypnoTagger Bot
BotFather: Good. Now let's choose a username for your bot.

You: hypnotagger_bot
BotFather: Done! Congratulations on your new bot. You will find it at t.me/hypnotagger_bot. You can now add a description...

You: /setcommands
BotFather: Choose a bot to change the list of commands.

You: @hypnotagger_bot
BotFather: Send me a list of commands for your bot.

You: [paste command list from above]
BotFather: Success! Command list updated.
```

---

## 🚨 **Security Notes**

- **Never share your bot token** - treat it like a password
- **Use /revoke** if token is compromised
- **Keep token in environment variables**, never in code
- **Use /setprivacy Disable** for group functionality

Your bot is now ready for deployment with the HypnoTagger system!
