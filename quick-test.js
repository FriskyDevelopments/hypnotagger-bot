const testUrl = 'https://hypnotube.com/video/furry-sir-poppers-pmv-101313.html';
const pattern = /hypnotube\.com\//;

console.log('URL:', testUrl);
console.log('Pattern:', pattern.toString());
console.log('Test result:', pattern.test(testUrl));

// Test all patterns from progress-manager.js
const allPatterns = [
    /youtube\.com\/watch\?v=/,
    /youtu\.be\//,
    /youtube\.com\/embed\//,
    /youtube\.com\/v\//,
    /youtube\.com\/playlist\?list=/,
    /youtube\.com\/shorts\//,
    /m\.youtube\.com\//,
    /twitter\.com\/.*\/status\//,
    /x\.com\/.*\/status\//,
    /mobile\.twitter\.com\//,
    /t\.co\//,
    /tiktok\.com\//,
    /vm\.tiktok\.com\//,
    /vt\.tiktok\.com\//,
    /m\.tiktok\.com\//,
    /instagram\.com\/p\//,
    /instagram\.com\/reel\//,
    /instagram\.com\/tv\//,
    /instagram\.com\/stories\//,
    /vimeo\.com\//,
    /player\.vimeo\.com\//,
    /reddit\.com\/r\/.*\/comments\//,
    /redd\.it\//,
    /v\.redd\.it\//,
    /i\.redd\.it\//,
    /twitch\.tv\/videos\//,
    /twitch\.tv\/.*\/clip\//,
    /clips\.twitch\.tv\//,
    /dailymotion\.com\//,
    /streamable\.com\//,
    /gfycat\.com\//,
    /imgur\.com\//,
    /pornhub\.com\//,
    /xvideos\.com\//,
    /xhamster\.com\//,
    /redtube\.com\//,
    /tube8\.com\//,
    /spankbang\.com\//,
    /fansly\.com\//,
    /onlyfans\.com\//,
    /hypnotube\.com\//,
    /hypnocastle\.net\//,
    /hypnohub\.net\//,
    /hypnopics-collective\.net\//,
    /e621\.net\//,
    /rule34\.xxx\//,
    /thisvid\.com\//,
    /myvidster\.com\//,
    /xtube\.com\//,
    /\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp|m3u8)(\?.*)?$/i,
    /^https?:\/\/.*\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp)/i,
    /^https?:\/\/.*\/.*\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp)/i
];

console.log('\nTesting all patterns:');
let foundMatch = false;
allPatterns.forEach((pat, i) => {
    const match = pat.test(testUrl);
    if (match) {
        console.log(`✅ Pattern ${i + 1} MATCHED: ${pat}`);
        foundMatch = true;
    }
});

if (!foundMatch) {
    console.log('❌ NO PATTERNS MATCHED');
}

console.log(`\nFinal result: ${foundMatch ? 'VALID' : 'INVALID'}`);
