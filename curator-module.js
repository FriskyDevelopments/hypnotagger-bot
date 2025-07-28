// 🔮 Fetish Hypno Hub Curator Module
// Enhanced curator workflow with stylized tags and multi-channel distribution

class CuratorModule {
    constructor(bot) {
        this.bot = bot;
        this.pendingQueue = [];
        this.curatorSessions = new Map();

        // Stylized tag mapping for underground aesthetic
        this.STYLED_TAGS = {
            // Core Hypno
            hypno: '#ʜʏᴘɴᴏ',
            trance: '#ᴛʀᴀɴᴄᴇ',
            induction: '#ɪɴᴅᴜᴄᴛɪᴏɴ',
            brainwash: '#ʙʀᴀɪɴᴡᴀꜱʜ',
            spiral: '#ꜱᴘɪʀᴀʟ',

            // Fetish Categories
            pup: '#ᴘᴜᴘ',
            bear: '#ʙᴇᴀʀ',
            leather: '#ʟᴇᴀᴛʜᴇʀ',
            rubber: '#ʀᴜʙʙᴇʀ',
            gear: '#ɢᴇᴀʀ',

            // Kink Elements
            piss: '#ᴘɪꜱꜱ',
            cum: '#ᴄᴜᴍᴄᴏɴᴛʀᴏʟ',
            bondage: '#ʙᴏɴᴅᴀɢᴇ',
            submission: '#ꜱᴜʙᴍɪꜱꜱɪᴏɴ',
            domination: '#ᴅᴏᴍɪɴᴀᴛɪᴏɴ',

            // Intensity Levels
            light: '#ʟɪɢʜᴛ',
            intense: '#ɪɴᴛᴇɴꜱᴇ',
            extreme: '#ᴇxᴛʀᴇᴍᴇ',
            hardcore: '#ʜᴀʀᴅᴄᴏʀᴇ',

            // Content Types
            audio: '#ᴀᴜᴅɪᴏ',
            visual: '#ᴠɪꜱᴜᴀʟ',
            interactive: '#ɪɴᴛᴇʀᴀᴄᴛɪᴠᴇ',
            pmv: '#ᴘᴍᴠ',

            // Special Categories
            transformation: '#ᴛʀᴀɴꜱғᴏʀᴍᴀᴛɪᴏɴ',
            mindcontrol: '#ᴍɪɴᴅᴄᴏɴᴛʀᴏʟ',
            trigger: '#ᴛʀɪɢɢᴇʀ',
            conditioning: '#ᴄᴏɴᴅɪᴛɪᴏɴɪɴɢ'
        };

        // Channel configuration for Fetish Hypno Hub
        this.CHANNELS = {
            vault: process.env.VAULT_CHANNEL_ID || '', // ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ 🔓
            elite: process.env.ELITE_CHANNEL_ID || '', // ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ 🔐
            lounge: process.env.LOUNGE_CHANNEL_ID || '', // ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ 💬
            curator: process.env.CURATOR_ROOM_ID || '' // ᴡᴇɪʀᴅʜʏᴘɴᴏʙᴀᴛɪɴɢᴠᴀᴜʟᴛ 🧠
        };

        // Curator permissions
        this.CURATORS = {
            admin: (process.env.ADMIN_CURATORS || '').split(','),
            senior: (process.env.SENIOR_CURATORS || '').split(','),
            junior: (process.env.JUNIOR_CURATORS || '').split(','),
            trainee: (process.env.TRAINEE_CURATORS || '').split(',')
        };

        this.log('🔮 CuratorModule initialized with Fetish Hypno Hub architecture', 'INFO');
        this.setupCommands();
    }

    log(message, type = 'INFO') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] CURATOR-${type}: ${message}`);
    }

    setupCommands() {
        // Curator workflow commands
        this.bot.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
            if (this.isCurator(msg.from.id)) {
                this.handleStartCommand(msg, match[1]);
            }
        });

        this.bot.onText(/\/tag\s+(.+)/, (msg, match) => {
            if (this.isCurator(msg.from.id)) {
                this.handleTagCommand(msg, match[1]);
            }
        });

        this.bot.onText(/\/sendpreview/, (msg) => {
            if (this.isCurator(msg.from.id)) {
                this.handleSendPreview(msg);
            }
        });

        this.bot.onText(/\/sendfull/, (msg) => {
            if (this.isCurator(msg.from.id)) {
                this.handleSendFull(msg);
            }
        });

        this.bot.onText(/\/reject/, (msg) => {
            if (this.isCurator(msg.from.id)) {
                this.handleReject(msg);
            }
        });

        this.bot.onText(/\/queue/, (msg) => {
            if (this.isCurator(msg.from.id)) {
                this.handleQueue(msg);
            }
        });

        this.bot.onText(/\/stats/, (msg) => {
            if (this.isCurator(msg.from.id)) {
                this.handleStats(msg);
            }
        });

        this.log('✅ Curator commands registered', 'INFO');
    }

    /**
     * Enhanced tagging system with fetish-specific categories
     */
    isCurator(userId) {
        const userIdStr = userId.toString();
        return [
            ...this.CURATORS.admin,
            ...this.CURATORS.senior,
            ...this.CURATORS.junior,
            ...this.CURATORS.trainee
        ].includes(userIdStr);
    }

    getCuratorLevel(userId) {
        const userIdStr = userId.toString();
        if (this.CURATORS.admin.includes(userIdStr)) return 'admin';
        if (this.CURATORS.senior.includes(userIdStr)) return 'senior';
        if (this.CURATORS.junior.includes(userIdStr)) return 'junior';
        if (this.CURATORS.trainee.includes(userIdStr)) return 'trainee';
        return null;
    }

    async handleStartCommand(msg, args) {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const level = this.getCuratorLevel(userId);

        let welcomeMsg = `🌀 **ʜʏᴘɴᴏᴛᴀɢɢᴇʀʙᴏᴛ** ᴄᴜʀᴀᴛᴏʀ ɪɴᴛᴇʀꜰᴀᴄᴇ\n\n`;
        welcomeMsg += `👤 **Curator:** @${msg.from.username || 'Unknown'}\n`;
        welcomeMsg += `🎭 **Level:** ${level.toUpperCase()}\n\n`;

        if (this.pendingQueue.length > 0) {
            const next = this.pendingQueue[0];
            welcomeMsg += `📋 **Queue Status:** ${this.pendingQueue.length} pending\n\n`;
            welcomeMsg += `🎬 **Next Preview:**\n`;
            welcomeMsg += `📁 ${next.filename}\n`;
            welcomeMsg += `⏱️ Duration: ${next.duration || 'Unknown'}\n`;
            welcomeMsg += `📦 Size: ${next.fileSize || 'Unknown'}\n\n`;

            const suggestedTags = this.suggestStyledTags(next.filename, next.title || '');
            welcomeMsg += `🏷️ **Suggested Tags:**\n${suggestedTags.join(' ')}\n\n`;

            welcomeMsg += `⚡ **Actions:**\n`;
            welcomeMsg += `• \`/tag ${suggestedTags.join(' ')}\` - Apply suggested tags\n`;
            welcomeMsg += `• \`/sendpreview\` - Send to @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ\n`;
            welcomeMsg += `• \`/sendfull\` - Send to @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ\n`;
            welcomeMsg += `• \`/reject\` - Archive this content\n\n`;
        } else {
            welcomeMsg += `✨ **Queue Empty** - No pending content\n\n`;
        }

        welcomeMsg += `📊 **Commands:**\n`;
        welcomeMsg += `• \`/queue\` - View full queue\n`;
        welcomeMsg += `• \`/stats\` - Curation statistics\n`;

        await this.bot.sendMessage(chatId, welcomeMsg, { parse_mode: 'Markdown' });
    }

    suggestStyledTags(filename, title = '') {
        const content = (filename + ' ' + title).toLowerCase();
        const tags = [];

        // Core detection patterns
        if (/hypno|trance|induction/i.test(content)) tags.push(this.STYLED_TAGS.hypno);
        if (/spiral|swirl/i.test(content)) tags.push(this.STYLED_TAGS.spiral);
        if (/piss|urine|watersports/i.test(content)) tags.push(this.STYLED_TAGS.piss);
        if (/bear|hairy|daddy/i.test(content)) tags.push(this.STYLED_TAGS.bear);
        if (/pup|mask|hood|dog/i.test(content)) tags.push(this.STYLED_TAGS.pup);
        if (/cum|orgasm|edge/i.test(content)) tags.push(this.STYLED_TAGS.cum);
        if (/leather|gear/i.test(content)) tags.push(this.STYLED_TAGS.leather);
        if (/rubber|latex/i.test(content)) tags.push(this.STYLED_TAGS.rubber);
        if (/bondage|tied|bound/i.test(content)) tags.push(this.STYLED_TAGS.bondage);
        if (/transform|change|become/i.test(content)) tags.push(this.STYLED_TAGS.transformation);
        if (/pmv|porn music video/i.test(content)) tags.push(this.STYLED_TAGS.pmv);
        if (/trigger|activated|programmed/i.test(content)) tags.push(this.STYLED_TAGS.trigger);

        // Intensity detection
        if (/extreme|intense|hardcore/i.test(content)) tags.push(this.STYLED_TAGS.extreme);
        if (/gentle|soft|light/i.test(content)) tags.push(this.STYLED_TAGS.light);

        // Content type detection
        if (/\.mp3|\.wav|\.m4a|audio/i.test(content)) tags.push(this.STYLED_TAGS.audio);
        if (/visual|video|watch/i.test(content)) tags.push(this.STYLED_TAGS.visual);

        return tags.length ? tags : ['#ᴜɴᴄᴀᴛᴇɢᴏʀɪᴢᴇᴅ'];
    }

    async handleTagCommand(msg, tagString) {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        if (this.pendingQueue.length === 0) {
            return this.bot.sendMessage(chatId, '❌ No content in queue to tag');
        }

        const current = this.pendingQueue[0];
        const tags = tagString.split(/\s+/).filter(tag => tag.startsWith('#'));

        current.tags = tags;
        current.taggedBy = userId;
        current.taggedAt = new Date();

        const confirmMsg = `🏷️ **Content Tagged**\n\n`;
        const msgText = `📁 ${current.filename}\n`;
        const msgTags = `🎯 **Tags Applied:** ${tags.join(' ')}\n\n`;
        const msgActions = `✅ Ready for distribution:\n`;
        const msgPreview = `• \`/sendpreview\` → @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ\n`;
        const msgFull = `• \`/sendfull\` → @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ\n`;
        const msgReject = `• \`/reject\` → Archive`;

        await this.bot.sendMessage(chatId, confirmMsg + msgText + msgTags + msgActions + msgPreview + msgFull + msgReject, { parse_mode: 'Markdown' });
    }

    async handleSendPreview(msg) {
        const chatId = msg.chat.id;

        if (this.pendingQueue.length === 0) {
            return this.bot.sendMessage(chatId, '❌ No content in queue');
        }

        const current = this.pendingQueue[0];
        if (!current.tags) {
            return this.bot.sendMessage(chatId, '⚠️ Content must be tagged first. Use `/tag #tags`');
        }

        // Generate teaser caption
        const teaserCaption = this.generateTeaserCaption(current);

        try {
            // Send to vault channel (public teasers)
            if (this.CHANNELS.vault) {
                await this.bot.sendVideo(this.CHANNELS.vault, current.filePath, {
                    caption: teaserCaption,
                    parse_mode: 'Markdown'
                });
            }

            // Send notification to lounge
            if (this.CHANNELS.lounge) {
                const loungeMsg = `🚨 **ɴᴇᴡ ᴛᴇᴀꜱᴇʀ ᴅʀᴏᴘ**\n\n`;
                const loungeMsg2 = `🔥 Fresh preview in @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ\n`;
                const loungeMsg3 = `🎯 Tags: ${current.tags.join(' ')}\n`;
                const loungeMsg4 = `🔓 Join @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ for full access`;

                await this.bot.sendMessage(this.CHANNELS.lounge, loungeMsg + loungeMsg2 + loungeMsg3 + loungeMsg4, { parse_mode: 'Markdown' });
            }

            await this.bot.sendMessage(chatId, `✅ Preview sent to @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴠᴀᴜʟᴛ\n🎯 Use \`/sendfull\` for VIP release`, { parse_mode: 'Markdown' });

            current.previewSent = true;
            current.previewSentAt = new Date();

        } catch (error) {
            this.log(`Error sending preview: ${error.message}`, 'ERROR');
            await this.bot.sendMessage(chatId, `❌ Failed to send preview: ${error.message}`);
        }
    }

    async handleSendFull(msg) {
        const chatId = msg.chat.id;

        if (this.pendingQueue.length === 0) {
            return this.bot.sendMessage(chatId, '❌ No content in queue');
        }

        const current = this.pendingQueue[0];
        if (!current.tags) {
            return this.bot.sendMessage(chatId, '⚠️ Content must be tagged first. Use `/tag #tags`');
        }

        // Generate VIP caption
        const vipCaption = this.generateVipCaption(current, msg.from.username);

        try {
            // Send to elite channel (VIP full access)
            if (this.CHANNELS.elite) {
                await this.bot.sendVideo(this.CHANNELS.elite, current.filePath, {
                    caption: vipCaption,
                    parse_mode: 'Markdown'
                });
            }

            // Send notification to lounge
            if (this.CHANNELS.lounge && !current.previewSent) {
                const loungeMsg = `🚨 **ɴᴇᴡ ᴠɪᴘ ᴅʀᴏᴘ**\n\n`;
                const loungeMsg2 = `🔐 Exclusive content in @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ\n`;
                const loungeMsg3 = `🎯 Tags: ${current.tags.join(' ')}\n`;
                const loungeMsg4 = `✨ Curated by @${msg.from.username || 'Unknown'}`;

                await this.bot.sendMessage(this.CHANNELS.lounge, loungeMsg + loungeMsg2 + loungeMsg3 + loungeMsg4, { parse_mode: 'Markdown' });
            }

            await this.bot.sendMessage(chatId, `✅ Full content sent to @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ\n🎭 Content processed successfully!`, { parse_mode: 'Markdown' });

            // Remove from queue - content fully processed
            this.pendingQueue.shift();
            this.log(`Content processed: ${current.filename}`, 'INFO');

        } catch (error) {
            this.log(`Error sending full content: ${error.message}`, 'ERROR');
            await this.bot.sendMessage(chatId, `❌ Failed to send full content: ${error.message}`);
        }
    }

    async handleReject(msg) {
        const chatId = msg.chat.id;

        if (this.pendingQueue.length === 0) {
            return this.bot.sendMessage(chatId, '❌ No content in queue');
        }

        const current = this.pendingQueue.shift();

        await this.bot.sendMessage(chatId, `🗑️ **Content Archived**\n\n📁 ${current.filename}\n✅ Removed from queue`, { parse_mode: 'Markdown' });
        this.log(`Content rejected: ${current.filename}`, 'INFO');
    }

    async handleQueue(msg) {
        const chatId = msg.chat.id;

        if (this.pendingQueue.length === 0) {
            return this.bot.sendMessage(chatId, '✨ **Queue Empty**\n\nNo pending content to review');
        }

        let queueMsg = `📋 **Curation Queue** (${this.pendingQueue.length} items)\n\n`;

        this.pendingQueue.slice(0, 5).forEach((item, index) => {
            queueMsg += `**${index + 1}.** ${item.filename}\n`;
            queueMsg += `   📦 ${item.fileSize || 'Unknown size'}\n`;
            queueMsg += `   🏷️ ${item.tags ? item.tags.join(' ') : 'Not tagged'}\n\n`;
        });

        if (this.pendingQueue.length > 5) {
            queueMsg += `... and ${this.pendingQueue.length - 5} more items`;
        }

        await this.bot.sendMessage(chatId, queueMsg, { parse_mode: 'Markdown' });
    }

    async handleStats(msg) {
        const chatId = msg.chat.id;

        // TODO: Implement statistics tracking
        const statsMsg = `📊 **Curation Statistics**\n\n`;
        const statsMsg2 = `📋 Pending: ${this.pendingQueue.length}\n`;
        const statsMsg3 = `✅ Processed Today: 0\n`;
        const statsMsg4 = `🎭 Your Level: ${this.getCuratorLevel(msg.from.id).toUpperCase()}\n\n`;
        const statsMsg5 = `🏆 Coming soon: detailed analytics!`;

        await this.bot.sendMessage(chatId, statsMsg + statsMsg2 + statsMsg3 + statsMsg4 + statsMsg5, { parse_mode: 'Markdown' });
    }

    generateTeaserCaption(content) {
        const filename = content.filename || 'unknown_file.mp4';
        const tags = content.tags || [];

        let caption = `🎥 **Scene:** ${filename.replace(/\.[^/.]+$/, '')}\n`;
        caption += `🌀 Dark hypnotic preview - full experience awaits...\n`;
        caption += `💫 **Tags:** ${tags.join(' ')}\n\n`;
        caption += `🔓 **Full clip in @ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ**\n`;
        caption += `🤖 Use /joinvip to unlock access`;

        return caption;
    }

    generateVipCaption(content, curatorUsername) {
        const filename = content.filename || 'unknown_file.mp4';
        const tags = content.tags || [];

        let caption = `🔐 **ᴇxᴄʟᴜꜱɪᴠᴇ ᴀᴄᴄᴇꜱꜱ**\n\n`;
        caption += `🎬 **${filename.replace(/\.[^/.]+$/, '')}**\n`;
        caption += `🌀 Complete hypnotic experience - uncensored full scene\n`;
        caption += `💫 Premium content for ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ members\n\n`;
        caption += `🏷️ **Tags:** ${tags.join(' ')}\n\n`;
        caption += `✨ Curated by @${curatorUsername || 'Unknown'}\n`;
        caption += `💬 Discuss in @ʜʏᴘɴᴏғᴇᴛɪꜱʜʟᴏᴜɴɢᴇ`;

        return caption;
    }

    // Add content to curation queue
    addToQueue(contentData) {
        this.pendingQueue.push({
            ...contentData,
            addedAt: new Date(),
            id: Date.now() + Math.random()
        });

        this.log(`Added to queue: ${contentData.filename}`, 'INFO');

        // Notify curators if configured
        if (this.CHANNELS.curator) {
            const notifyMsg = `🆕 **New Content Added**\n\n📁 ${contentData.filename}\n📦 ${contentData.fileSize || 'Unknown size'}\n\n🎭 Ready for curation review`;
            this.bot.sendMessage(this.CHANNELS.curator, notifyMsg, { parse_mode: 'Markdown' });
        }
    }

    // Convert regular tags to styled tags
    convertToStyledTags(regularTags) {
        return regularTags.map(tag => {
            const cleanTag = tag.replace('#', '').toLowerCase();
            return this.STYLED_TAGS[cleanTag] || `#${cleanTag}`;
        });
    }

    /**
     * Store content for curator review
     */
    async queueForReview(contentData) {
        const reviewId = Date.now().toString();
        this.pendingContent.set(reviewId, {
            ...contentData,
            queuedAt: new Date(),
            status: 'pending'
        });
        return reviewId;
    }

    /**
     * Show pending content preview to curators
     */
    async showPendingContent(chatId, isAuthorizedCurator = false) {
        if (!isAuthorizedCurator) {
            await this.bot.sendMessage(chatId,
                '🚫 *Access Denied*\n\n' +
                'Only authorized curators can view pending content.\n' +
                'Contact an admin for curator access.',
                { parse_mode: 'Markdown' }
            );
            return;
        }

        if (this.pendingContent.size === 0) {
            await this.bot.sendMessage(chatId,
                '✨ *No Pending Content*\n\n' +
                'The review queue is empty. All content has been processed!',
                { parse_mode: 'Markdown' }
            );
            return;
        }

        let message = '🎭 *Pending Content Review Queue*\n\n';

        for (const [reviewId, content] of this.pendingContent.entries()) {
            const duration = content.duration ? `${Math.round(content.duration / 60)}:${String(content.duration % 60).padStart(2, '0')}` : 'Unknown';
            const size = content.filesize ? `${(content.filesize / (1024 * 1024)).toFixed(1)}MB` : 'Unknown';

            message += `🔍 **Review ID:** \`${reviewId}\`\n`;
            message += `📁 **File:** ${content.filename || 'Unknown'}\n`;
            message += `⏱️ **Duration:** ${duration}\n`;
            message += `📦 **Size:** ${size}\n`;
            message += `🏷️ **Suggested:** ${this.suggestTags(content.title || '', content.filename || '', content.description || '').map(t => '#' + t).join(' ')}\n`;
            message += `➖➖➖➖➖➖➖➖➖➖\n\n`;
        }

        message += '🎯 **Curator Commands:**\n';
        message += '`/tag [reviewId] [#tag1 #tag2]` - Apply tags\n';
        message += '`/sendteaser [reviewId]` - Push to teaser channel\n';
        message += '`/sendvip [reviewId]` - Push to VIP channel\n';
        message += '`/reject [reviewId]` - Archive content\n';

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }

    /**
     * Apply tags to content
     */
    async applyTags(chatId, reviewId, tags, curatorUsername) {
        const content = this.pendingContent.get(reviewId);
        if (!content) {
            await this.bot.sendMessage(chatId,
                `❌ *Review ID not found:* \`${reviewId}\`\n\nUse /start to see pending content.`,
                { parse_mode: 'Markdown' }
            );
            return;
        }

        content.curatorTags = tags;
        content.reviewedBy = curatorUsername;
        content.reviewedAt = new Date();
        content.status = 'tagged';

        const message = `✅ *Tags Applied Successfully*\n\n` +
            `📁 **Content:** ${content.title || content.filename}\n` +
            `🏷️ **Tags:** ${tags.map(t => '#' + t).join(' ')}\n` +
            `👤 **Curator:** @${curatorUsername}\n\n` +
            `🎯 **Next Steps:**\n` +
            `\`/sendteaser ${reviewId}\` - Public teaser\n` +
            `\`/sendvip ${reviewId}\` - VIP full access\n` +
            `\`/reject ${reviewId}\` - Archive`;

        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }

    /**
     * Send content to teaser channel
     */
    async sendToTeaser(chatId, reviewId, curatorUsername) {
        const content = this.pendingContent.get(reviewId);
        if (!content) {
            await this.bot.sendMessage(chatId, `❌ Review ID not found: \`${reviewId}\``, { parse_mode: 'Markdown' });
            return;
        }

        if (!this.channels.teaserChannel) {
            await this.bot.sendMessage(chatId, '❌ Teaser channel not configured. Set TEASER_CHANNEL_ID in .env');
            return;
        }

        try {
            // Create teaser message with watermark
            const teaserMessage = `🌀 *${content.title || 'Mystical Content'}*\n\n` +
                `⏱️ ${content.duration ? `${Math.round(content.duration / 60)}:${String(content.duration % 60).padStart(2, '0')}` : 'Unknown duration'}\n` +
                `🏷️ ${(content.curatorTags || []).map(t => '#' + t).join(' ')}\n\n` +
                `🔓 *Want the full experience?*\n` +
                `💎 Join VIP: /joinvip\n\n` +
                `_Curated by @${curatorUsername}_`;

            // Send to teaser channel (preview/snippet)
            if (content.filePath) {
                await this.bot.sendVideo(this.channels.teaserChannel, content.filePath, {
                    caption: teaserMessage,
                    parse_mode: 'Markdown'
                });
            } else {
                await this.bot.sendMessage(this.channels.teaserChannel, teaserMessage, { parse_mode: 'Markdown' });
            }

            // Update content status
            content.status = 'published_teaser';
            content.publishedAt = new Date();

            // Notify curator
            await this.bot.sendMessage(chatId,
                `📤 *Sent to Teaser Channel*\n\n` +
                `✅ Content published to @HypnoFetishVault\n` +
                `📁 ${content.title || content.filename}\n` +
                `👤 Curator: @${curatorUsername}`,
                { parse_mode: 'Markdown' }
            );

            // Remove from pending queue
            this.pendingContent.delete(reviewId);

        } catch (error) {
            await this.bot.sendMessage(chatId,
                `❌ *Failed to send to teaser channel*\n\nError: ${error.message}`,
                { parse_mode: 'Markdown' }
            );
        }
    }

    /**
     * Send content to VIP channel
     */
    async sendToVIP(chatId, reviewId, curatorUsername) {
        const content = this.pendingContent.get(reviewId);
        if (!content) {
            await this.bot.sendMessage(chatId, `❌ Review ID not found: \`${reviewId}\``, { parse_mode: 'Markdown' });
            return;
        }

        if (!this.channels.vipChannel) {
            await this.bot.sendMessage(chatId, '❌ VIP channel not configured. Set VIP_CHANNEL_ID in .env');
            return;
        }

        try {
            // Create VIP message (full content, no watermark)
            const vipMessage = `💎 *${content.title || 'VIP Exclusive Content'}*\n\n` +
                `⏱️ ${content.duration ? `${Math.round(content.duration / 60)}:${String(content.duration % 60).padStart(2, '0')}` : 'Unknown duration'}\n` +
                `📦 ${content.filesize ? `${(content.filesize / (1024 * 1024)).toFixed(1)}MB` : 'Unknown size'}\n` +
                `🏷️ ${(content.curatorTags || []).map(t => '#' + t).join(' ')}\n\n` +
                `✨ *VIP Exclusive - Full Experience*\n` +
                `🎭 Professionally curated content\n\n` +
                `_Curated by @${curatorUsername}_`;

            // Send to VIP channel (full content)
            if (content.filePath) {
                await this.bot.sendVideo(this.channels.vipChannel, content.filePath, {
                    caption: vipMessage,
                    parse_mode: 'Markdown'
                });
            } else {
                await this.bot.sendMessage(this.channels.vipChannel, vipMessage, { parse_mode: 'Markdown' });
            }

            // Update content status
            content.status = 'published_vip';
            content.publishedAt = new Date();

            // Notify curator
            await this.bot.sendMessage(chatId,
                `💎 *Sent to VIP Channel*\n\n` +
                `✅ Content published to @HypnoFetishElite\n` +
                `📁 ${content.title || content.filename}\n` +
                `👤 Curator: @${curatorUsername}`,
                { parse_mode: 'Markdown' }
            );

            // Notify lounge group if configured
            if (this.channels.loungeGroup) {
                await this.bot.sendMessage(this.channels.loungeGroup,
                    `🎉 *New VIP Content Available!*\n\n` +
                    `💎 ${content.title || 'New exclusive content'}\n` +
                    `🏷️ ${(content.curatorTags || []).map(t => '#' + t).join(' ')}\n` +
                    `👤 Curated by @${curatorUsername}`,
                    { parse_mode: 'Markdown' }
                );
            }

            // Remove from pending queue
            this.pendingContent.delete(reviewId);

        } catch (error) {
            await this.bot.sendMessage(chatId,
                `❌ *Failed to send to VIP channel*\n\nError: ${error.message}`,
                { parse_mode: 'Markdown' }
            );
        }
    }

    /**
     * Reject/archive content
     */
    async rejectContent(chatId, reviewId, curatorUsername, reason = '') {
        const content = this.pendingContent.get(reviewId);
        if (!content) {
            await this.bot.sendMessage(chatId, `❌ Review ID not found: \`${reviewId}\``, { parse_mode: 'Markdown' });
            return;
        }

        // Archive the content (could implement actual archiving later)
        content.status = 'rejected';
        content.rejectedBy = curatorUsername;
        content.rejectedAt = new Date();
        content.rejectionReason = reason;

        await this.bot.sendMessage(chatId,
            `🗃️ *Content Archived*\n\n` +
            `📁 ${content.title || content.filename}\n` +
            `👤 Curator: @${curatorUsername}\n` +
            `📝 Reason: ${reason || 'Not specified'}`,
            { parse_mode: 'Markdown' }
        );

        // Remove from pending queue
        this.pendingContent.delete(reviewId);
    }

    /**
     * Check if user is authorized curator
     */
    isAuthorizedCurator(username) {
        const authorizedCurators = (process.env.AUTHORIZED_CURATORS || '').split(',').map(u => u.trim());
        return authorizedCurators.includes(username);
    }
}

module.exports = { CuratorModule };
