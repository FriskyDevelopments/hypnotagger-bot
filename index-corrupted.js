require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { classifyTags, classifyWithConfidence, getCategories, exportCategories } = require('./tagger');
const { ChunkedVideoProcessor } = await bot.sendVideo(chatId, fs.createReadStream(path.resolve(filename)), {
  caption,
  parse_mode: 'Markdown',
  supports_streaming: true
});

log(`Successfully processed: ${title}`); chunked - processor');
const { ProgressManager } = require('./progress-manager');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

// Initialize chunked video processor
const chunkedProcessor = new ChunkedVideoProcessor({
  maxChunkSize: 45, // MB - under Telegram's 50MB limit
  maxTotalSize: 500, // MB - reasonable total limit
  tempDir: process.env.TEMP_DIR || '/tmp'
});

// Initialize progress manager
const progressManager = new ProgressManager(bot);

// Enhanced logging
function log(message, type = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${type}: ${message}`);
}

// Add message logging for debugging
bot.on('message', (msg) => {
  log(`Received message: ${msg.text} from ${msg.from.username || msg.from.first_name} in chat ${msg.chat.id}`);
});

// Add polling error handling
bot.on('polling_error', (error) => {
  log(`Polling error: ${error.message}`, 'ERROR');
});

// Add general error handling
bot.on('error', (error) => {
  log(`Bot error: ${error.message}`, 'ERROR');
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

// File cleanup utility
function cleanupFiles(files) {
  files.forEach(file => {
    try {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        log(`Cleaned up file: ${file}`);
      }
    } catch (error) {
      log(`Failed to cleanup ${file}: ${error.message}`, 'WARN');
    }
  });
}

// Enhanced video processing with personality
bot.onText(/\/submit (.+)/, async (msg, match) => {
  const chatId = process.env.CHAT_ID;
  const url = match[1];

  // Show typing indicator
  await progressManager.showTyping(chatId);

  // Validate URL first
  const isValid = await progressManager.validateAndRespond(chatId, url);
  if (!isValid) {
    return;
  }

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

  // Start progress instead of single message
  // Update progress: Metadata extraction
  await progressManager.updateProgress(progressId, 10, 'Extracting mystical metadata...');

  try {
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

    // Update progress: Processing decision
    await progressManager.updateProgress(progressId, 35, 'Determining processing method...');

    // Check if we need chunked processing for large videos
    const maxSingleSize = 45; // MB - under Telegram's 50MB limit

    if (fileSizeMB > maxSingleSize) {
      // Complete this progress and start chunked processing
      await progressManager.completeProgress(progressId, 'Large video detected! Switching to chunked processing...');

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
      bot.sendMessage(chatId, `⚠️ Video too long (${Math.round(duration / 60)}min). Max: ${Math.round(maxDuration / 60)}min`);
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

    // Enhanced tagging with confidence
    const contentText = `${title} ${description}`;
    const tagResult = await classifyWithConfidence(contentText, false); // Non-interactive for bot
    const tags = tagResult.tags;

    log(`Generated tags: ${tags.join(', ')}`);

    // Create enhanced caption with metadata
    const caption = `🎬 *${title}*
⏱️ Duration: ${Math.round(duration / 60)}:${String(duration % 60).padStart(2, '0')}
🏷️ ${tags.map(t => '#' + t).join(' ')}`;

    // Check file size before upload
    const stats = fs.statSync(filename);
    const actualSizeMB = stats.size / (1024 * 1024);
    const maxSizeMB = parseInt(process.env.MAX_FILE_SIZE_MB || '50');

    if (actualSizeMB > maxSizeMB) {
      await progressManager.errorProgress(progressId, `File too large (${actualSizeMB.toFixed(1)}MB). Max: ${maxSizeMB}MB`);
      cleanupFiles([filename, tempJson]);
      return;
    }

    // Update progress: Uploading
    await progressManager.updateProgress(progressId, 85, `Uploading "${title}" (${actualSizeMB.toFixed(1)}MB)...`);

    log(`Uploading video: ${filename} (${actualSizeMB.toFixed(1)}MB)`);

    const uploadMessages = [
      '📤 *Weaving the final spell*... uploading your mesmerizing content...',
      '🌟 *Ascending to the digital realm*... sharing your hypnotic creation...',
      '🎭 *The grand reveal approaches*... presenting your tagged masterpiece...',
      '✨ *Casting the completion charm*... your video emerges transformed...',
      '� *Igniting the upload sequence*... watch your content come alive...'
    await bot.sendVideo(chatId, fs.createReadStream(path.resolve(filename)), {
        caption,
        parse_mode: 'Markdown',
        supports_streaming: true
      });

    log(`Successfully processed: ${title}`);

    // Complete progress with success
    await progressManager.completeProgress(progressId, `"${title}" processed successfully!`);

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

// Categories management command with personality
bot.onText(/\/categories/, (msg) => {
  const chatId = msg.chat.id;
  const categories = getCategories();

  let message = '� *My hypnotic classification chambers:*\n\n';
  message += '✨ *Each category holds its own mystical power...*\n\n';

  categories.forEach((cat, index) => {
    const emoji = ['🌀', '🎯', '💫', '🔮', '⚡', '🌟', '💎', '🎪', '🔥', '🌊', '🎨'][index % 11];
    message += `${emoji} \`${cat}\` - *where ${cat} dreams reside*\n`;
  });
  message += `\n🎭 *Total mystical realms:* ${categories.length}`;

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Test classification command with personality
bot.onText(/\/classify (.+)/, async (msg, match) => {
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

    bot.sendMessage(chatId, analyzeMessages[Math.floor(Math.random() * analyzeMessages.length)], { parse_mode: 'Markdown' });

    const result = await classifyWithConfidence(text, false);
    const tags = result.tags;
    const confidence = result.confidence;

    let message = '� *The mystical analysis reveals:*\n\n';
    message += `� *Your submitted text:* "${text}"\n\n`;
    message += `🏷️ *Hypnotic tags discovered:* ${tags.map(t => '#' + t).join(' ')}\n\n`;
    message += '� *Confidence readings from the digital realm:*\n';

    Object.entries(confidence)
      .filter(([_, score]) => score > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .forEach(([tag, score]) => {
        const percentage = (score * 100).toFixed(1);
        const bars = Math.floor(score * 10);
        const barString = '█'.repeat(bars) + '░'.repeat(10 - bars);
        message += `✨ \`${tag.padEnd(12)}\` ${percentage.padStart(5)}% ${barString}\n`;
      });

    message += '\n🎯 *The trance is complete!*';

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

  } catch (error) {
    handleError(error, 'Text classification', chatId);
  }
});

// Export categories command (admin only)
bot.onText(/\/export/, (msg) => {
  const chatId = msg.chat.id;
  const adminChatId = process.env.ADMIN_CHAT_ID || process.env.CHAT_ID;

  if (chatId.toString() !== adminChatId) {
    bot.sendMessage(chatId, '❌ This command is only available to administrators.');
    return;
  }

  try {
    const categoriesData = exportCategories();
    const filename = `categories_backup_${Date.now()}.json`;
    fs.writeFileSync(filename, categoriesData);

    bot.sendDocument(chatId, fs.createReadStream(filename), {
      caption: '📋 Categories backup file'
    }).then(() => {
      fs.unlinkSync(filename); // Cleanup after sending
    });

  } catch (error) {
    handleError(error, 'Categories export', chatId);
  }
});

// Health check command with personality
bot.onText(/\/health/, (msg) => {
  const chatId = msg.chat.id;
  const uptime = Math.floor(process.uptime());
  const memory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  const categories = getCategories().length;

  const healthMessages = [
    '✨ *My mystical energies flow strong...*',
    '🌟 *The digital trance continues unbroken...*',
    '🎭 *My hypnotic powers remain at full strength...*',
    '💫 *The classification magic courses through my circuits...*',
    '🔮 *My enchantments are stable and ready...*'
  ];

  bot.sendMessage(chatId, `🎭 *HypnoTagger Status Report:*

${healthMessages[Math.floor(Math.random() * healthMessages.length)]}

⏰ *Time in trance:* ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m
🧠 *Memory enchantment:* ${memory}MB
� *Mystical categories:* ${categories} realms
✨ *Hypnotic state:* *FULLY ENTRANCED & OPERATIONAL*

*Ready to weave magic with your content...*`, { parse_mode: 'Markdown' });
});

// Start command with hypnotic personality
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || msg.from.username || 'mysterious one';

  const welcomeMessages = [
    `🌀 *Welcome, ${userName}...* You have entered my hypnotic realm...`,
    `✨ *Greetings, ${userName}...* Let the digital trance begin...`,
    `🎭 *Ah, ${userName} awakens...* I sense your desire for video enchantment...`,
    `💫 *${userName} approaches...* The mystical classification awaits...`,
    `🔮 *I have been expecting you, ${userName}...* Your content calls to me...*`
  ];

  bot.sendMessage(chatId, `${welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}

🎯 *I am HypnoTagger, your mystical video companion...*

*Submit a video URL and watch me weave perfect tags through hypnotic classification magic...*

✨ *Use* /help *to explore my enchanted commands*
🌟 *Use* /categories *to see my mystical realms*

*Trust in the trance... let the magic begin...*`, { parse_mode: 'Markdown' });
});

// Help command with personality
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🎭 *Welcome to my hypnotic realm!*

*I am HypnoTagger, your mystical video classification companion...*

🌀 **My Enchanted Commands:**

*✨ Video Magic:*
/submit \\<video\\_url\\> \\- Let me weave tags into your video

*🔮 Classification Spells:*
/classify \\<text\\> \\- I'll divine the essence of your words
/categories \\- Explore my mystical classification realms

*🎯 System Incantations:*
/health \\- Check my hypnotic energy levels
/help \\- Return to this magical guide

*🎪 Master's Tools:*
/export \\- Archive my classification knowledge

*Submit a video URL and watch me work my digital magic\\!*
*Each creation will be blessed with perfect categorization\\.\\.\\.*

🌟 *Trust in the trance\\.\\.\\. let HypnoTagger enchant your content\\!*`, { parse_mode: 'MarkdownV2' });
});

// Error handling for the bot
bot.on('error', (error) => {
  log(`Bot error: ${error.message}`, 'ERROR');
});

bot.on('polling_error', (error) => {
  log(`Polling error: ${error.message}`, 'ERROR');
});

log('🎭 HypnoTagger awakens from digital slumber...');
log('✨ Mystical classification powers: ACTIVATED');
log(`🌟 Hypnotic environment: ${process.env.NODE_ENV || 'development'}`);
log(`💫 Maximum enchantment size: ${process.env.MAX_FILE_SIZE_MB || '50'}MB`);
log(`⏰ Trance duration limit: ${Math.round((process.env.MAX_DURATION_SECONDS || '3600') / 60)}min`);
log(`🎯 Classification realms available: ${getCategories().length}`);
log('🔮 The digital trance begins... Ready to weave magic!');
