// Simple bot test to diagnose the issue
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

console.log('🔍 Starting bot diagnostics...');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

console.log('✅ Bot created with token:', process.env.BOT_TOKEN ? 'SET' : 'NOT SET');
console.log('✅ Chat ID:', process.env.CHAT_ID || 'NOT SET');

// Test basic message handling
bot.on('message', (msg) => {
    console.log('📨 Received message:', msg.text, 'from:', msg.from.username);
});

// Test polling errors
bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.message);
});

// Test general errors
bot.on('error', (error) => {
    console.error('❌ Bot error:', error.message);
});

// Simple start command
bot.onText(/\/start/, (msg) => {
    console.log('🎯 Start command received from:', msg.from.username);
    bot.sendMessage(msg.chat.id, '🔮 Test bot is working!');
});

console.log('🚀 Bot is starting...');
console.log('💬 Try sending /start to test');

// Keep process alive
process.on('SIGINT', () => {
    console.log('🛑 Bot stopping...');
    process.exit(0);
});
