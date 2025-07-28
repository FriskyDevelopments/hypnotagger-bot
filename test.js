/**
 * Test file for HypnoTagger Bot functionality
 * Tests the enhanced classification system
 */

const { classifyTags, classifyWithConfidence } = require('./tagger');

// Test cases for the classification system
const testCases = [
    {
        name: "Basic hypno content",
        text: "Hot guy gets hypnotized and obeys commands in trance",
        expected: ["gay", "hypno"]
    },
    {
        name: "Pupplay scene",
        text: "Alpha handler trains his pup with collar and tail",
        expected: ["gay", "pupplay"]
    },
    {
        name: "Rubber gear",
        text: "Muscular man in tight latex catsuit and gas mask",
        expected: ["gay", "rubber"]
    },
    {
        name: "Multiple categories",
        text: "Rubber pup gets hypnotized by handler with chloroform rag",
        expected: ["gay", "rubber", "pupplay", "hypno", "chloro"]
    },
    {
        name: "Romantic content",
        text: "Two boyfriends kissing and cuddling in bed",
        expected: ["gay", "romantic"]
    }
];

function runTests() {
    console.log('🧪 Running HypnoTagger Classification Tests\n');

    let passed = 0;
    let total = testCases.length;

    // Use async function to handle promises
    async function runTestCase(testCase, index) {
        console.log(`Test ${index + 1}: ${testCase.name}`);
        console.log(`Input: "${testCase.text}"`);

        const result = await classifyTags(testCase.text, { interactive: false });
        const confidence = await classifyWithConfidence(testCase.text, false);

        console.log(`Output: [${result.join(', ')}]`);
        console.log(`Expected: [${testCase.expected.join(', ')}]`);

        // Check if all expected tags are present
        const hasAllExpected = testCase.expected.every(tag => result.includes(tag));

        if (hasAllExpected) {
            console.log('✅ PASSED\n');
            passed++;
        } else {
            console.log('❌ FAILED\n');
        }

        // Show confidence scores for debugging
        console.log('Confidence scores:');
        Object.entries(confidence.confidence).forEach(([tag, score]) => {
            if (score > 0) {
                console.log(`  ${tag}: ${(score * 100).toFixed(1)}%`);
            }
        });
        console.log('---\n');
    }

    // Run all tests sequentially
    async function runAllTests() {
        for (let i = 0; i < testCases.length; i++) {
            await runTestCase(testCases[i], i);
        }

        console.log(`\n🎯 Test Results: ${passed}/${total} passed (${(passed / total * 100).toFixed(1)}%)`);

        if (passed === total) {
            console.log('🎉 All tests passed!');
            process.exit(0);
        } else {
            console.log('⚠️ Some tests failed. Check the implementation.');
            process.exit(1);
        }
    }

    runAllTests().catch(error => {
        console.error('Test execution failed:', error);
        process.exit(1);
    });
}

// Run tests if called directly
if (require.main === module) {
    runTests();
}

module.exports = { runTests, testCases };
