# 📱 Telegram Channel Creation Guide

**Step-by-step setup for your Fetish Hypno Hub infrastructure**

## 🎯 **Quick Overview**

You need to create **4 Telegram channels/groups** with these exact names and settings:

| Channel Type | Display Name | Username | Privacy |
|--------------|--------------|----------|---------|
| **Teaser Channel** | ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ 🔓 | @HypnoFetishVault | Public |
| **VIP Channel** | ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ 🔐 | @HypnoFetishElite | Private |
| **Chat Group** | ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ 💬 | @HypnoFetishLounge | Private |
| **Curator Room** | ᴡᴇɪʀᴅʜʏᴘɴᴏʙᴀᴛɪɴɢᴠᴀᴜʟᴛ 🧠 | @WeirdHypnobatingVault | Private |

---

## 🔓 **Step 1: Create Teaser Channel (Public)**

### **In Telegram:**

1. **Open Telegram** → **Menu** → **New Channel**

2. **Channel Info:**
   - **Name**: `ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ 🔓`
   - **Description**:

   ```
   🌀 Underground Fetish Content Teasers
   
   ✨ Mystical previews and highlights
   🎭 Curated by ʜʏᴘɴᴏᴛᴀɢɢᴇʀʙᴏᴛ
   🔓 Public access for discovery
   
   ᴠɪᴘ ᴀᴄᴄᴇꜱꜱ: @HypnoFetishElite
   ᴄʜᴀᴛ ᴡɪᴛʜ ᴜꜱ: @HypnoFetishLounge
   ```

3. **Privacy Settings:**
   - ✅ **Public Channel**
   - **Username**: `HypnoFetishVault`
   - ✅ **Allow others to find this channel**

4. **Add Your Bot:**
   - **Add Members** → Search `@HypnotaggerBot`
   - **Make Admin** with these permissions:
     - ✅ **Post messages**
     - ✅ **Edit messages**
     - ✅ **Delete messages**
     - ✅ **Add new admins** (optional)

5. **Get Channel ID:**
   - Send any message to the channel
   - Forward that message to **@userinfobot**
   - Copy the channel ID (starts with -100...)

---

## 🔐 **Step 2: Create VIP Channel (Private)**

### **In Telegram:**

1. **New Channel** → **Channel Info:**
   - **Name**: `ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ 🔐`
   - **Description**:

   ```
   🌀 Elite Fetish Content - VIP Access Only
   
   🔐 Full scenes and exclusive content  
   ✨ Curated mystical experiences
   🎭 Underground aesthetic mastery
   
   ᴘᴜʙʟɪᴄ ᴛᴇᴀꜱᴇʀꜱ: @HypnoFetishVault
   ᴄʜᴀᴛ ᴡɪᴛʜ ᴜꜱ: @HypnoFetishLounge
   ```

2. **Privacy Settings:**
   - ✅ **Private Channel**
   - **Username**: `HypnoFetishElite`

3. **Add Your Bot as Admin** (same permissions as above)

4. **Get Channel ID** (same method as Step 1)

---

## 💬 **Step 3: Create Chat Group (Private)**

### **In Telegram:**

1. **New Group** → **Group Info:**
   - **Name**: `ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ 💬`
   - **Description**:

   ```
   🌀 Mystical Fetish Community Lounge
   
   💬 Chat, discuss, and connect
   🎭 Underground community vibes
   ✨ Moderated by curators
   
   ᴄᴏɴᴛᴇɴᴛ ᴄʜᴀɴɴᴇʟꜱ:
   🔓 @HypnoFetishVault (Teasers)
   🔐 @HypnoFetishElite (VIP)
   ```

2. **Privacy Settings:**
   - ✅ **Private Group**
   - **Username**: `HypnoFetishLounge`

3. **Group Settings:**
   - **Group Type**: Private Group
   - **Who can add members**: Only admins
   - **Chat history for new members**: Hidden

4. **Add Your Bot as Admin** with these permissions:
   - ✅ **Delete messages**
   - ✅ **Ban users**
   - ✅ **Invite users via link**
   - ✅ **Pin messages**
   - ✅ **Add new admins**

5. **Get Group ID** (same method as channels)

---

## 🧠 **Step 4: Create Curator Room (Private)**

### **In Telegram:**

1. **New Group** → **Group Info:**
   - **Name**: `ᴡᴇɪʀᴅʜʏᴘɴᴏʙᴀᴛɪɴɢᴠᴀᴜʟᴛ 🧠`
   - **Description**:

   ```
   🧠 Private Curator Operations Room
   
   🎭 Content review and curation
   🔮 Bot commands and management
   ⚡ Elite curator discussions
   
   ᴀᴄᴄᴇꜱꜱ: ɪɴᴠɪᴛᴇ ᴏɴʟʏ
   ```

2. **Privacy Settings:**
   - ✅ **Private Group**
   - **Username**: `WeirdHypnobatingVault`

3. **Ultra-Private Settings:**
   - **Who can add members**: Only admins
   - **Chat history for new members**: Hidden
   - **Who can send messages**: Only admins

4. **Add Your Bot as Admin** (full permissions)

5. **Get Group ID**

---

## 🔧 **Step 5: Configure Your Bot**

### **Update .env File:**

Replace the channel IDs in your `.env` file:

```bash
# Replace these with your actual channel IDs
VAULT_CHANNEL_ID=-1001234567890    # From @HypnoFetishVault
ELITE_CHANNEL_ID=-1001234567891    # From @HypnoFetishElite  
LOUNGE_CHANNEL_ID=-1001234567892   # From @HypnoFetishLounge
CURATOR_ROOM_ID=-1001234567893     # From @WeirdHypnobatingVault

# Add your Telegram user ID as admin curator
ADMIN_CURATORS=123456789           # Your user ID (get from @userinfobot)
```

### **Get Your User ID:**

1. Send any message to **@userinfobot**
2. Copy your user ID number
3. Add it to `ADMIN_CURATORS` in `.env`

---

## ✅ **Step 6: Test Your Setup**

### **Start Your Bot:**

```bash
./start-hub.sh
```

### **Test Commands in Curator Room:**

Send these to `@WeirdHypnobatingVault`:

```
/start
/queue  
/stats
```

### **Test Content Submission:**

In any chat with your bot:

```
/submit https://example.com/video.mp4
```

---

## 🎯 **Quick Reference Card**

**Save this for easy access:**

```
🔓 Teasers: @HypnoFetishVault
🔐 VIP: @HypnoFetishElite  
💬 Chat: @HypnoFetishLounge
🧠 Curators: @WeirdHypnobatingVault
🤖 Bot: @HypnotaggerBot
```

**Channel IDs Format:**

- All start with `-100`
- Usually 13-14 digits total
- Example: `-1001234567890`

**User ID Format:**

- Usually 8-10 digits
- Example: `123456789`

---

## 🚨 **Troubleshooting**

### **Bot Not Posting to Channel:**

1. Check bot is admin with **Post messages** permission
2. Verify channel ID is correct (starts with -100)
3. Test with `/sendtest` command

### **"Chat not found" Error:**

1. Bot must be added to the channel/group first
2. Bot must be admin before getting ID
3. Double-check ID format in `.env`

### **Commands Not Working:**

1. Verify your user ID is in `ADMIN_CURATORS`
2. Check you're sending commands in the curator room
3. Restart bot after changing `.env`

---

## 🎉 **You're Ready!**

Once all channels are created and configured:

1. **Launch**: `./start-hub.sh`
2. **Test**: Submit content and use curator commands
3. **Enjoy**: Your underground fetish empire is operational! 🌀✨

**Need help?** Check the logs or test individual components with the provided test scripts! 🎭
