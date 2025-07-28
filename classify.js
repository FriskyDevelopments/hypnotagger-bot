#!/usr/bin/env node

/**
 * Interactive classification utility with category management
 * Allows manual testing and category creation/management
 */

const { classifyTags, classifyWithConfidence, getCategories, exportCategories, importCategories } = require('./tagger');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎭 HypnoTagger Interactive Classification Tool');
console.log('=============================================');
console.log('Commands:');
console.log('  - Enter text to classify');
console.log('  - "categories" to list all categories');
console.log('  - "export" to backup categories');
console.log('  - "import" to restore categories');
console.log('  - "interactive" to enable category suggestions');
console.log('  - "quit" to exit\n');

let interactiveMode = false;

function showMenu() {
    console.log('\n📋 Available Commands:');
    console.log('  classify <text>     - Classify text');
    console.log('  categories          - List all categories');
    console.log('  export              - Export categories to file');
    console.log('  import <file>       - Import categories from file');
    console.log('  interactive on/off  - Toggle interactive mode');
    console.log('  help                - Show this menu');
    console.log('  quit                - Exit');
}

async function handleCommand(input) {
    const [command, ...args] = input.split(' ');

    switch (command.toLowerCase()) {
        case 'categories': {
            console.log('\n🏷️ Current Categories:');
            const categories = getCategories();
            categories.forEach((cat, index) => {
                console.log(`  ${(index + 1).toString().padStart(2)}. ${cat}`);
            });
            console.log(`\nTotal: ${categories.length} categories`);
            break;
        }

        case 'export': {
            try {
                const categoriesData = exportCategories();
                const filename = `categories_backup_${Date.now()}.json`;
                fs.writeFileSync(filename, categoriesData);
                console.log(`✅ Categories exported to: ${filename}`);
            } catch (error) {
                console.log(`❌ Export failed: ${error.message}`);
            }
            break;
        }

        case 'import': {
            if (args.length === 0) {
                console.log('❌ Please specify a file to import');
                break;
            }
            try {
                const filename = args[0];
                const categoriesData = fs.readFileSync(filename, 'utf8');
                if (importCategories(categoriesData)) {
                    console.log(`✅ Categories imported from: ${filename}`);
                } else {
                    console.log('❌ Import failed - invalid file format');
                }
            } catch (error) {
                console.log(`❌ Import failed: ${error.message}`);
            }
            break;
        }

        case 'interactive': {
            return handleInteractiveCommand(args);
        }

        case 'classify': {
            if (args.length === 0) {
                console.log('❌ Please provide text to classify');
                break;
            }
            await classifyText(args.join(' '));
            break;
        }

        case 'help': {
            showMenu();
            break;
        }

        case 'quit':
        case 'exit': {
            console.log('👋 Goodbye!');
            rl.close();
            return false;
        }

        default: {
            // If it's not a command, treat it as text to classify
            await classifyText(input);
            break;
        }
    }

    return true;
}

function handleInteractiveCommand(args) {
    if (args[0] === 'on') {
        interactiveMode = true;
        console.log('✅ Interactive mode enabled - new keywords will trigger category suggestions');
    } else if (args[0] === 'off') {
        interactiveMode = false;
        console.log('✅ Interactive mode disabled');
    } else {
        console.log(`🔄 Interactive mode is currently: ${interactiveMode ? 'ON' : 'OFF'}`);
    }
    return true;
}

async function classifyText(input) {
    if (!input.trim()) {
        console.log('Please enter some text.\n');
        return;
    }

    console.log('\n📊 Classification Results:');
    console.log('=' * 50);

    try {
        // Get basic tags with interactive mode
        const tags = await classifyTags(input, {
            minConfidence: 0.5,
            interactive: interactiveMode
        });
        console.log(`🏷️  Tags: ${tags.map(t => '#' + t).join(' ')}`);

        // Get detailed analysis
        const analysis = await classifyWithConfidence(input, interactiveMode);
        console.log(`📝 Processed: "${analysis.processed}"`);

        console.log('\n📈 Confidence Scores:');
        Object.entries(analysis.confidence)
            .filter(([_, score]) => score > 0)
            .sort(([, a], [, b]) => b - a)
            .forEach(([tag, score]) => {
                const percentage = (score * 100).toFixed(1);
                const bar = '█'.repeat(Math.floor(score * 20));
                const spaces = ' '.repeat(20 - Math.floor(score * 20));
                console.log(`  ${tag.padEnd(12)} ${percentage.padStart(6)}% [${bar}${spaces}]`);
            });

        if (interactiveMode) {
            console.log('\n💡 Interactive mode is ON - unknown keywords may trigger category suggestions');
        }

    } catch (error) {
        console.log(`❌ Classification failed: ${error.message}`);
    }

    console.log('\n' + '='.repeat(50));
}

function askForInput() {
    const prompt = interactiveMode ?
        '🎭 [INTERACTIVE] Enter command or text: ' :
        '🎭 Enter command or text: ';

    rl.question(prompt, async (input) => {
        const shouldContinue = await handleCommand(input);
        if (shouldContinue) {
            console.log(); // Add spacing
            askForInput();
        }
    });
}

// Start the interactive session
showMenu();
askForInput();
