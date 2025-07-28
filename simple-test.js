// Simple direct test for hypnotube.com
console.log('🔍 Starting simple URL test...');

const url = 'https://hypnotube.com/video/furry-sir-poppers-pmv-101313.html';
const pattern = /hypnotube\.com\//;

console.log('URL:', url);
console.log('Pattern:', pattern.toString());
console.log('Test result:', pattern.test(url));

// Test the exact pattern array from progress-manager.js
const urlPatterns = [
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

console.log('\n🧪 Testing against all patterns...');

let matchFound = false;
urlPatterns.forEach((pat, i) => {
    const match = pat.test(url);
    if (match) {
        console.log(`✅ Pattern ${i + 1} MATCHED: ${pat}`);
        matchFound = true;
    }
});

if (!matchFound) {
    console.log('❌ NO PATTERNS MATCHED');
    console.log('Testing individual hypnotube pattern...');
    console.log('hypnotube pattern test:', /hypnotube\.com\//.test(url));
}

console.log(`\n🎯 Final result: ${matchFound ? 'VALID' : 'INVALID'}`);
console.log('✅ Test completed successfully!');
