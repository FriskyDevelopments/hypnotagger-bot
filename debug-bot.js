#!/usr/bin/env node

/**
 * 🔍 HypnoTagger Diagnostic Tool
 * Checks what's working and what's broken
 */

require('dotenv').config();

console.log('🔍 HYPNOTAGGER DIAGNOSTIC REPORT\n');

// Check environment variables
const checks = [
    { name: 'BOT_TOKEN', value: process.env.BOT_TOKEN, critical: true },
    { name: 'CHAT_ID', value: process.env.CHAT_ID, critical: false },
    { name: 'CURATOR_ROOM_ID', value: process.env.CURATOR_ROOM_ID, critical: true },
    { name: 'ADMIN_CURATORS', value: process.env.ADMIN_CURATORS, critical: true },
    { name: 'VAULT_CHANNEL_ID', value: process.env.VAULT_CHANNEL_ID, critical: false },
    { name: 'ELITE_CHANNEL_ID', value: process.env.ELITE_CHANNEL_ID, critical: false },
    { name: 'LOUNGE_CHANNEL_ID', value: process.env.LOUNGE_CHANNEL_ID, critical: false }
];

console.log('📋 ENVIRONMENT VARIABLES:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
checks.forEach(check => {
    const status = check.value ? '✅' : '❌';
    const priority = check.critical ? '🚨 CRITICAL' : '⚠️  OPTIONAL';
    console.log(`${status} ${check.name}: ${check.value ? 'SET' : 'MISSING'} (${priority})`);
});

console.log('\n🔧 MODULE LOADING TEST:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

try {
    const TelegramBot = require('node-telegram-bot-api');
    console.log('✅ TelegramBot module: OK');
} catch (error) {
    console.log('❌ TelegramBot module: FAILED -', error.message);
}

try {
    const { KinkScoutLogic } = require('./kinkscout-logic');
    const kinkScout = new KinkScoutLogic();
    console.log('✅ KinkScoutLogic module: OK');
} catch (error) {
    console.log('❌ KinkScoutLogic module: FAILED -', error.message);
}

try {
    const { classifyWithConfidence } = require('./tagger');
    console.log('✅ Tagger module: OK');
} catch (error) {
    console.log('❌ Tagger module: FAILED -', error.message);
}

try {
    const { ChunkedVideoProcessor } = require('./chunked-processor');
    console.log('✅ ChunkedVideoProcessor module: OK');
} catch (error) {
    console.log('❌ ChunkedVideoProcessor module: FAILED -', error.message);
}

try {
    const { CuratorModule } = require('./curator-module');
    console.log('✅ CuratorModule: OK');
} catch (error) {
    console.log('❌ CuratorModule: FAILED -', error.message);
}

console.log('\n🎯 QUICK FIXES:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const criticalMissing = checks.filter(c => c.critical && !c.value);
if (criticalMissing.length > 0) {
    console.log('🚨 CRITICAL ISSUES:');
    criticalMissing.forEach(item => {
        console.log(`   • ${item.name} is missing`);
    });
    console.log('\n📝 TO FIX: Update .env file with missing values');
} else {
    console.log('✅ All critical settings found!');
}

console.log('\n🚀 STARTUP COMMAND:');
console.log('node index.js');

console.log('\n📱 iOS DEVELOPMENT OPTIONS:');
console.log('• vscode.dev - VS Code in browser');
console.log('• GitHub Codespaces - Full dev environment');
console.log('• Termius app - SSH terminal access');
console.log('• GitHub Mobile app - Quick file edits');
