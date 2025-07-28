#!/usr/bin/env node

/**
 * 🚨 EMERGENCY HypnoTagger Fixer
 * This script will help you get your bot working immediately
 */

require('dotenv').config();

console.log('🚨 HypnoTagger Emergency Diagnostic\n');

// Check critical environment variables
const checks = [
    { name: 'BOT_TOKEN', value: process.env.BOT_TOKEN, critical: true },
    { name: 'CHAT_ID', value: process.env.CHAT_ID, critical: true },
    { name: 'CURATOR_ROOM_ID', value: process.env.CURATOR_ROOM_ID, critical: true },
    { name: 'VAULT_CHANNEL_ID', value: process.env.VAULT_CHANNEL_ID, critical: false },
    { name: 'ELITE_CHANNEL_ID', value: process.env.ELITE_CHANNEL_ID, critical: false },
    { name: 'LOUNGE_CHANNEL_ID', value: process.env.LOUNGE_CHANNEL_ID, critical: false }
];

let criticalMissing = [];
let optionalMissing = [];

checks.forEach(check => {
    const status = check.value ? '✅' : '❌';
    const display = check.value ? 'SET' : 'MISSING';
    console.log(`${status} ${check.name}: ${display}`);

    if (!check.value) {
        if (check.critical) {
            criticalMissing.push(check.name);
        } else {
            optionalMissing.push(check.name);
        }
    }
});

console.log('\n📊 DIAGNOSIS:');

if (criticalMissing.length > 0) {
    console.log(`🚨 CRITICAL MISSING: ${criticalMissing.join(', ')}`);
    console.log('❌ Your bot CANNOT work without these!');

    console.log('\n🔧 IMMEDIATE FIXES NEEDED:');

    if (criticalMissing.includes('CURATOR_ROOM_ID')) {
        console.log('\n📱 CURATOR_ROOM_ID Missing:');
        console.log('1. Create a private group called "ᴡᴇɪʀᴅʜʏᴘɴᴏʙᴀᴛɪɴɢᴠᴀᴜʟᴛ 🧠"');
        console.log('2. Add your bot to the group as admin');
        console.log('3. Send a message in the group');
        console.log('4. Use @userinfobot to get the group ID');
        console.log('5. Add the ID to .env as CURATOR_ROOM_ID=-100xxxxxxxxx');
    }

    if (criticalMissing.includes('BOT_TOKEN')) {
        console.log('\n🤖 BOT_TOKEN Missing:');
        console.log('1. Go to @BotFather on Telegram');
        console.log('2. Create a new bot or use existing token');
        console.log('3. Add to .env as BOT_TOKEN=xxxxxxxxx:xxxxxxxxxxxxxxxxxxxxx');
    }

    if (criticalMissing.includes('CHAT_ID')) {
        console.log('\n💬 CHAT_ID Missing:');
        console.log('1. Use @userinfobot to get your chat ID');
        console.log('2. Add to .env as CHAT_ID=-100xxxxxxxxx');
    }

} else {
    console.log('✅ All critical settings found!');

    if (optionalMissing.length > 0) {
        console.log(`⚠️ Optional missing: ${optionalMissing.join(', ')}`);
        console.log('🎭 Your basic bot will work, but full Fetish Hypno Hub features need these channels');
    }
}

console.log('\n🚀 QUICK START OPTIONS:');
console.log('1. Basic Bot: Just fix CURATOR_ROOM_ID and you can start');
console.log('2. Full Hub: Follow TELEGRAM-SETUP-GUIDE.md for complete setup');

console.log('\n📞 NEXT STEPS:');
console.log('1. Fix missing critical items above');
console.log('2. Run: node index.js');
console.log('3. Test with: /help command in Telegram');

if (criticalMissing.length === 0) {
    console.log('\n🎉 Ready to test your bot!');
    console.log('Run: node index.js');
} else {
    console.log('\n⛔ Fix critical issues first, then restart bot');
}
