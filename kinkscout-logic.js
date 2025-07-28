/**
 * 🕵️ KinkScout Logic Module
 * Enhances HypnoTagger with KinkScout character functionality
 */

class KinkScoutLogic {
    constructor() {
        // KinkScout guidance database
        this.guidanceDatabase = {
            'pup': {
                message: '🐕 *Pup Training Guidance*\n\nA true pup finds strength in submission and joy in service. Start with basic positions, learn your pack dynamics, and always prioritize safety and consent.',
                tags: '#ᴘᴜᴘ #ᴛʀᴀɪɴɪɴɢ #ᴘᴀᴄᴋ #ɢᴜɪᴅᴀɴᴄᴇ'
            },
            'bear': {
                message: '🧸 *Bear Daddy Wisdom*\n\nBeing a bear daddy means providing strength, comfort, and guidance. Lead with confidence, nurture with care, and always honor the trust placed in you.',
                tags: '#ʙᴇᴀʀ #ᴅᴀᴅᴅʏ #ʟᴇᴀᴅᴇʀꜱʜɪᴘ #ᴄᴀʀᴇ'
            },
            'hypno': {
                message: '🌀 *Hypnotic Arts*\n\nTrue hypnosis is about trust and mutual exploration. Build rapport first, establish clear boundaries, and guide your subject with respect and skill.',
                tags: '#ʜʏᴘɴᴏ #ᴛʀᴀɴᴄᴇ #ᴍɪɴᴅ #ᴄᴏɴᴛʀᴏʟ'
            },
            'watersports': {
                message: '💧 *Aquatic Exploration*\n\nWatersports require trust, preparation, and clear communication. Start slowly, prioritize hygiene and health, and always respect boundaries.',
                tags: '#ᴘɪꜱꜱ #ᴡᴀᴛᴇʀꜱᴘᴏʀᴛꜱ #ᴛʀᴜꜱᴛ #ʜʏᴅʀᴀᴛɪᴏɴ'
            },
            'bondage': {
                message: '⛓️ *Bondage Safety*\n\nBondage is an art of trust and technique. Learn proper rope work, always have safety shears nearby, and establish clear communication signals.',
                tags: '#ʙᴏɴᴅᴀɢᴇ #ʀᴏᴘᴇ #ꜱᴀꜰᴇᴛʏ #ᴛʀᴜꜱᴛ'
            },
            'leather': {
                message: '🧥 *Leather Culture*\n\nLeather represents tradition, respect, and community. Care for your gear, honor the history, and welcome newcomers with patience and wisdom.',
                tags: '#ʟᴇᴀᴛʜᴇʀ #ᴛʀᴀᴅɪᴛɪᴏɴ #ᴄᴏᴍᴍᴜɴɪᴛʏ #ʀᴇꜱᴘᴇᴄᴛ'
            },
            'confidence': {
                message: '⚡ *Building Confidence*\n\nTrue confidence comes from self-knowledge and practice. Start with small steps, celebrate your progress, and remember that everyone was once a beginner.',
                tags: '#ᴄᴏɴꜰɪᴅᴇɴᴄᴇ #ɢʀᴏᴡᴛʜ #ꜱᴇʟꜰ #ᴅᴇᴠᴇʟᴏᴘᴍᴇɴᴛ'
            },
            'safety': {
                message: '🛡️ *Safety First*\n\nAll exploration should be Safe, Sane, and Consensual. Establish boundaries, use safe words, and never compromise on safety for intensity.',
                tags: '#ꜱᴀꜰᴇᴛʏ #ᴄᴏɴꜱᴇɴᴛ #ʙᴏᴜɴᴅᴀʀɪᴇꜱ #ꜱꜱᴄ'
            },
            'community': {
                message: '👥 *Community Building*\n\nStrong communities are built on respect, inclusion, and mutual support. Welcome newcomers, share knowledge freely, and help others grow.',
                tags: '#ᴄᴏᴍᴍᴜɴɪᴛʏ #ɪɴᴄʟᴜꜱɪᴏɴ #ꜱᴜᴘᴘᴏʀᴛ #ɢʀᴏᴡᴛʜ'
            }
        };

        // KinkScout story templates
        this.storyTemplates = {
            'origin': 'Born from the shadows of the underground realm, this KinkScout gained their mystical powers through years of dedicated exploration and service to the community.',
            'mission': 'Dedicated to guiding willing explorers through transformative journeys, helping them discover hidden aspects of themselves in safe, consensual experiences.',
            'powers': 'Possesses hypnotic guidance abilities, underground navigation skills, confidence projection, and mystical influence over both physical and psychological realms.',
            'relationships': 'Maintains connections across all fetish communities - from pup packs to bear families, from hypno circles to leather traditions.',
            'wisdom': 'Carries ancient underground knowledge passed down through generations of guides, mentors, and community leaders.'
        };

        // Enhanced tag patterns for KinkScout content
        this.kinkscoutTags = {
            base: ['#ᴋɪɴᴋꜱᴄᴏᴜᴛ', '#ɢᴜɪᴅᴇ', '#ᴜɴᴅᴇʀɢʀᴏᴜɴᴅ'],
            roles: ['#ʟᴇᴀᴅᴇʀ', '#ᴍᴇɴᴛᴏʀ', '#ᴇxᴘʟᴏʀᴇʀ', '#ɢᴜᴀʀᴅɪᴀɴ'],
            powers: ['#ᴍʏꜱᴛɪᴄᴀʟ', '#ʜʏᴘɴᴏᴛɪᴄ', '#ᴄᴏɴꜰɪᴅᴇɴᴛ', '#ᴡɪꜱᴇ'],
            aesthetic: ['#ʟᴇᴀᴛʜᴇʀ', '#ʜᴏᴏᴅᴇᴅ', '#ᴛᴀᴄᴛɪᴄᴀʟ', '#ᴍʏꜱᴛᴇʀɪᴏᴜꜱ']
        };
    }

    /**
     * Get guidance for a specific topic
     */
    getGuidance(topic) {
        const lowerTopic = topic.toLowerCase();

        // Check for exact matches first
        if (this.guidanceDatabase[lowerTopic]) {
            return this.guidanceDatabase[lowerTopic];
        }

        // Check for partial matches
        for (const [key, guidance] of Object.entries(this.guidanceDatabase)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                return guidance;
            }
        }

        // Default guidance for unknown topics
        return {
            message: `🕵️ *General KinkScout Guidance*\n\nThe path of exploration requires courage, respect, and wisdom. Approach "${topic}" with an open mind, clear communication, and always prioritize safety and consent.`,
            tags: '#ᴋɪɴᴋꜱᴄᴏᴜᴛ #ɢᴇɴᴇʀᴀʟ #ɢᴜɪᴅᴀɴᴄᴇ #ᴡɪꜱᴅᴏᴍ'
        };
    }

    /**
     * Generate KinkScout backstory
     */
    generateStory(theme) {
        const stories = this.storyTemplates;

        if (stories[theme]) {
            return stories[theme];
        }

        // Generate custom story based on theme
        return `This KinkScout's journey with "${theme}" began in the deeper chambers of the underground realm, where they learned the sacred arts of guidance and transformation through dedicated study and practice.`;
    }

    /**
     * Enhance content with KinkScout theming
     */
    enhanceContent(content, enhancement = 'basic') {
        const enhancements = {
            basic: {
                prefix: '🕵️ *KinkScout Presents:*\n\n',
                suffix: '\n\n_Guided by the underground scout network_'
            },
            mystical: {
                prefix: '🔮 *From the Mystical Underground:*\n\n',
                suffix: '\n\n✨ _Channel the power of the ancient guides_ ✨'
            },
            leadership: {
                prefix: '⚡ *KinkScout Leadership Content:*\n\n',
                suffix: '\n\n🎯 _Leading by example through the darkness_'
            },
            wisdom: {
                prefix: '🌙 *Ancient KinkScout Wisdom:*\n\n',
                suffix: '\n\n🕵️ _Knowledge passed down through generations of guides_'
            }
        };

        const selected = enhancements[enhancement] || enhancements.basic;
        return selected.prefix + content + selected.suffix;
    }

    /**
     * Generate KinkScout-themed tags for content
     */
    generateKinkScoutTags(content, scenario = 'general') {
        const tags = [...this.kinkscoutTags.base];
        const lowerContent = content.toLowerCase();

        // Add role-based tags
        if (lowerContent.includes('lead') || lowerContent.includes('command') || lowerContent.includes('guide')) {
            tags.push('#ʟᴇᴀᴅᴇʀ');
        }
        if (lowerContent.includes('teach') || lowerContent.includes('mentor') || lowerContent.includes('wisdom')) {
            tags.push('#ᴍᴇɴᴛᴏʀ');
        }
        if (lowerContent.includes('explore') || lowerContent.includes('discover') || lowerContent.includes('journey')) {
            tags.push('#ᴇxᴘʟᴏʀᴇʀ');
        }

        // Add power-based tags
        if (lowerContent.includes('hypno') || lowerContent.includes('trance') || lowerContent.includes('spiral')) {
            tags.push('#ʜʏᴘɴᴏᴛɪᴄ');
        }
        if (lowerContent.includes('confident') || lowerContent.includes('powerful') || lowerContent.includes('strong')) {
            tags.push('#ᴄᴏɴꜰɪᴅᴇɴᴛ');
        }
        if (lowerContent.includes('mystical') || lowerContent.includes('magic') || lowerContent.includes('supernatural')) {
            tags.push('#ᴍʏꜱᴛɪᴄᴀʟ');
        }

        // Add aesthetic tags
        if (lowerContent.includes('leather') || lowerContent.includes('gear') || lowerContent.includes('harness')) {
            tags.push('#ʟᴇᴀᴛʜᴇʀ');
        }
        if (lowerContent.includes('hood') || lowerContent.includes('mask') || lowerContent.includes('covered')) {
            tags.push('#ʜᴏᴏᴅᴇᴅ');
        }
        if (lowerContent.includes('mysterious') || lowerContent.includes('shadow') || lowerContent.includes('hidden')) {
            tags.push('#ᴍʏꜱᴛᴇʀɪᴏᴜꜱ');
        }

        return tags;
    }

    /**
     * Create KinkScout-themed caption for curator use
     */
    createKinkScoutCaption(originalCaption, theme = 'general') {
        const themeTemplates = {
            exploration: '🕵️ *Underground Exploration Guide*\n\n',
            training: '🎯 *KinkScout Training Session*\n\n',
            wisdom: '🌙 *Ancient Scout Wisdom*\n\n',
            leadership: '⚡ *Scout Leader Demonstration*\n\n',
            mystical: '🔮 *Mystical Underground Arts*\n\n'
        };

        const prefix = themeTemplates[theme] || themeTemplates.general || '🕵️ *KinkScout Content*\n\n';
        const suffix = '\n\n✨ _Curated by the underground scout network_\n🎭 _For the ʜʏᴘɴᴏғᴇᴛɪꜱʜᴇʟɪᴛᴇ community_';

        return prefix + originalCaption + suffix;
    }

    /**
     * Get random KinkScout wisdom quote
     */
    getRandomWisdom() {
        const wisdomQuotes = [
            '🔮 "In the darkness, we find our true light. Trust the journey, explorer."',
            '⚡ "Confidence comes not from knowing everything, but from accepting what you discover."',
            '🌀 "The underground reveals what the surface conceals. Embrace your hidden self."',
            '🕵️ "A true guide leads by example, not by force. Show the way with authenticity."',
            '🎭 "Every mask you wear reveals another truth. Choose wisely, but choose boldly."',
            '🔥 "Power shared is power multiplied. Guide others to find their own strength."',
            '✨ "In submission, find your power. In dominance, find your responsibility."',
            '🌙 "The mystical and physical realms are one. Honor both in your exploration."',
            '⚡ "Leadership is earned through service, not claimed through force."',
            '🕵️ "The best guides are those who remember being lost themselves."'
        ];

        return wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
    }

    /**
     * Check if content is KinkScout-related
     */
    isKinkScoutContent(content) {
        const kinkscoutKeywords = [
            'kinkscout', 'scout', 'guide', 'underground', 'leader', 'mentor',
            'exploration', 'guidance', 'wisdom', 'mystical', 'hooded'
        ];

        const lowerContent = content.toLowerCase();
        return kinkscoutKeywords.some(keyword => lowerContent.includes(keyword));
    }

    /**
     * Generate KinkScout location description
     */
    getLocationDescription(location) {
        const locations = {
            'hypno chambers': '🌀 Ancient chambers where the mystical arts of trance and mind exploration are practiced under the guidance of experienced scouts.',
            'pup territory': '🐕 Training grounds where pups learn pack dynamics, obedience, and the joy of service under alpha guidance.',
            'bear domain': '🧸 Comfortable caves where bear daddies provide mentorship, protection, and nurturing guidance to their cubs.',
            'transformation caverns': '✨ Sacred spaces where explorers undergo identity transformation and self-discovery journeys.',
            'leather halls': '🧥 Traditional chambers honoring the legacy of leather culture and community values.',
            'steam grottos': '💧 Misty chambers where aquatic explorations and cleansing rituals take place.',
            'power exchange tunnels': '⚡ Dynamic spaces where the arts of dominance and submission are explored safely.',
            'wisdom archives': '📚 Ancient libraries containing the collected knowledge of generations of underground guides.'
        };

        return locations[location.toLowerCase()] || `🕵️ A mysterious underground location where "${location}" experiences unfold under KinkScout guidance.`;
    }
}

module.exports = { KinkScoutLogic };
