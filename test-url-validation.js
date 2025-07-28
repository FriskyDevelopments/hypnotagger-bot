const { ProgressManager } = require('./progress-manager.js');
const fs = require('fs');

// Mock bot for testing
const mockBot = {
    sendMessage: (chatId, text) => {
        const logMessage = `📤 Mock message to ${chatId}: ${text}`;
        console.log(logMessage);
        fs.appendFileSync('test-results.txt', logMessage + '\n');
        return Promise.resolve({ message_id: 123 });
    },
    editMessageText: () => Promise.resolve(),
    deleteMessage: () => Promise.resolve(),
    sendChatAction: () => Promise.resolve()
};

const progressManager = new ProgressManager(mockBot);

// Test function
async function testUrl(url) {
    const testLog = `\n🧪 Testing URL: "${url}"`;
    console.log(testLog);
    fs.appendFileSync('test-results.txt', testLog + '\n');
    console.log('─'.repeat(50));
    fs.appendFileSync('test-results.txt', '─'.repeat(50) + '\n');

    const result = await progressManager.validateAndRespond(12345, url);
    const resultLog = `🎯 Final result: ${result ? '✅ VALID' : '❌ INVALID'}`;
    console.log(resultLog);
    fs.appendFileSync('test-results.txt', resultLog + '\n');
    console.log('─'.repeat(50));
    fs.appendFileSync('test-results.txt', '─'.repeat(50) + '\n');

    return result;
}

// Test URLs
async function runTests() {
    const testUrls = [
        'https://hypnotube.com/video/furry-sir-poppers-pmv-101313.html',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://youtu.be/dQw4w9WgXcQ',
        'https://twitter.com/user/status/123456789',
        'https://www.tiktok.com/@user/video/123456789',
        'https://fansly.com/post/123456789',
        'https://example.com/video.mp4',
        'not a url at all',
        ''
    ];

    console.log('🔍 Starting URL validation tests...\n');

    for (const url of testUrls) {
        await testUrl(url);
        // Small delay to see logs clearly
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n✅ All tests completed!');
}

runTests().catch(console.error);
