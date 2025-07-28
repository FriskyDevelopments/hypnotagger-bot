/**
 * 🌀 Mystical Progress Manager
 * Handles loading bars, validation responses, and dynamic message updates
 */

class ProgressManager {
    constructor(bot) {
        this.bot = bot;
        this.activeProgresses = new Map(); // Track active progress messages
    }

    /**
     * Create a mystical loading bar
     */
    createLoadingBar(progress, width = 20) {
        const filled = Math.floor((progress / 100) * width);
        const empty = width - filled;

        const filledChar = '🌀';
        const emptyChar = '⚫';
        const progressChar = '✨';

        let bar = filledChar.repeat(filled);
        if (filled < width) {
            bar += progressChar + emptyChar.repeat(empty - 1);
        }

        return bar;
    }

    /**
     * Start a progress sequence with mystical themes
     */
    async startProgress(chatId, title, stages) {
        const progressId = `${chatId}_${Date.now()}`;

        const initialMessage = `🔮 *${title}*

${this.createLoadingBar(0)}
*Initializing mystical energies...* 0%

✨ *Preparing to weave digital magic...*`;

        const message = await this.bot.sendMessage(chatId, initialMessage, {
            parse_mode: 'Markdown',
            disable_notification: true
        });

        this.activeProgresses.set(progressId, {
            messageId: message.message_id,
            chatId: chatId,
            title: title,
            stages: stages,
            currentStage: 0,
            startTime: Date.now()
        });

        return progressId;
    }

    /**
     * Update progress with mystical messages
     */
    async updateProgress(progressId, percentage, customMessage = null) {
        const progress = this.activeProgresses.get(progressId);
        if (!progress) return;

        const { messageId, chatId, title, stages, currentStage } = progress;

        // Calculate current stage based on percentage
        const stageIndex = Math.min(Math.floor((percentage / 100) * stages.length), stages.length - 1);
        const currentStageMsg = stages[stageIndex] || stages[currentStage];

        const loadingBar = this.createLoadingBar(percentage);
        const message = customMessage || currentStageMsg;

        // Add mystical flourishes based on progress
        let mysticalEffect = '';
        if (percentage < 25) mysticalEffect = '🌊 *Channeling cosmic forces...*';
        else if (percentage < 50) mysticalEffect = '⚡ *Weaving through digital realms...*';
        else if (percentage < 75) mysticalEffect = '🎭 *Manifesting your desires...*';
        else if (percentage < 95) mysticalEffect = '💫 *Approaching transcendence...*';
        else mysticalEffect = '✨ *The ritual nears completion...*';

        const updatedText = `🔮 *${title}*

${loadingBar}
*${message}* ${percentage}%

${mysticalEffect}`;

        try {
            await this.bot.editMessageText(updatedText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown'
            });

            progress.currentStage = stageIndex;
        } catch (error) {
            console.warn('Failed to update progress message:', error.message);
        }
    }

    /**
     * Complete progress with success message
     */
    async completeProgress(progressId, finalMessage = null) {
        const progress = this.activeProgresses.get(progressId);
        if (!progress) return;

        const { messageId, chatId, title, startTime } = progress;
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        const successMessages = [
            '✨ *Hypnotic transformation complete!*',
            '🎭 *The mystical ritual is finished!*',
            '💫 *Digital enchantment successful!*',
            '🌟 *The spell has been cast perfectly!*',
            '🔮 *Transcendence achieved!*'
        ];

        const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
        const message = finalMessage || randomSuccess;

        const completedText = `🔮 *${title}*

${'🌟'.repeat(20)}
*${message}* ✅

⏱️ *Completed in ${duration}s*`;

        try {
            await this.bot.editMessageText(completedText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown'
            });

            // Auto-delete after 5 seconds
            setTimeout(async () => {
                try {
                    await this.bot.deleteMessage(chatId, messageId);
                } catch (error) {
                    console.warn('Failed to auto-delete completed progress:', error.message);
                }
            }, 5000);

        } catch (error) {
            console.warn('Failed to complete progress message:', error.message);
        }

        this.activeProgresses.delete(progressId);
    }

    /**
     * Handle progress error
     */
    async errorProgress(progressId, errorMessage) {
        const progress = this.activeProgresses.get(progressId);
        if (!progress) return;

        const { messageId, chatId, title } = progress;

        const errorText = `🔮 *${title}*

${'🌀'.repeat(20)}
⚠️ *${errorMessage}*

*The mystical energies were disrupted...*`;

        try {
            await this.bot.editMessageText(errorText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown'
            });

            // Auto-delete after 3 seconds
            setTimeout(async () => {
                try {
                    await this.bot.deleteMessage(chatId, messageId);
                } catch (error) {
                    console.warn('Failed to auto-delete error progress:', error.message);
                }
            }, 3000);

        } catch (error) {
            console.warn('Failed to update error progress:', error.message);
        }

        this.activeProgresses.delete(progressId);
    }

    /**
     * Send temporary message that auto-deletes
     */
    async sendTemporaryMessage(chatId, message, deleteAfter = 3000, options = {}) {
        try {
            const sentMessage = await this.bot.sendMessage(chatId, message, {
                parse_mode: 'Markdown',
                disable_notification: true,
                ...options
            });

            // Auto-delete after specified time
            setTimeout(async () => {
                try {
                    await this.bot.deleteMessage(chatId, sentMessage.message_id);
                } catch (error) {
                    console.warn('Failed to auto-delete temporary message:', error.message);
                }
            }, deleteAfter);

            return sentMessage;
        } catch (error) {
            console.error('Failed to send temporary message:', error);
            return null;
        }
    }

    /**
     * Validate URL and show immediate feedback
     */
    async validateAndRespond(chatId, url) {
        console.log(`🔍 [VALIDATION] Testing URL: "${url}"`);
        console.log(`🔍 [VALIDATION] URL type: ${typeof url}, length: ${url.length}`);

        // Comprehensive validation patterns for supported platforms
        const urlPatterns = [
            // YouTube
            /youtube\.com\/watch\?v=/,
            /youtu\.be\//,
            /youtube\.com\/embed\//,
            /youtube\.com\/v\//,
            /youtube\.com\/playlist\?list=/,
            /youtube\.com\/shorts\//,
            /m\.youtube\.com\//,

            // Twitter/X
            /twitter\.com\/.*\/status\//,
            /x\.com\/.*\/status\//,
            /mobile\.twitter\.com\//,
            /t\.co\//,

            // TikTok
            /tiktok\.com\//,
            /vm\.tiktok\.com\//,
            /vt\.tiktok\.com\//,
            /m\.tiktok\.com\//,

            // Instagram
            /instagram\.com\/p\//,
            /instagram\.com\/reel\//,
            /instagram\.com\/tv\//,
            /instagram\.com\/stories\//,

            // Vimeo
            /vimeo\.com\//,
            /player\.vimeo\.com\//,

            // Reddit
            /reddit\.com\/r\/.*\/comments\//,
            /redd\.it\//,
            /v\.redd\.it\//,
            /i\.redd\.it\//,

            // Twitch
            /twitch\.tv\/videos\//,
            /twitch\.tv\/.*\/clip\//,
            /clips\.twitch\.tv\//,

            // Other platforms
            /dailymotion\.com\//,
            /streamable\.com\//,
            /gfycat\.com\//,
            /imgur\.com\//,
            /pornhub\.com\//,
            /xvideos\.com\//,
            /xhamster\.com\//,
            /redtube\.com\//,
            /tube8\.com\//,
            /spankbang\.com\//,
            /fansly\.com\//,
            /onlyfans\.com\//,

            // Hypno and specialized platforms
            /hypnotube\.com\//,
            /hypnocastle\.net\//,
            /hypnohub\.net\//,
            /hypnopics-collective\.net\//,
            /e621\.net\//,
            /rule34\.xxx\//,
            /thisvid\.com\//,
            /myvidster\.com\//,
            /xtube\.com\//,

            // General video file extensions
            /\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp|m3u8)(\?.*)?$/i,

            // Generic HTTPS video patterns (more permissive for edge cases)
            /^https?:\/\/.*\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp)/i,
            /^https?:\/\/.*\/.*\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp)/i
        ];

        const isValidUrl = urlPatterns.some(pattern => pattern.test(url));

        console.log(`🎯 [VALIDATION] Result: ${isValidUrl ? '✅ VALID' : '❌ INVALID'}`);
        if (isValidUrl) {
            console.log(`✅ [VALIDATION] URL accepted, proceeding with processing...`);
        } else {
            console.log(`❌ [VALIDATION] URL rejected, sending error message...`);
        }

        if (!isValidUrl) {
            await this.sendTemporaryMessage(
                chatId,
                '⚠️ *Invalid URL detected!* Please provide a supported video platform link.',
                4000
            );
            return false;
        }

        // Quick success validation
        const validationMessages = [
            '✅ *URL validated!* Preparing hypnotic processing...',
            '🎯 *Target acquired!* Initiating mystical download...',
            '🔍 *Link verified!* Channeling digital energies...',
            '✨ *Valid source detected!* Beginning enchantment...'
        ];

        await this.sendTemporaryMessage(
            chatId,
            validationMessages[Math.floor(Math.random() * validationMessages.length)],
            2000
        );

        return true;
    }

    /**
     * Show typing indicator
     */
    async showTyping(chatId) {
        try {
            await this.bot.sendChatAction(chatId, 'typing');
        } catch (error) {
            console.warn('Failed to send typing action:', error.message);
        }
    }

    /**
     * Cleanup all active progresses (for bot restart)
     */
    cleanup() {
        this.activeProgresses.clear();
    }
}

module.exports = { ProgressManager };
