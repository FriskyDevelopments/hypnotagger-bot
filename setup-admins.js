#!/usr/bin/env node

/**
 * 🚀 Quick User ID Setup for HypnoTagger
 * Follow these steps to get both admin User IDs
 */

console.log('🆔 HYPNOTAGGER ADMIN SETUP\n');

console.log('📋 STEP 1: GET YOUR USER ID');
console.log('1. Send ANY message to @userinfobot on Telegram');
console.log('2. Copy the User ID number (like 1234567890)');
console.log('3. Write it down!\n');

console.log('📋 STEP 2: GET @PissLvrMex USER ID');
console.log('Option A - Direct:');
console.log('1. Ask @PissLvrMex to message @userinfobot');
console.log('2. Have them share their User ID with you\n');

console.log('Option B - Through group:');
console.log('1. Add @PissLvrMex to "Weird Hypnobating" group');
console.log('2. Have them send any message in the group');
console.log('3. Forward their message to @userinfobot');
console.log('4. This shows their User ID\n');

console.log('📋 STEP 3: UPDATE .env FILE');
console.log('Replace this line in .env:');
console.log('ADMIN_CURATORS=YOUR_USER_ID_HERE,PISSLVRMEX_USER_ID_HERE');
console.log('\nWith actual numbers like:');
console.log('ADMIN_CURATORS=1234567890,9876543210\n');

console.log('📋 STEP 4: START BOT');
console.log('node index.js\n');

console.log('✅ CURRENT STATUS:');
require('dotenv').config();
console.log('✅ Weird Hypnobating Room ID:', process.env.CURATOR_ROOM_ID);
console.log('⚠️  Admin Curators:', process.env.ADMIN_CURATORS);
console.log('✅ Bot Token:', process.env.BOT_TOKEN ? 'Present' : 'Missing');

if (process.env.ADMIN_CURATORS.includes('YOUR_USER_ID_HERE')) {
    console.log('\n🚨 STILL NEED: Replace placeholders with real User IDs!');
} else {
    console.log('\n🎉 User IDs look set! Ready to start bot!');
}
