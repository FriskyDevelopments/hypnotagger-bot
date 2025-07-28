#!/usr/bin/env node

/**
 * 🆔 User ID Helper for @PissLvrMex
 * Instructions to get Telegram User IDs
 */

console.log('🆔 Getting User IDs for HypnoTagger Admins\n');

console.log('📝 STEP-BY-STEP INSTRUCTIONS:\n');

console.log('👤 FOR YOU:');
console.log('1. Send any message to @userinfobot on Telegram');
console.log('2. Copy your User ID (will be like 123456789)');
console.log('3. Replace first "123456789" in .env ADMIN_CURATORS\n');

console.log('👤 FOR @PissLvrMex:');
console.log('1. Ask @PissLvrMex to send a message to @userinfobot');
console.log('2. Have them share their User ID with you');
console.log('3. Replace "987654321" in .env ADMIN_CURATORS\n');

console.log('🔧 ALTERNATIVE METHOD:');
console.log('1. Add @PissLvrMex to your "Weird Hypnobating" group');
console.log('2. Have them send a message in the group');
console.log('3. Forward their message to @userinfobot');
console.log('4. This will show their User ID\n');

console.log('📄 FINAL .env FORMAT:');
console.log('ADMIN_CURATORS=YOUR_REAL_ID,PISSLVRMEX_REAL_ID');
console.log('Example: ADMIN_CURATORS=123456789,987654321\n');

console.log('✅ Once both IDs are set, your HypnoTagger will work with both admins!');
console.log('🚀 Then run: node index.js');

console.log('\n🎭 Current .env status:');
require('dotenv').config();
console.log('CURATOR_ROOM_ID:', process.env.CURATOR_ROOM_ID);
console.log('ADMIN_CURATORS:', process.env.ADMIN_CURATORS);
