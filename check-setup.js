#!/usr/bin/env node

/**
 * 🎯 Complete Setup Status Checker
 * Shows your Fetish Hypno Hub configuration status
 */

require('dotenv').config();

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║                🎭 FETISH HYPNO HUB STATUS 🎭                ║');
console.log('║                 Configuration Overview                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log('');

// Check basic bot configuration
console.log('🤖 BOT CONFIGURATION:');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log(`│ Main Bot Token: ${process.env.BOT_TOKEN ? '✅ SET' : '❌ NOT SET'}`);
console.log(`│ KinkScout Token: ${process.env.KINKSCOUT_BOT_TOKEN ? '✅ SET' : '❌ NOT SET'}`);
console.log(`│ Default Chat ID: ${process.env.CHAT_ID ? '✅ SET' : '❌ NOT SET'}`);
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');

// Check channel configuration
console.log('📺 CHANNEL CONFIGURATION:');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log(`│ 🔓 Vault Channel: ${process.env.VAULT_CHANNEL_ID ? '✅ ' + process.env.VAULT_CHANNEL_ID : '❌ NOT SET'}`);
console.log(`│ 🔐 Elite Channel: ${process.env.ELITE_CHANNEL_ID ? '✅ ' + process.env.ELITE_CHANNEL_ID : '❌ NOT SET'}`);
console.log(`│ 💬 Lounge Group: ${process.env.LOUNGE_CHANNEL_ID ? '✅ ' + process.env.LOUNGE_CHANNEL_ID : '❌ NOT SET'}`);
console.log(`│ 🧠 Curator Room: ${process.env.CURATOR_ROOM_ID ? '✅ ' + process.env.CURATOR_ROOM_ID : '❌ NOT SET'}`);
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');

// Check curator permissions
console.log('👥 CURATOR ACCESS:');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log(`│ Admin Curators: ${process.env.ADMIN_CURATORS ? '✅ ' + process.env.ADMIN_CURATORS : '❌ NOT SET'}`);
console.log(`│ Senior Curators: ${process.env.SENIOR_CURATORS ? '✅ ' + process.env.SENIOR_CURATORS : '❌ NOT SET'}`);
console.log(`│ Junior Curators: ${process.env.JUNIOR_CURATORS ? '✅ ' + process.env.JUNIOR_CURATORS : '❌ NOT SET'}`);
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');

// Calculate completion percentage
const requiredConfigs = [
    'BOT_TOKEN', 'VAULT_CHANNEL_ID', 'ELITE_CHANNEL_ID',
    'LOUNGE_CHANNEL_ID', 'CURATOR_ROOM_ID', 'ADMIN_CURATORS'
];

const setConfigs = requiredConfigs.filter(config => process.env[config]);
const completionPercent = Math.round((setConfigs.length / requiredConfigs.length) * 100);

console.log('📊 SETUP COMPLETION:');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log(`│ Progress: ${setConfigs.length}/${requiredConfigs.length} required configs set (${completionPercent}%)`);

// Progress bar
const progressBar = '█'.repeat(Math.floor(completionPercent / 10)) +
    '░'.repeat(10 - Math.floor(completionPercent / 10));
console.log(`│ [${progressBar}] ${completionPercent}%`);
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');

// Show missing requirements
const missingConfigs = requiredConfigs.filter(config => !process.env[config]);
if (missingConfigs.length > 0) {
    console.log('⚠️  MISSING REQUIREMENTS:');
    console.log('┌────────────────────────────────────────────────────────────┐');
    missingConfigs.forEach(config => {
        let description = '';
        switch (config) {
            case 'BOT_TOKEN': description = 'Get from @BotFather'; break;
            case 'VAULT_CHANNEL_ID': description = '@HypnoFetishVault channel ID'; break;
            case 'ELITE_CHANNEL_ID': description = '@HypnoFetishElite channel ID'; break;
            case 'LOUNGE_CHANNEL_ID': description = '@HypnoFetishLounge group ID'; break;
            case 'CURATOR_ROOM_ID': description = '@WeirdHypnobatingVault group ID'; break;
            case 'ADMIN_CURATORS': description = 'Your Telegram user ID'; break;
        }
        console.log(`│ ❌ ${config}: ${description}`);
    });
    console.log('└────────────────────────────────────────────────────────────┘');
    console.log('');
}

// Show next steps
if (completionPercent < 100) {
    console.log('🎯 NEXT STEPS:');
    console.log('┌────────────────────────────────────────────────────────────┐');

    if (!process.env.CURATOR_ROOM_ID) {
        console.log('│ 1. Create @WeirdHypnobatingVault private group             │');
        console.log('│    Add your bot as admin and get the group ID             │');
    }

    if (!process.env.ADMIN_CURATORS) {
        console.log('│ 2. Get your Telegram user ID from @userinfobot            │');
        console.log('│    Add it to ADMIN_CURATORS in .env file                  │');
    }

    console.log('│ 3. Update .env file with missing values                   │');
    console.log('│ 4. Run: ./start-hub.sh                                    │');
    console.log('└────────────────────────────────────────────────────────────┘');
} else {
    console.log('🎉 READY TO LAUNCH:');
    console.log('┌────────────────────────────────────────────────────────────┐');
    console.log('│ ✅ All required configuration complete!                    │');
    console.log('│ 🚀 Run: ./start-hub.sh                                    │');
    console.log('│ 🕵️ Test KinkScout: /kinkscout [scenario]                   │');
    console.log('│ 🎨 Test AI: /generate [prompt]                            │');
    console.log('└────────────────────────────────────────────────────────────┘');
}

console.log('');

// Show channel mapping for reference
console.log('📋 CHANNEL REFERENCE:');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log('│ @HypnoFetishVault → VAULT_CHANNEL_ID (Public Teasers)     │');
console.log('│ @HypnoFetishElite → ELITE_CHANNEL_ID (VIP Full Access)    │');
console.log('│ @HypnoFetishLounge → LOUNGE_CHANNEL_ID (Chat/Discussion)  │');
console.log('│ @WeirdHypnobatingVault → CURATOR_ROOM_ID (Private Ops)    │');
console.log('└────────────────────────────────────────────────────────────┘');
console.log('');

// Optional features
console.log('🌟 OPTIONAL FEATURES:');
console.log('┌────────────────────────────────────────────────────────────┐');
console.log(`│ 🕵️ KinkScout Bot: ${process.env.KINKSCOUT_BOT_TOKEN ? '✅ Available' : '⭕ Not configured'}`);
console.log(`│ 🎨 AI Generation: ${process.env.AUTOMATIC1111_URL ? '✅ Configured' : '⭕ Install Automatic1111'}`);
console.log(`│ 💼 Fansly Integration: ${process.env.FANSLY_CONFIG ? '✅ Available' : '⭕ Not needed unless using'}`);
console.log('└────────────────────────────────────────────────────────────┘');

console.log('');
console.log('🎭 Your underground fetish empire awaits! 🌀✨');
