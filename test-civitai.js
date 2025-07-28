#!/usr/bin/env node

/**
 * 🧪 Civitai + Automatic1111 Integration Test
 * Test AI generation capabilities for Fetish Hypno Hub
 */

require('dotenv').config();

const { CivitaiIntegration } = require('./civitai-integration');

async function testCivitaiIntegration() {
    console.log('🎨 Testing Civitai + Automatic1111 Integration...\n');

    const civitai = new CivitaiIntegration({
        automatic1111Url: process.env.AUTOMATIC1111_URL || 'http://localhost:7860',
        outputDir: './test_generated_images'
    });

    try {
        // Test 1: Check availability
        console.log('1️⃣ Testing Automatic1111 availability...');
        const isAvailable = await civitai.checkAutomatic1111Availability();
        console.log(`   Result: ${isAvailable ? '✅ Available' : '❌ Not available'}\n`);

        if (!isAvailable) {
            console.log('⚠️ Automatic1111 WebUI is not running. Start it first to test generation.');
            return;
        }

        // Test 2: Get available models
        console.log('2️⃣ Getting available models...');
        const models = await civitai.getAvailableModels();
        console.log(`   Found ${models.length} models:`);
        models.slice(0, 3).forEach((model, index) => {
            console.log(`   ${index + 1}. ${model}`);
        });
        console.log('');

        // Test 3: Generate stylized tags
        console.log('3️⃣ Testing tag generation...');
        const testPrompts = [
            'muscular pup in leather gear',
            'hypnotic spiral trance scene',
            'bear daddy in rubber suit',
            'kinkscout leader underground'
        ];

        testPrompts.forEach(prompt => {
            const tags = civitai.generateStylizedTags(prompt);
            console.log(`   "${prompt}" → ${tags.join(' ')}`);
        });
        console.log('');

        // Test 4: Generate a test image (only if requested)
        if (process.argv.includes('--generate')) {
            console.log('4️⃣ Generating test image...');
            const testPrompt = 'kinkscout character, confident pose, leather gear, underground aesthetic, high quality';

            console.log(`   Prompt: "${testPrompt}"`);
            console.log('   ⏳ Generating... (this may take 30-60 seconds)');

            const result = await civitai.generateImage(testPrompt, {
                steps: 20, // Quick generation for test
                width: 512,
                height: 512
            });

            const saved = await civitai.saveGeneratedImage(result.images[0], testPrompt, {
                test: true,
                timestamp: new Date().toISOString()
            });

            console.log(`   ✅ Image generated: ${saved.filename}`);
            console.log(`   📁 Location: ${saved.filepath}`);
            console.log(`   📊 Size: ${saved.fileSize}`);

            // Generate tags for the test image
            const tags = civitai.generateStylizedTags(testPrompt);
            console.log(`   🏷️ Tags: ${tags.join(' ')}`);
        } else {
            console.log('4️⃣ Image generation test skipped (use --generate flag to test)');
        }

        console.log('\n✅ All tests completed successfully!');
        console.log('\n🎯 To test image generation, run:');
        console.log('   node test-civitai.js --generate');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    }
}

// Run the test
if (require.main === module) {
    testCivitaiIntegration().catch(console.error);
}

module.exports = { testCivitaiIntegration };
