#!/usr/bin/env node

/**
 * Test script for KinkScout integration
 * Validates that KinkScout logic is properly integrated into the main bot
 */

console.log('🧪 Testing KinkScout Integration...\n');

try {
    // Test KinkScout Logic Module
    const { KinkScoutLogic } = require('./kinkscout-logic');
    console.log('✅ KinkScoutLogic module loaded successfully');

    const kinkScoutLogic = new KinkScoutLogic();
    console.log('✅ KinkScoutLogic instance created successfully');

    // Test guidance system
    console.log('\n📖 Testing Guidance System:');
    const pupGuidance = kinkScoutLogic.getGuidance('pup');
    console.log('✅ Pup guidance retrieved:', pupGuidance.substring(0, 100) + '...');

    const bearGuidance = kinkScoutLogic.getGuidance('bear');
    console.log('✅ Bear guidance retrieved:', bearGuidance.substring(0, 100) + '...');

    // Test wisdom system
    console.log('\n🔮 Testing Wisdom System:');
    const wisdom1 = kinkScoutLogic.getRandomWisdom();
    console.log('✅ Random wisdom 1:', wisdom1);

    const wisdom2 = kinkScoutLogic.getRandomWisdom();
    console.log('✅ Random wisdom 2:', wisdom2);

    // Test content enhancement
    console.log('\n🎭 Testing Content Enhancement:');
    const enhancement = kinkScoutLogic.enhanceContent('pup');
    console.log('✅ Content enhancement generated:', enhancement.substring(0, 100) + '...');

    // Test story generation
    console.log('\n📚 Testing Story Generation:');
    const story = kinkScoutLogic.generateStory('underground_exploration');
    console.log('✅ Story generated:', story.substring(0, 100) + '...');

    // Test tag generation
    console.log('\n🏷️ Testing Tag Generation:');
    const tags = kinkScoutLogic.generateKinkScoutTags(['pup', 'transformation']);
    console.log('✅ Tags generated:', tags);

    console.log('\n🎉 All KinkScout Integration Tests Passed!');
    console.log('\n🔮 KinkScout is ready to guide users through their underground journey!');

} catch (error) {
    console.error('❌ KinkScout Integration Test Failed:', error.message);
    console.error(error.stack);
    process.exit(1);
}
