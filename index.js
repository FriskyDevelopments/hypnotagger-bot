require('dotenv').config();

// Enhanced logging first
function log(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${type}: ${message}`);
}

log('🔍 Starting HypnoTagger Bot initialization...', 'INFO');

const TelegramBot = require('node-telegram-bot-api');
log('✅ TelegramBot module loaded', 'INFO');

const { classifyWithConfidence, getCategories, exportCategories } = require('./tagger');
log('✅ Tagger module loaded', 'INFO');

const { ChunkedVideoProcessor } = require('./chunked-processor');
log('✅ ChunkedVideoProcessor module loaded', 'INFO');

const { ProgressManager } = require('./progress-manager');
log('✅ ProgressManager module loaded', 'INFO');

const { FanslyIntegration } = require('./fansly-integration');
log('✅ FanslyIntegration module loaded', 'INFO');

const { CuratorModule } = require('./curator-module');
log('✅ CuratorModule module loaded', 'INFO');

const { CivitaiIntegration } = require('./civitai-integration');
log('✅ CivitaiIntegration module loaded', 'INFO');

const { KinkScoutLogic } = require('./kinkscout-logic');
log('✅ KinkScoutLogic module loaded', 'INFO');

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
log('🔍 Checking environment variables...', 'INFO');
log(`Bot Token: ${process.env.BOT_TOKEN ? '✅ SET' : '❌ NOT SET'}`, 'INFO');
log(`Chat ID: ${process.env.CHAT_ID ? '✅ SET' : '❌ NOT SET'}`, 'INFO');

log('🤖 Initializing Telegram Bot...', 'INFO');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

log('✅ Telegram Bot initialized successfully', 'INFO');

// Initialize integrations
const chunkedProcessor = new ChunkedVideoProcessor({
  maxChunkSize: 40, // MB - more aggressive to catch 65MB files
  maxTotalSize: 500, // MB - reasonable total limit
  tempDir: process.env.TEMP_DIR || '/tmp',
  combineChunks: true // Always combine chunks back into full video
});

log('✅ ChunkedVideoProcessor initialized', 'INFO');

const fanslyIntegration = new FanslyIntegration({
  pythonPath: process.env.PYTHON_PATH || 'python3',
  tempDir: process.env.TEMP_DIR || '/tmp'
});

log('✅ FanslyIntegration initialized', 'INFO');

// Initialize progress manager
const progressManager = new ProgressManager(bot);

log('✅ ProgressManager initialized', 'INFO');

// Initialize the curator module
const curatorModule = new CuratorModule(bot);
log('✅ CuratorModule initialized', 'INFO');

// Initialize core components with enhanced mystical powers
const civitaiIntegration = CivitaiIntegration.getInstance({
  apiKey: process.env.CIVITAI_API_KEY,
  autoDLUrl: process.env.AUTOMATIC1111_URL || 'http://localhost:7860'
});

const kinkScoutLogic = new KinkScoutLogic();
log('🎭 Enhanced mystical components initialized', 'INFO');

// Test bot connectivity and show startup status
log('🔄 Testing bot connectivity...', 'INFO');
bot.getMe().then((botInfo) => {
  log(`✅ Bot connected successfully: @${botInfo.username}`, 'SUCCESS');
  log(`🤖 Bot ID: ${botInfo.id}`, 'INFO');
  log(`👤 Bot Name: ${botInfo.first_name}`, 'INFO');

  // Send startup message to the designated chat
  const chatId = process.env.CHAT_ID;
  if (chatId) {
    log(`📤 Sending startup notification to chat ${chatId}...`, 'INFO');
    bot.sendMessage(chatId,
      '🌟 *HypnoTagger Bot is ONLINE!* ✨\n\n' +
      '🎭 Ready to process mystical content\n' +
      '🔮 All systems operational\n' +
      '🎯 Submit URLs with /submit <url>\n\n' +
      '_The hypnotic realm awaits your content..._',
      { parse_mode: 'Markdown' }
    ).then(() => {
      log('✅ Startup notification sent successfully', 'SUCCESS');
    }).catch((error) => {
      log(`❌ Failed to send startup notification: ${error.message}`, 'ERROR');
    });
  }
}).catch((error) => {
  log(`❌ Bot connectivity test failed: ${error.message}`, 'ERROR');
  log('🔧 Check your BOT_TOKEN and internet connection', 'ERROR');
});

// Add message logging for debugging
bot.on('message', (msg) => {
  log(`Received message: ${msg.text} from ${msg.from.username || msg.from.first_name} in chat ${msg.chat.id}`);
});

// Add polling error handling
bot.on('polling_error', (error) => {
  log(`❌ Polling error: ${error.message}`, 'ERROR');
  log(`Error code: ${error.code}`, 'ERROR');
  log(`Error response: ${error.response?.body || 'No response body'}`, 'ERROR');
});

// Add general error handling
bot.on('error', (error) => {
  log(`❌ Bot error: ${error.message}`, 'ERROR');
});

// Improved error handling with personality
function handleError(error, context, chatId) {
  log(`Error in ${context}: ${error.message}`, 'ERROR');
  if (chatId) {
    const errorMessages = [
      '🌀 *The mystical energies have been disrupted...* Please try again, the trance will stabilize...',
      '✨ *A disturbance in the digital realm...* Fear not, HypnoTagger will recover shortly...',
      '🎭 *The spell encountered an obstacle...* Let me recalibrate my enchantments...',
      '💫 *The hypnotic flow was interrupted...* Please give me a moment to refocus...',
      '🔮 *An anomaly in the classification matrix...* The magic will return momentarily...'
    ];
    bot.sendMessage(chatId, errorMessages[Math.floor(Math.random() * errorMessages.length)], { parse_mode: 'Markdown' });
  }
}

// Helper function to cleanup files
function cleanupFiles(files) {
  files.forEach(file => {
    if (!file) return;
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        log(`Cleaned up: ${file}`);
      }
    } catch (error) {
      log(`Failed to cleanup ${file}: ${error.message}`, 'WARN');
    }
  });
}

// Enhanced video processing with progress management - handles @BotName commands
bot.onText(/\/submit(?:@\w+)?\s+(.+)/, async (msg, match) => {
  const chatId = process.env.CHAT_ID;
  const url = match[1];

  log(`🎯 Processing URL submission: ${url}`, 'INFO');
  log(`📤 From user: ${msg.from.username || msg.from.first_name}`, 'INFO');
  log(`💬 Chat ID: ${msg.chat.id}`, 'INFO');

  // Show typing indicator
  await progressManager.showTyping(chatId);

  // Validate URL first
  log(`🔍 Validating URL: ${url}`, 'INFO');
  const isValid = await progressManager.validateAndRespond(chatId, url);
  if (!isValid) {
    log(`❌ URL validation failed: ${url}`, 'WARN');
    return;
  }
  log(`✅ URL validation passed: ${url}`, 'INFO');

  // Start progress tracking
  const progressStages = [
    'Extracting mystical metadata...',
    'Analyzing video essence...',
    'Determining processing method...',
    'Downloading content...',
    'Classifying with AI magic...',
    'Generating mystical tags...',
    'Uploading to realm...'
  ];

  const progressId = await progressManager.startProgress(chatId, 'Video Processing', progressStages);

  const timestamp = Date.now();
  const tempJson = `video_${timestamp}.json`;
  let filename = null;

  log(`Processing video request for URL: ${url}`);

  try {
    // Check if this is a Fansly URL
    if (fanslyIntegration.isFanslyUrl(url)) {
      log('Detected Fansly URL, using Fansly integration');

      // Check if Fansly is available
      const fanslyAvailable = await fanslyIntegration.checkFanslyAvailability();

      if (fanslyAvailable) {
        // Complete current progress and start Fansly processing
        await progressManager.completeProgress(progressId, '🔮 Detected Fansly URL! Switching to mystical Fansly processor...');

        // Process Fansly content
        const fanslyProgressId = await progressManager.startProgress(chatId, 'Fansly Processing', [
          'Connecting to Fansly realm...',
          'Extracting mystical content...',
          'Classifying Fansly media...',
          'Uploading enchanted files...'
        ]);

        const downloadedFiles = await fanslyIntegration.downloadFanslyContent(url, bot, chatId, async (progress, message) => {
          await progressManager.updateProgress(fanslyProgressId, progress, message);
        });

        const processedFiles = await fanslyIntegration.processFanslyFiles(downloadedFiles, bot, chatId, async (contentText, interactive) => {
          return await classifyWithConfidence(contentText, interactive);
        });

        // Instead of direct upload, add to curator queue with stylized tags
        await progressManager.updateProgress(fanslyProgressId, 85, 'Adding Fansly content to curation queue...');

        for (const file of processedFiles) {
          // Convert regular tags to stylized tags using curator module
          const regularTags = file.tags || [];
          const styledTags = curatorModule.convertToStyledTags(regularTags.map(t => t.startsWith('#') ? t : '#' + t));

          // Add Fansly-specific styled tag
          styledTags.push('#ꜰᴀɴꜱʟʏ');

          // Create content data for curator workflow
          const contentData = {
            filename: file.filename,
            title: file.title || `Fansly Content ${Date.now()}`,
            duration: file.duration || 0,
            fileSize: file.fileSize || 'Unknown',
            filePath: file.filePath,
            originalUrl: url,
            regularTags: regularTags,
            styledTags: styledTags,
            description: (file.description || 'Fansly content').substring(0, 200),
            submittedBy: msg.from.username || msg.from.first_name,
            submittedAt: new Date(),
            source: 'fansly'
          };

          // Add to curator queue
          curatorModule.addToQueue(contentData);

          // Send confirmation to submitter about Fansly content
          const fanslyMsg = '🔮 **Fansly Content Added to Curation Queue**\n\n';
          const fanslyMsg2 = `🎬 **${file.title || 'Fansly Content'}**\n`;
          const fanslyMsg3 = `📦 Size: ${file.fileSize || 'Unknown'}\n`;
          const fanslyMsg4 = `🏷️ **Suggested Tags:** ${styledTags.join(' ')}\n\n`;
          const fanslyMsg5 = '✨ *Your Fansly content is now pending curator review*\n';
          const fanslyMsg6 = '🎭 *Once approved, it will be distributed with mystical Fansly powers!*';

          await bot.sendMessage(msg.chat.id, fanslyMsg + fanslyMsg2 + fanslyMsg3 + fanslyMsg4 + fanslyMsg5 + fanslyMsg6, { parse_mode: 'Markdown' });
        }

        await progressManager.completeProgress(fanslyProgressId, '✨ Fansly content added to curator queue successfully!');

        // Cleanup
        await fanslyIntegration.cleanup(downloadedFiles);
        cleanupFiles([tempJson]);
        return;
      } else {
        // Fallback to yt-dlp for Fansly URLs if integration unavailable
        await progressManager.updateProgress(progressId, 10, 'Fansly integration unavailable, using fallback method...');
      }
    }

    // Update progress: Metadata extraction
    await progressManager.updateProgress(progressId, 10, 'Extracting mystical metadata...');

    // First, extract metadata to get title
    await new Promise((resolve, reject) => {
      exec(`yt-dlp -j "${url}" > ${tempJson}`, (err) => {
        if (err) {
          handleError(err, 'Metadata extraction', chatId);
          reject(err);
          return;
        }
        resolve();
      });
    });

    // Update progress: Analyzing
    await progressManager.updateProgress(progressId, 25, 'Analyzing video essence...');

    // Read and parse metadata
    const metadata = JSON.parse(fs.readFileSync(tempJson, 'utf8'));
    const title = metadata.title || 'Untitled';
    const duration = metadata.duration || 0;
    const description = metadata.description || '';
    const filesize = metadata.filesize || metadata.filesize_approx || 0;
    const fileSizeMB = filesize / (1024 * 1024);

    log(`Video metadata extracted: "${title}" (${duration}s, ${fileSizeMB.toFixed(1)}MB)`);

    // If filesize is unknown, estimate based on duration and quality
    let estimatedSizeMB = fileSizeMB;
    if (fileSizeMB === 0 && duration > 0) {
      // Rough estimate: 1MB per minute for standard quality
      estimatedSizeMB = duration / 60;
      log(`File size unknown, estimated: ${estimatedSizeMB.toFixed(1)}MB based on duration`);
    }

    // Update progress: Processing decision
    await progressManager.updateProgress(progressId, 35, 'Determining processing method...');

    // Check if we need chunked processing for large videos
    const maxSingleSize = 40; // MB - more aggressive threshold to catch 65MB files
    const sizeToCheck = Math.max(fileSizeMB, estimatedSizeMB);

    // Enhanced detection for 65.3MB case
    if (sizeToCheck > maxSingleSize || (sizeToCheck === 0 && duration > 2400)) { // Also catch long videos with unknown size
      // Complete this progress and start chunked processing
      await progressManager.completeProgress(progressId, `⚠️ File too large (${sizeToCheck.toFixed(1)}MB). Max: 50MB - Switching to chunked processing...`);

      // Use chunked processor for large videos
      await chunkedProcessor.processLargeVideo(url, bot, chatId, async (contentText, interactive) => {
        return await classifyWithConfidence(contentText, interactive);
      });

      cleanupFiles([tempJson]);
      return;
    }

    // Generate safe filename for normal processing
    filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${timestamp}.mp4`;

    // Check video duration (optional limit)
    const maxDuration = parseInt(process.env.MAX_DURATION_SECONDS || '3600');
    if (duration > maxDuration) {
      await progressManager.errorProgress(progressId, `Video too long (${Math.round(duration / 60)}min). Max: ${Math.round(maxDuration / 60)}min`);
      cleanupFiles([tempJson]);
      return;
    }

    // Update progress: Downloading
    await progressManager.updateProgress(progressId, 50, `Downloading "${title}"...`);

    await new Promise((resolve, reject) => {
      exec(`yt-dlp -f best -o "${filename}" "${url}"`, async (error) => {
        if (error) {
          handleError(error, 'Video download', chatId);
          reject(error);
          return;
        }
        resolve();
      });
    });

    // Update progress: Classification
    await progressManager.updateProgress(progressId, 70, 'Classifying with AI magic...');

    // Enhanced tagging with confidence and stylized tags
    const contentText = `${title} ${description}`;
    const tagResult = await classifyWithConfidence(contentText, false); // Non-interactive for bot
    const regularTags = tagResult.tags;

    // Convert to stylized tags using curator module
    const styledTags = curatorModule.convertToStyledTags(regularTags.map(t => '#' + t));

    log(`Generated regular tags: ${regularTags.join(', ')}`);
    log(`Converted to styled tags: ${styledTags.join(', ')}`);

    // Check file size before upload - CRITICAL fallback for 65.3MB files
    const stats = fs.statSync(filename);
    const actualSizeMB = stats.size / (1024 * 1024);
    const maxSizeMB = 45; // MB - be more aggressive

    if (actualSizeMB > maxSizeMB) {
      log(`⚠️ File too large after download: ${actualSizeMB.toFixed(1)}MB, switching to chunked processing`);

      // Complete current progress and switch to chunked processing
      await progressManager.completeProgress(progressId, `⚠️ File too large (${actualSizeMB.toFixed(1)}MB). Max: 50MB - Reprocessing with chunks...`);

      // Clean up the large file
      cleanupFiles([filename]);

      // Use chunked processor as fallback
      await chunkedProcessor.processLargeVideo(url, bot, chatId, async (contentText, interactive) => {
        return await classifyWithConfidence(contentText, interactive);
      });

      cleanupFiles([tempJson]);
      return;
    }

    // Update progress: Adding to curation queue
    await progressManager.updateProgress(progressId, 85, 'Adding to curation queue...');

    // Create content data for curator workflow
    const contentData = {
      filename: filename,
      title: title,
      duration: duration,
      fileSize: `${actualSizeMB.toFixed(1)}MB`,
      filePath: path.resolve(filename),
      originalUrl: url,
      regularTags: regularTags,
      styledTags: styledTags,
      description: description.substring(0, 200), // Truncate description
      submittedBy: msg.from.username || msg.from.first_name,
      submittedAt: new Date()
    };

    // Add to curator queue instead of direct upload
    curatorModule.addToQueue(contentData);

    log(`Added to curator queue: ${title} (${actualSizeMB.toFixed(1)}MB)`);

    // Create preview message for user
    const previewMsg = '🎭 **Content Added to Curation Queue**\n\n';
    const previewMsg2 = `🎬 **${title}**\n`;
    const previewMsg3 = `⏱️ Duration: ${Math.round(duration / 60)}:${String(duration % 60).padStart(2, '0')}\n`;
    const previewMsg4 = `📦 Size: ${actualSizeMB.toFixed(1)}MB\n`;
    const previewMsg5 = `🏷️ **Suggested Tags:** ${styledTags.join(' ')}\n\n`;
    const previewMsg6 = '✨ *Your content is now pending curator review*\n';
    const previewMsg7 = '🎭 *Once approved, it will be distributed to:*\n';
    const previewMsg8 = '• @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ (Teasers)\n';
    const previewMsg9 = '• @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ (VIP Full Access)';

    // Send confirmation to submitter
    await bot.sendMessage(msg.chat.id, previewMsg + previewMsg2 + previewMsg3 + previewMsg4 + previewMsg5 + previewMsg6 + previewMsg7 + previewMsg8 + previewMsg9, { parse_mode: 'Markdown' });

    // Complete progress with success
    await progressManager.completeProgress(progressId, `"${title}" added to curation queue successfully!`);

  } catch (error) {
    await progressManager.errorProgress(progressId, 'Processing failed - mystical energies disrupted');
    handleError(error, 'Video processing', chatId);
  } finally {
    // Always cleanup files
    const filesToClean = [tempJson];
    if (filename) filesToClean.push(filename);
    cleanupFiles(filesToClean);
  }
});

// Categories management command with personality - handles @BotName
bot.onText(/\/categories(?:@\w+)?/, (msg) => {
  const chatId = msg.chat.id;
  const categories = getCategories();

  let message = '🎭 *My hypnotic classification chambers:*\n\n';
  message += '✨ *Each category holds its own mystical power...*\n\n';

  categories.forEach((cat, index) => {
    const emoji = ['🌀', '🎯', '💫', '🔮', '⚡', '🌟', '💎', '🎪', '🔥', '🌊', '🎨'][index % 11];
    message += `${emoji} \`${cat}\` - *where ${cat} dreams reside*\n`;
  });
  message += `\n🎭 *Total mystical realms:* ${categories.length}`;

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Test classification command with personality - handles @BotName
bot.onText(/\/classify(?:@\w+)?\s+(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  try {
    const analyzeMessages = [
      '🔮 *Gazing into the crystal ball*... reading the essence of your text...',
      '🌀 *Spiraling into analysis mode*... let me decode your words...',
      '✨ *Channeling mystical algorithms*... divining the true nature...',
      '🎭 *Entering the classification trance*... your text speaks to me...',
      '💫 *Weaving through digital dimensions*... uncovering hidden meanings...'
    ];

    await progressManager.sendTemporaryMessage(chatId, analyzeMessages[Math.floor(Math.random() * analyzeMessages.length)], 2000);

    const result = await classifyWithConfidence(text, false);
    const tags = result.tags;
    const confidence = result.confidence;

    let message = '🎯 *Classification Results:*\n\n';
    message += `📝 *Input:* "${text}"\n\n`;
    message += `🏷️ *Generated Tags:* ${tags.map(t => '#' + t).join(' ')}\n\n`;
    message += `📊 *Confidence:* ${(confidence * 100).toFixed(1)}%\n\n`;

    if (confidence > 0.8) {
      message += '✨ *High confidence - the mystical classification is strong!*';
    } else if (confidence > 0.6) {
      message += '🌟 *Good confidence - the digital spirits are aligned.*';
    } else {
      message += '🔮 *Moderate confidence - the energies are somewhat uncertain.*';
    }

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Classification test', chatId);
  }
});

// Export categories command - handles @BotName
bot.onText(/\/export(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const exported = exportCategories();
    const message = `🎭 *Categories Export*\n\`\`\`json\n${JSON.stringify(exported, null, 2)}\n\`\`\``;
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Category export', chatId);
  }
});

// Start command with mystical personality - handles @BotName
bot.onText(/\/start(?:@\w+)?/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name || 'mysterious soul';

  const welcomeMessages = [
    `🌀 *Welcome, ${username}!* You have entered the realm of HypnoTagger...`,
    `✨ *Greetings, ${username}!* Your presence awakens the mystical algorithms...`,
    `🎭 *Ah, ${username}!* The digital spirits have been expecting you...`,
    `💫 *Hello, ${username}!* Step into my hypnotic classification chamber...`,
    `🔮 *${username}, you have found me!* Let the tagging enchantment begin...`
  ];

  const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  let fullMessage = `${welcomeMessage}

📋 *Basic Commands:*
🎬 \`/submit [URL]\` - Submit video for processing
🏷️ \`/classify [text]\` - Test classification
📂 \`/categories\` - View available categories
📤 \`/export\` - Export classification data

🌀 *Curator Commands:* *(Authorized users only)*
🏷️ \`/tag [content]\` - Apply mystical tags
📺 \`/sendteaser\` - Send to Teaser Channel
⭐ \`/sendvip\` - Send to VIP Channel
❌ \`/reject\` - Reject content

🎨 *AI Generation Commands:*
🖼️ \`/generate [prompt]\` - Generate AI images
🕵️ \`/kinkscout [scenario]\` - Generate KinkScout character
🤖 \`/aimodels\` - List available AI models
🔄 \`/switchmodel [name]\` - Switch AI model

✨ *I specialize in mystical video processing, AI generation, and enchanted tagging...*`;

  // Add KinkScout info if available
  if (process.env.KINKSCOUT_BOT_TOKEN) {
    fullMessage += '\n\n🕵️ *KinkScout Operations:*\nDedicated KinkScout bot available for specialized missions!';
  }

  bot.sendMessage(chatId, fullMessage, { parse_mode: 'Markdown' });
});

// Curator Commands - 🌀 Fetish Hypno Hub Architecture
bot.onText(/\/tag(?:@\w+)?\s+(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    if (!curatorModule.isAuthorizedCurator(userId)) {
      return bot.sendMessage(chatId, '❌ *Access Denied*\n\nYou are not authorized to use curator commands.', { parse_mode: 'Markdown' });
    }

    const result = await curatorModule.tagContent(msg, match[1]);
    bot.sendMessage(chatId, result.message, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Tag command', chatId);
  }
});

bot.onText(/\/sendteaser(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    if (!curatorModule.isAuthorizedCurator(userId)) {
      return bot.sendMessage(chatId, '❌ *Access Denied*\n\nYou are not authorized to use curator commands.', { parse_mode: 'Markdown' });
    }

    const result = await curatorModule.sendToTeaser(msg);
    bot.sendMessage(chatId, result.message, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Send Teaser command', chatId);
  }
});

bot.onText(/\/sendvip(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    if (!curatorModule.isAuthorizedCurator(userId)) {
      return bot.sendMessage(chatId, '❌ *Access Denied*\n\nYou are not authorized to use curator commands.', { parse_mode: 'Markdown' });
    }

    const result = await curatorModule.sendToVIP(msg);
    bot.sendMessage(chatId, result.message, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Send VIP command', chatId);
  }
});

bot.onText(/\/reject(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    if (!curatorModule.isAuthorizedCurator(userId)) {
      return bot.sendMessage(chatId, '❌ *Access Denied*\n\nYou are not authorized to use curator commands.', { parse_mode: 'Markdown' });
    }

    const result = await curatorModule.rejectContent(msg);
    bot.sendMessage(chatId, result.message, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Reject command', chatId);
  }
});

// AI Generation Commands
bot.onText(/\/generate(?:@\w+)?\s+(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prompt = match[1];

  try {
    // Check if Automatic1111 is available
    const isAvailable = await civitaiIntegration.checkAutomatic1111Availability();
    if (!isAvailable) {
      return bot.sendMessage(chatId, '❌ *AI Generation Unavailable*\n\nAutomatic1111 WebUI is not running. Please start it first.', { parse_mode: 'Markdown' });
    }

    bot.sendMessage(chatId, `🎨 *Generating AI content...*\n\nPrompt: "${prompt}"\n\n⏳ This may take a few moments...`, { parse_mode: 'Markdown' });

    const result = await civitaiIntegration.processGenerationRequest(prompt, {}, msg.from, curatorModule);

    if (result.success) {
      const tagsText = result.tags.join(' ');
      bot.sendMessage(chatId, `✨ *AI Generation Complete!*\n\n🎯 *Tags:* ${tagsText}\n🎭 *Status:* Added to curator queue\n\n_Your AI-generated content awaits curator approval..._`, { parse_mode: 'Markdown' });
    }
  } catch (error) {
    handleError(error, 'AI Generation', chatId);
  }
});

bot.onText(/\/kinkscout(?:@\w+)?\s+(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const scenario = match[1];

  try {
    const isAvailable = await civitaiIntegration.checkAutomatic1111Availability();
    if (!isAvailable) {
      return bot.sendMessage(chatId, '❌ *AI Generation Unavailable*\n\nAutomatic1111 WebUI is not running.', { parse_mode: 'Markdown' });
    }

    bot.sendMessage(chatId, `🕵️ *Generating KinkScout character...*\n\nScenario: "${scenario}"\n\n⏳ Creating mystical scout leader...`, { parse_mode: 'Markdown' });

    const result = await civitaiIntegration.generateKinkScout(scenario);
    const saved = await civitaiIntegration.saveGeneratedImage(result.images[0], `KinkScout: ${scenario}`);

    // Add to curator queue
    const styledTags = civitaiIntegration.generateStylizedTags(`kinkscout ${scenario}`);
    const contentData = {
      filename: saved.filename,
      title: `KinkScout: ${scenario}`,
      duration: 0,
      fileSize: saved.fileSize,
      filePath: saved.filepath,
      originalUrl: 'ai-kinkscout',
      regularTags: styledTags.map(tag => tag.replace('#', '')),
      styledTags: styledTags,
      description: `AI-generated KinkScout character: ${scenario}`,
      submittedBy: msg.from,
      submittedAt: new Date(),
      source: 'civitai-kinkscout'
    };

    curatorModule.addToQueue(contentData);

    const tagsText = styledTags.join(' ');
    bot.sendMessage(chatId, `🕵️ *KinkScout Generated!*\n\n🎯 *Tags:* ${tagsText}\n🎭 *Status:* Added to curator queue\n\n_Your mystical scout leader awaits deployment..._`, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'KinkScout Generation', chatId);
  }
});

bot.onText(/\/aimodels(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const models = await civitaiIntegration.getAvailableModels();
    if (models.length === 0) {
      return bot.sendMessage(chatId, '❌ *No AI models available*\n\nAutomatic1111 may not be running or no models are installed.', { parse_mode: 'Markdown' });
    }

    const modelList = models.slice(0, 10).map((model, index) => `${index + 1}. ${model}`).join('\n');
    bot.sendMessage(chatId, `🎨 *Available AI Models*\n\n${modelList}\n\n_Use /switchmodel <name> to change models_`, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'List AI Models', chatId);
  }
});

bot.onText(/\/switchmodel(?:@\w+)?\s+(.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const modelName = match[1];

  try {
    const success = await civitaiIntegration.switchModel(modelName);
    if (success) {
      bot.sendMessage(chatId, `✅ *Model switched to:* ${modelName}\n\n_Ready for AI generation with new model..._`, { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(chatId, `❌ *Failed to switch model*\n\nModel "${modelName}" may not exist.`, { parse_mode: 'Markdown' });
    }
  } catch (error) {
    handleError(error, 'Switch AI Model', chatId);
  }
});

// Enhanced KinkScout Commands
bot.onText(/\/scout_guide(?:@\w+)?(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const topic = match[1] || 'general';

  try {
    const guidance = kinkScoutLogic.getGuidance(topic);
    bot.sendMessage(chatId, guidance, { parse_mode: 'Markdown' });
  } catch (error) {
    handleError(error, 'Scout Guide', chatId);
  }
});

bot.onText(/\/underground_map(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;

  const mapMessage = '🗺️ *Underground Exploration Map*\n\n' +
    '🔮 **Mystical Realms:**\n' +
    '• Hypno Chambers - Trance and mind control\n' +
    '• Transformation Caverns - Identity exploration\n' +
    '• Power Exchange Tunnels - Dom/sub dynamics\n\n' +
    '🐕 **Pup Territory:**\n' +
    '• Training Grounds - Pup skill development\n' +
    '• Pack Gathering Caves - Community bonding\n' +
    '• Alpha Den - Leadership experiences\n\n' +
    '🧸 **Bear Domain:**\n' +
    '• Daddy\'s Workshop - Mentorship space\n' +
    '• Comfort Caverns - Nurturing experiences\n' +
    '• Strength Chambers - Power and protection\n\n' +
    '💧 **Aquatic Depths:**\n' +
    '• Steam Grottos - Watersports exploration\n' +
    '• Golden Streams - Liquid experiences\n' +
    '• Cleansing Pools - Purification rituals\n\n' +
    '_Use /scout_guide [location] to explore specific areas..._';

  bot.sendMessage(chatId, mapMessage, { parse_mode: 'Markdown' });
});

bot.onText(/\/scout_wisdom(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;

  const randomWisdom = kinkScoutLogic.getRandomWisdom();
  bot.sendMessage(chatId, `🕵️ *KinkScout Wisdom*\n\n${randomWisdom}\n\n_Your guide shares ancient underground knowledge..._`, { parse_mode: 'Markdown' });
});

// KinkScout Content Enhancement for Curators
bot.onText(/\/enhance_kinkscout(?:@\w+)?/, async (msg) => {
  const chatId = msg.chat.id;

  if (!curatorModule.isAuthorizedCurator(msg.from.id)) {
    return bot.sendMessage(chatId, '❌ *Access Denied*\n\nKinkScout enhancement is for authorized curators only.', { parse_mode: 'Markdown' });
  }

  const enhancement = kinkScoutLogic.enhanceContent('general');
  bot.sendMessage(chatId, enhancement, { parse_mode: 'Markdown' });
});

// Bot startup message with mystical theme
log('🌀 HypnoTagger Bot awakening...', 'INFO');
log('✨ Mystical energies aligning...', 'INFO');
log('🎭 Digital enchantments loading...', 'INFO');
log('💫 Ready to weave hypnotic magic!', 'INFO');

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  log(`Uncaught Exception: ${error.message}`, 'ERROR');
  console.error(error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection at: ${JSON.stringify(promise)}, reason: ${JSON.stringify(reason)}`, 'ERROR');
});

console.log('🔮 HypnoTagger Bot is now LIVE and ready to enchant your videos! ✨');
