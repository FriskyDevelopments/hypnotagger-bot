/**
 * Enhanced AI-powered content classification system
 * Improved keyword matching with weights and context analysis
 * Interactive category management with user confirmation
 */

const readline = require('readline');

class ContentClassifier {
  constructor() {
    // Weighted keyword system for better accuracy
    this.tagCategories = {
      gay: {
        keywords: ["gay", "male", "men", "guys", "masculine", "homo"],
        weight: 1.0,
        required: true // Base category
      },
      fetish: {
        keywords: ["fetish", "kink", "gear", "craving", "scene", "lifestyle"],
        weight: 1.2,
        context: ["bdsm", "leather", "scene"]
      },
      rubber: {
        keywords: ["rubber", "latex", "catsuit", "gimp", "suit", "gear"],
        weight: 1.1,
        context: ["shiny", "tight", "squeaky"]
      },
      pupplay: {
        keywords: ["pup", "handler", "mosh", "bark", "tailplug", "puppy", "alpha"],
        weight: 1.3,
        context: ["pack", "training", "good boy"]
      },
      hypno: {
        keywords: ["hypno", "obey", "trance", "trigger", "mindcontrol", "mesmerize"],
        weight: 1.4,
        context: ["spiral", "relax", "focus", "sleep"]
      },
      bondage: {
        keywords: ["cuffs", "ropes", "tied", "harness", "bound", "restraint"],
        weight: 1.2,
        context: ["restrict", "secure", "immobilize"]
      },
      chloro: {
        keywords: ["chloro", "rag", "sniff", "limp", "sleep", "unconscious"],
        weight: 1.5,
        context: ["knockout", "gassed", "drugged"]
      },
      explicit: {
        keywords: ["bareback", "blowjob", "cum", "moan", "fuck", "cock"],
        weight: 1.1,
        context: ["raw", "breeding", "load"]
      },
      romantic: {
        keywords: ["love", "kiss", "boyfriend", "cuddle", "romance", "tender"],
        weight: 0.9,
        context: ["affection", "gentle", "caring"]
      },
      piss: {
        keywords: ["piss", "pissplay", "yellow", "urinal", "wet", "watersports"],
        weight: 1.3,
        context: ["golden", "stream", "marking"]
      },
      bear: {
        keywords: ["bear", "hairy", "musclebear", "daddy", "otter", "cub"],
        weight: 1.0,
        context: ["furry", "muscle", "mature"]
      }
    };

    // Potential new keywords that might suggest new categories
    this.unknownKeywords = new Set();
    this.suggestedCategories = new Map();
  }

  /**
   * Advanced text preprocessing with better tokenization
   */
  preprocessText(text) {
    if (!text || typeof text !== 'string') return '';

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  /**
   * Calculate keyword relevance with context awareness
   */
  calculateRelevance(text, category) {
    const config = this.tagCategories[category];
    if (!config) return 0;

    let score = 0;

    // Direct keyword matches
    config.keywords.forEach(keyword => {
      const matches = (text.match(new RegExp(keyword, 'g')) || []).length;
      score += matches * config.weight;
    });

    // Context bonus scoring
    if (config.context) {
      config.context.forEach(contextWord => {
        if (text.includes(contextWord)) {
          score += 0.5; // Bonus for contextual relevance
        }
      });
    }

    return score;
  }

  /**
   * Detect potentially new keywords that don't match existing categories
   */
  detectUnknownKeywords(text) {
    const words = text.split(' ');
    const knownKeywords = new Set();

    // Collect all known keywords
    Object.values(this.tagCategories).forEach(category => {
      category.keywords.forEach(keyword => knownKeywords.add(keyword));
      if (category.context) {
        category.context.forEach(keyword => knownKeywords.add(keyword));
      }
    });

    // Find potentially interesting unknown words
    const unknownWords = words.filter(word => {
      return word.length > 3 &&
        !knownKeywords.has(word) &&
        !this.isCommonWord(word);
    });

    return unknownWords;
  }

  /**
   * Check if a word is a common word that shouldn't be a category
   */
  isCommonWord(word) {
    const commonWords = [
      'video', 'clip', 'scene', 'gets', 'with', 'from', 'they', 'were',
      'have', 'been', 'this', 'that', 'will', 'would', 'could', 'should',
      'very', 'much', 'more', 'most', 'some', 'many', 'what', 'when',
      'where', 'while', 'about', 'after', 'before', 'during', 'between'
    ];
    return commonWords.includes(word);
  }

  /**
   * Interactive category suggestion system
   */
  async suggestCategoryForKeywords(unknownWords, existingCategories) {
    if (unknownWords.length === 0) return null;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      console.log(`\n🔍 Found potentially new keywords: ${unknownWords.join(', ')}`);
      console.log('📋 Existing categories:', Object.keys(existingCategories).join(', '));

      const action = await this.askQuestion(rl,
        '\n🤔 What would you like to do?\n' +
        '1. Create new category\n' +
        '2. Assign to existing category\n' +
        '3. Ignore these keywords\n' +
        'Enter choice (1-3): '
      );

      if (action === '1') {
        const newCategoryName = await this.askQuestion(rl, 'Enter new category name: ');
        const weight = await this.askQuestion(rl, 'Enter weight (1.0-2.0, default 1.0): ') || '1.0';

        return {
          action: 'create',
          categoryName: newCategoryName.toLowerCase(),
          keywords: unknownWords,
          weight: parseFloat(weight)
        };
      } else if (action === '2') {
        const targetCategory = await this.askQuestion(rl, 'Enter existing category name: ');

        if (existingCategories[targetCategory]) {
          return {
            action: 'assign',
            categoryName: targetCategory,
            keywords: unknownWords
          };
        } else {
          console.log('❌ Category not found!');
          return null;
        }
      } else {
        console.log('⏭️ Ignoring keywords');
        return null;
      }
    } finally {
      rl.close();
    }
  }

  /**
   * Helper function for asking questions
   */
  askQuestion(rl, question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Add new category or update existing one
   */
  updateCategories(suggestion) {
    if (!suggestion) return false;

    if (suggestion.action === 'create') {
      this.tagCategories[suggestion.categoryName] = {
        keywords: suggestion.keywords,
        weight: suggestion.weight || 1.0,
        context: []
      };
      console.log(`✅ Created new category: ${suggestion.categoryName}`);
      return true;
    } else if (suggestion.action === 'assign') {
      const category = this.tagCategories[suggestion.categoryName];
      suggestion.keywords.forEach(keyword => {
        if (!category.keywords.includes(keyword)) {
          category.keywords.push(keyword);
        }
      });
      console.log(`✅ Added keywords to ${suggestion.categoryName}`);
      return true;
    }

    return false;
  }

  /**
   * Enhanced classification with confidence scoring and category suggestion
   */
  async classifyTags(text, minConfidence = 0.5, interactive = false) {
    const processedText = this.preprocessText(text);
    if (!processedText) return ['general'];

    const results = [];
    const scores = {};

    // Always include base category if required
    results.push('gay');

    // Calculate scores for all categories
    Object.keys(this.tagCategories).forEach(category => {
      if (category === 'gay') return; // Skip base category

      const score = this.calculateRelevance(processedText, category);
      scores[category] = score;

      if (score >= minConfidence) {
        results.push(category);
      }
    });

    // Interactive mode: suggest new categories for unknown keywords
    if (interactive) {
      const unknownWords = this.detectUnknownKeywords(processedText);
      if (unknownWords.length > 0) {
        const suggestion = await this.suggestCategoryForKeywords(unknownWords, this.tagCategories);
        if (this.updateCategories(suggestion)) {
          // Re-classify with updated categories
          return this.classifyTags(text, minConfidence, false);
        }
      }
    }

    // Remove duplicates and sort by relevance
    const uniqueTags = [...new Set(results)];

    // Sort non-base tags by score (keep 'gay' first)
    const baseTags = uniqueTags.filter(tag => tag === 'gay');
    const scoredTags = uniqueTags
      .filter(tag => tag !== 'gay')
      .sort((a, b) => (scores[b] || 0) - (scores[a] || 0));

    return [...baseTags, ...scoredTags];
  }

  /**
   * Get classification with confidence levels
   */
  async classifyWithConfidence(text, interactive = false) {
    const processedText = this.preprocessText(text);
    const tags = await this.classifyTags(text, 0.5, interactive);
    const confidence = {};

    Object.keys(this.tagCategories).forEach(category => {
      const score = this.calculateRelevance(processedText, category);
      confidence[category] = Math.min(score / 2, 1.0); // Normalize to 0-1
    });

    return {
      tags,
      confidence,
      processed: processedText
    };
  }

  /**
   * Get available categories
   */
  getCategories() {
    return Object.keys(this.tagCategories);
  }

  /**
   * Export categories for backup
   */
  exportCategories() {
    return JSON.stringify(this.tagCategories, null, 2);
  }

  /**
   * Import categories from backup
   */
  importCategories(categoriesJson) {
    try {
      const imported = JSON.parse(categoriesJson);
      this.tagCategories = { ...this.tagCategories, ...imported };
      return true;
    } catch (error) {
      console.error('Failed to import categories:', error.message);
      return false;
    }
  }
}

// Create singleton instance
const classifier = new ContentClassifier();

// Export both class and convenience functions
function classifyTags(text, options = {}) {
  const minConfidence = options.minConfidence || 0.5;
  const interactive = options.interactive || false;
  return classifier.classifyTags(text, minConfidence, interactive);
}

function classifyWithConfidence(text, interactive = false) {
  return classifier.classifyWithConfidence(text, interactive);
}

function getCategories() {
  return classifier.getCategories();
}

function exportCategories() {
  return classifier.exportCategories();
}

function importCategories(categoriesJson) {
  return classifier.importCategories(categoriesJson);
}

module.exports = {
  classifyTags,
  classifyWithConfidence,
  getCategories,
  exportCategories,
  importCategories,
  ContentClassifier
};
