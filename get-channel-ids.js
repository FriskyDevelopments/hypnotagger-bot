#!/usr/bin/env node

/**
 * 🆔 Channel ID Helper Script
 * Helps you get and verify channel IDs for your Fetish Hypno Hub
 */

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

async function getChannelInfo() {
    const botToken = process.env.BOT_TOKEN;

    if (!botToken) {
        console.log('❌ BOT_TOKEN not found in .env file');
        console.log('Add your bot token to .env first:');
        console.log('BOT_TOKEN=your_bot_token_here');
        return;
    }

    const bot = new TelegramBot(botToken);

    console.log('🆔 Channel ID Helper for Fetish Hypno Hub\n');

    try {
        // Test bot connectivity
        const botInfo = await bot.getMe();
        console.log(`✅ Bot connected: @${botInfo.username}\n`);

        // Check current configuration
        console.log('📋 Current .env Configuration:');
        console.log(`VAULT_CHANNEL_ID=${process.env.VAULT_CHANNEL_ID || 'NOT SET'}`);
        console.log(`ELITE_CHANNEL_ID=${process.env.ELITE_CHANNEL_ID || 'NOT SET'}`);
        console.log(`LOUNGE_CHANNEL_ID=${process.env.LOUNGE_CHANNEL_ID || 'NOT SET'}`);
        console.log(`CURATOR_ROOM_ID=${process.env.CURATOR_ROOM_ID || 'NOT SET'}`);
        console.log(`ADMIN_CURATORS=${process.env.ADMIN_CURATORS || 'NOT SET'}\n`);

        // Test channel access if IDs are configured
        const channels = [
            { name: 'Teaser Vault', id: process.env.VAULT_CHANNEL_ID, username: '@HypnoFetishVault' },
            { name: 'VIP Elite', id: process.env.ELITE_CHANNEL_ID, username: '@HypnoFetishElite' },
            { name: 'Chat Lounge', id: process.env.LOUNGE_CHANNEL_ID, username: '@HypnoFetishLounge' },
            { name: 'Curator Room', id: process.env.CURATOR_ROOM_ID, username: '@WeirdHypnobatingVault' }
        ];

        console.log('🔍 Testing Channel Access:\n');

        for (const channel of channels) {
            if (channel.id && channel.id !== 'NOT SET') {
                try {
                    const chat = await bot.getChat(channel.id);
                    console.log(`✅ ${channel.name}: ${chat.title}`);
                    console.log(`   ID: ${channel.id}`);
                    console.log(`   Type: ${chat.type}`);
                    if (chat.username) {
                        console.log(`   Username: @${chat.username}`);
                    }
                    console.log('');
                } catch (error) {
                    console.log(`❌ ${channel.name}: Cannot access channel`);
                    console.log(`   ID: ${channel.id}`);
                    console.log(`   Error: ${error.message}`);
                    console.log(`   💡 Make sure bot is admin in ${channel.username}`);
                    console.log('');
                }
            } else {
                console.log(`⚠️ ${channel.name}: Not configured`);
                console.log(`   Expected: ${channel.username}`);
                console.log('   💡 Create channel and add ID to .env');
                console.log('');
            }
        }

        console.log('📝 How to Get Channel IDs:');
        console.log('1. Add your bot as admin to each channel/group');
        console.log('2. Send any message to the channel');
        console.log('3. Forward that message to @userinfobot');
        console.log('4. Copy the channel ID (starts with -100...)');
        console.log('5. Add the ID to your .env file');
        console.log('6. Run this script again to verify\n');

        console.log('🔧 Example .env configuration:');
        console.log('VAULT_CHANNEL_ID=-1001234567890');
        console.log('ELITE_CHANNEL_ID=-1001234567891');
        console.log('LOUNGE_CHANNEL_ID=-1001234567892');
        console.log('CURATOR_ROOM_ID=-1001234567893');
        console.log('ADMIN_CURATORS=123456789\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n💡 Common issues:');
        console.log('- Bot token is invalid');
        console.log('- Bot is not admin in channels');
        console.log('- Channel IDs are incorrect format');
    } finally {
        process.exit(0);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Goodbye!');
    process.exit(0);
});

if (require.main === module) {
    getChannelInfo().catch(console.error);
}

module.exports = { getChannelInfo };
