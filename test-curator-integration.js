#!/usr/bin/env node

// 🌀 Test Curator Integration
// Quick test to verify curator module integration works

console.log('🧪 Testing Curator Integration...\n');

try {
    // Test curator module loading
    console.log('📦 Loading CuratorModule...');
    const { CuratorModule } = require('./curator-module');
    console.log('✅ CuratorModule loaded successfully\n');

    // Test environment variables
    console.log('🔧 Checking Environment Variables:');
    const requiredEnvVars = [
        'BOT_TOKEN',
        'CHAT_ID',
        'TEASER_CHANNEL_ID',
        'VIP_CHANNEL_ID',
        'LOUNGE_GROUP_ID',
        'AUTHORIZED_CURATORS'
    ];

    let envCheckPassed = true;
    requiredEnvVars.forEach(envVar => {
        const value = process.env[envVar];
        const status = value ? '✅' : '❌';
        console.log(`${status} ${envVar}: ${value ? 'SET' : 'NOT SET'}`);
        if (!value && envVar !== 'AUTHORIZED_CURATORS') {
            envCheckPassed = false;
        }
    });

    console.log('\n🎯 Integration Test Results:');
    console.log(`📦 Module Loading: ✅ PASSED`);
    console.log(`🔧 Environment: ${envCheckPassed ? '✅ PASSED' : '⚠️  NEEDS CONFIG'}`);

    if (!envCheckPassed) {
        console.log('\n💡 To complete setup:');
        console.log('1. Update channel IDs in .env file');
        console.log('2. Add authorized curator user IDs');
        console.log('3. Run ./start-bot.sh to start the bot');
    } else {
        console.log('\n🚀 Ready to start bot with curator functionality!');
    }

} catch (error) {
    console.error('❌ Integration test failed:', error.message);
    process.exit(1);
}
