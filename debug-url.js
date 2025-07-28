#!/usr/bin/env node

// Debug URL validation
function validateUrl(url) {
    console.log(`🔍 Testing URL: "${url}"`);
    console.log(`📏 URL length: ${url.length}`);
    console.log(`🔗 URL type: ${typeof url}`);
    console.log(`✂️  URL trimmed: "${url.trim()}"`);

    // Comprehensive validation patterns for supported platforms
    const urlPatterns = [
        // YouTube
        { name: 'YouTube watch', pattern: /youtube\.com\/watch\?v=/ },
        { name: 'YouTube short', pattern: /youtu\.be\// },
        { name: 'YouTube embed', pattern: /youtube\.com\/embed\// },
        { name: 'YouTube v', pattern: /youtube\.com\/v\// },
        { name: 'YouTube playlist', pattern: /youtube\.com\/playlist\?list=/ },
        { name: 'YouTube shorts', pattern: /youtube\.com\/shorts\// },
        { name: 'YouTube mobile', pattern: /m\.youtube\.com\// },

        // Twitter/X
        { name: 'Twitter status', pattern: /twitter\.com\/.*\/status\// },
        { name: 'X status', pattern: /x\.com\/.*\/status\// },
        { name: 'Twitter mobile', pattern: /mobile\.twitter\.com\// },
        { name: 'Twitter short', pattern: /t\.co\// },

        // TikTok
        { name: 'TikTok', pattern: /tiktok\.com\// },
        { name: 'TikTok vm', pattern: /vm\.tiktok\.com\// },
        { name: 'TikTok vt', pattern: /vt\.tiktok\.com\// },
        { name: 'TikTok mobile', pattern: /m\.tiktok\.com\// },

        // Instagram
        { name: 'Instagram post', pattern: /instagram\.com\/p\// },
        { name: 'Instagram reel', pattern: /instagram\.com\/reel\// },
        { name: 'Instagram TV', pattern: /instagram\.com\/tv\// },
        { name: 'Instagram stories', pattern: /instagram\.com\/stories\// },

        // Vimeo
        { name: 'Vimeo', pattern: /vimeo\.com\// },
        { name: 'Vimeo player', pattern: /player\.vimeo\.com\// },

        // Reddit
        { name: 'Reddit comments', pattern: /reddit\.com\/r\/.*\/comments\// },
        { name: 'Reddit short', pattern: /redd\.it\// },
        { name: 'Reddit video', pattern: /v\.redd\.it\// },
        { name: 'Reddit image', pattern: /i\.redd\.it\// },

        // Twitch
        { name: 'Twitch videos', pattern: /twitch\.tv\/videos\// },
        { name: 'Twitch clip', pattern: /twitch\.tv\/.*\/clip\// },
        { name: 'Twitch clips', pattern: /clips\.twitch\.tv\// },

        // Other platforms
        { name: 'Dailymotion', pattern: /dailymotion\.com\// },
        { name: 'Streamable', pattern: /streamable\.com\// },
        { name: 'Gfycat', pattern: /gfycat\.com\// },
        { name: 'Imgur', pattern: /imgur\.com\// },
        { name: 'Pornhub', pattern: /pornhub\.com\// },
        { name: 'Xvideos', pattern: /xvideos\.com\// },
        { name: 'Xhamster', pattern: /xhamster\.com\// },
        { name: 'Redtube', pattern: /redtube\.com\// },
        { name: 'Tube8', pattern: /tube8\.com\// },
        { name: 'Spankbang', pattern: /spankbang\.com\// },
        { name: 'Fansly', pattern: /fansly\.com\// },
        { name: 'OnlyFans', pattern: /onlyfans\.com\// },

        // Hypno and specialized platforms  
        { name: 'HypnoTube', pattern: /hypnotube\.com\// },
        { name: 'HypnoCastle', pattern: /hypnocastle\.net\// },
        { name: 'HypnoHub', pattern: /hypnohub\.net\// },
        { name: 'HypnoPics', pattern: /hypnopics-collective\.net\// },
        { name: 'E621', pattern: /e621\.net\// },
        { name: 'Rule34', pattern: /rule34\.xxx\// },

        // General video file extensions
        { name: 'Video file extension', pattern: /\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp|m3u8)(\?.*)?$/i },

        // Generic HTTPS video patterns (more permissive for edge cases)
        { name: 'Generic HTTPS video', pattern: /^https?:\/\/.*\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp)/i },
        { name: 'Generic HTTPS video path', pattern: /^https?:\/\/.*\/.*\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp)/i }
    ];

    console.log('\n🧪 Testing against patterns:');

    let matchFound = false;
    urlPatterns.forEach(({ name, pattern }) => {
        const isMatch = pattern.test(url);
        console.log(`  ${isMatch ? '✅' : '❌'} ${name}: ${pattern}`);
        if (isMatch) matchFound = true;
    });

    console.log(`\n🎯 Final result: ${matchFound ? '✅ VALID' : '❌ INVALID'}`);
    return matchFound;
}

// Test with some sample URLs
const testUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://twitter.com/user/status/123456789',
    'https://www.tiktok.com/@user/video/123456789',
    'https://example.com/video.mp4',
    'not a url at all',
    'https://fansly.com/post/123456789'
];

if (process.argv[2]) {
    // Test specific URL from command line
    validateUrl(process.argv[2]);
} else {
    // Test sample URLs
    console.log('🔍 Testing sample URLs:\n');
    testUrls.forEach((url, index) => {
        console.log(`\n📋 Test ${index + 1}:`);
        validateUrl(url);
        console.log('─'.repeat(50));
    });
}
