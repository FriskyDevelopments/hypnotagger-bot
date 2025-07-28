#!/usr/bin/env node

/**
 * 📱 iOS-Friendly HypnoTagger Checker
 * Quick diagnostic tool that works on iOS devices
 */

require('dotenv').config();

console.log('📱 HYPNOTAGGER iOS DIAGNOSTIC\n');

// Check critical settings
const critical = [
    { name: 'BOT_TOKEN', value: process.env.BOT_TOKEN },
    { name: 'CURATOR_ROOM_ID', value: process.env.CURATOR_ROOM_ID },
    { name: 'ADMIN_CURATORS', value: process.env.ADMIN_CURATORS }
];

console.log('🔍 CRITICAL SETTINGS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

let allGood = true;
critical.forEach(item => {
    const status = item.value ? '✅' : '❌';
    const display = item.value ? 'SET' : 'MISSING';
    console.log(`${status} ${item.name}: ${display}`);
    if (!item.value) allGood = false;
});

console.log('\n📊 QUICK STATUS:');
if (allGood) {
    console.log('🎉 ALL CRITICAL SETTINGS FOUND!');
    console.log('✅ Your bot should work!');
    console.log('\n🚀 TO START: node index.js');
} else {
    console.log('🚨 MISSING CRITICAL SETTINGS!');
    console.log('❌ Bot will NOT work until fixed!');
    console.log('\n🔧 FIX: Update .env file with missing values');
}

console.log('\n📱 iOS DEVELOPMENT OPTIONS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🌐 GitHub Codespaces: github.com → Code → Codespaces');
console.log('📱 GitHub Mobile App: Edit .env directly');
console.log('💻 VS Code Web: vscode.dev');
console.log('🔄 Working Copy: Git client for iOS');

console.log('\n🕵️ KINKSCOUT PROFILE PICTURE:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Copy this: 🕵️🔮🎭');
console.log('Bot name: KinkScout Guide 🕵️');
console.log('Bio: 🕵️ Your Underground Guide');

console.log('\n✨ Ready to rule the underground realm!');

// Quick module test
console.log('\n🧪 MODULE TEST:');
try {
    require('node-telegram-bot-api');
    console.log('✅ TelegramBot: OK');
} catch {
    console.log('❌ TelegramBot: MISSING (run: npm install)');
}

try {
    require('./kinkscout-logic');
    console.log('✅ KinkScout: OK');
} catch {
    console.log('❌ KinkScout: Missing file');
}
