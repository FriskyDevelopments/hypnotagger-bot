/**
 * 🎨 Civitai + Automatic1111 Integration Module
 * AI-generated fetish content with NSFW models for Fetish Hypno Hub
 */

const fs = require('fs');
const path = require('path');

class CivitaiIntegration {
    constructor(options = {}) {
        this.automatic1111Url = options.automatic1111Url || 'http://localhost:7860';
        this.defaultModel = options.defaultModel || 'FetishMix_v2.1';
        this.defaultSteps = options.defaultSteps || 30;
        this.defaultCfgScale = options.defaultCfgScale || 7.5;
        this.defaultSampler = options.defaultSampler || 'DPM++ 2M Karras';
        this.imageWidth = options.imageWidth || 768;
        this.imageHeight = options.imageHeight || 1024;
        this.outputDir = options.outputDir || './generated_images';

        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }

        // Quality presets for different generation needs
        this.QUALITY_PRESETS = {
            'draft': { steps: 20, cfg_scale: 7.0, sampler: 'Euler a' },
            'standard': { steps: 30, cfg_scale: 7.5, sampler: 'DPM++ 2M Karras' },
            'high': { steps: 50, cfg_scale: 8.0, sampler: 'DPM++ SDE Karras' },
            'ultra': { steps: 80, cfg_scale: 9.0, sampler: 'DPM++ 2M Karras' }
        };

        // Stylized tag patterns for AI content classification
        this.AI_TAG_PATTERNS = {
            // Character types
            pup: /pup|puppy|mask|hood|tail|collar/i,
            bear: /bear|daddy|hairy|beard|mature/i,
            leather: /leather|harness|gear|vest|pants/i,
            rubber: /rubber|latex|suit|catsuit/i,

            // Scenarios
            hypno: /hypno|trance|spiral|mind|control|swirl/i,
            kinkscout: /scout|kinkscout|guide|leader/i,
            watersports: /wet|water|shower|steam|golden|piss/i,
            bondage: /bondage|tied|bound|rope|chain/i,
            transformation: /transform|change|become|morph/i,

            // Intensity
            intense: /intense|hardcore|extreme|powerful/i,
            light: /gentle|soft|light|tender|mild/i,

            // Always added
            generated: /./  // All AI content gets #ᴀɪɢᴇɴᴇʀᴀᴛᴇᴅ tag
        };

        // Common negative prompts for quality
        this.DEFAULT_NEGATIVE = 'bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry';
    }

    /**
     * Check if Automatic1111 is available and running
     */
    async checkAutomatic1111Availability() {
        try {
            const response = await fetch(`${this.automatic1111Url}/sdapi/v1/options`);
            if (response.ok) {
                this.log('Automatic1111 WebUI is available', 'SUCCESS');
                return true;
            }
            throw new Error('Automatic1111 not responding');
        } catch (error) {
            this.log(`Automatic1111 not available: ${error.message}`, 'ERROR');
            return false;
        }
    }

    /**
     * Generate image using Automatic1111 API
     */
    async generateImage(prompt, options = {}) {
        const settings = {
            prompt: prompt,
            negative_prompt: options.negative_prompt || this.DEFAULT_NEGATIVE,
            steps: options.steps || this.defaultSteps,
            cfg_scale: options.cfg_scale || this.defaultCfgScale,
            sampler_name: options.sampler || this.defaultSampler,
            width: options.width || this.imageWidth,
            height: options.height || this.imageHeight,
            batch_size: options.batch_size || 1,
            n_iter: options.n_iter || 1,
            seed: options.seed || -1,
            restore_faces: options.restore_faces || true,
            enable_hr: options.enable_hr || false
        };

        this.log(`Generating image with prompt: "${prompt.substring(0, 50)}..."`, 'INFO');

        try {
            const response = await fetch(`${this.automatic1111Url}/sdapi/v1/txt2img`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });

            if (!response.ok) {
                throw new Error(`Generation failed: ${response.statusText}`);
            }

            const result = await response.json();

            if (!result.images || result.images.length === 0) {
                throw new Error('No images generated');
            }

            return result;
        } catch (error) {
            this.log(`Image generation failed: ${error.message}`, 'ERROR');
            throw error;
        }
    }

    /**
     * Save generated image and create metadata
     */
    async saveGeneratedImage(imageData, prompt, metadata = {}) {
        const timestamp = Date.now();
        const filename = `generated_${timestamp}.png`;
        const filepath = path.join(this.outputDir, filename);

        try {
            // Decode base64 image
            const imageBuffer = Buffer.from(imageData, 'base64');

            // Save image file
            fs.writeFileSync(filepath, imageBuffer);

            // Create metadata file
            const metadataFile = path.join(this.outputDir, `generated_${timestamp}_metadata.json`);
            const fullMetadata = {
                filename: filename,
                prompt: prompt,
                timestamp: new Date().toISOString(),
                generation_settings: metadata,
                file_size: imageBuffer.length,
                image_path: filepath
            };

            fs.writeFileSync(metadataFile, JSON.stringify(fullMetadata, null, 2));

            this.log(`Image saved: ${filename} (${(imageBuffer.length / 1024).toFixed(1)}KB)`, 'SUCCESS');

            return {
                filename: filename,
                filepath: filepath,
                metadata: fullMetadata,
                fileSize: `${(imageBuffer.length / 1024).toFixed(1)}KB`
            };

        } catch (error) {
            this.log(`Failed to save image: ${error.message}`, 'ERROR');
            throw error;
        }
    }

    /**
     * Generate stylized tags based on prompt content
     */
    generateStylizedTags(prompt) {
        const tags = [];
        const lowerPrompt = prompt.toLowerCase();

        // Always add AI-generated tag
        tags.push('#ᴀɪɢᴇɴᴇʀᴀᴛᴇᴅ');

        // Check for character patterns
        if (this.AI_TAG_PATTERNS.pup.test(lowerPrompt)) tags.push('#ᴘᴜᴘ');
        if (this.AI_TAG_PATTERNS.bear.test(lowerPrompt)) tags.push('#ʙᴇᴀʀ');
        if (this.AI_TAG_PATTERNS.kinkscout.test(lowerPrompt)) tags.push('#ᴋɪɴᴋꜱᴄᴏᴜᴛ');

        // Check for fetish elements
        if (this.AI_TAG_PATTERNS.leather.test(lowerPrompt)) tags.push('#ʟᴇᴀᴛʜᴇʀ');
        if (this.AI_TAG_PATTERNS.rubber.test(lowerPrompt)) tags.push('#ʀᴜʙʙᴇʀ');
        if (this.AI_TAG_PATTERNS.hypno.test(lowerPrompt)) tags.push('#ʜʏᴘɴᴏ');
        if (this.AI_TAG_PATTERNS.watersports.test(lowerPrompt)) tags.push('#ᴘɪꜱꜱ');
        if (this.AI_TAG_PATTERNS.bondage.test(lowerPrompt)) tags.push('#ʙᴏɴᴅᴀɢᴇ');
        if (this.AI_TAG_PATTERNS.transformation.test(lowerPrompt)) tags.push('#ᴛʀᴀɴꜱғᴏʀᴍᴀᴛɪᴏɴ');

        // Check for intensity
        if (this.AI_TAG_PATTERNS.intense.test(lowerPrompt)) tags.push('#ɪɴᴛᴇɴꜱᴇ');
        if (this.AI_TAG_PATTERNS.light.test(lowerPrompt)) tags.push('#ʟɪɢʜᴛ');

        // Add visual tag for images
        tags.push('#ᴠɪꜱᴜᴀʟ');

        return tags.length > 0 ? tags : ['#ᴀɪɢᴇɴᴇʀᴀᴛᴇᴅ', '#ᴜɴᴄᴀᴛᴇɢᴏʀɪᴢᴇᴅ'];
    }

    /**
     * Process generation request and add to curator queue
     */
    async processGenerationRequest(prompt, options, submittedBy, curatorModule) {
        const generationResult = await this.generateImage(prompt, options);
        const savedImage = await this.saveGeneratedImage(generationResult.images[0], prompt, options);

        // Generate stylized tags
        const styledTags = this.generateStylizedTags(prompt);

        // Create content data for curator workflow
        const contentData = {
            filename: savedImage.filename,
            title: `AI Generated: ${prompt.substring(0, 30)}...`,
            duration: 0, // Images don't have duration
            fileSize: savedImage.fileSize,
            filePath: savedImage.filepath,
            originalUrl: 'ai-generated',
            regularTags: styledTags.map(tag => tag.replace('#', '')),
            styledTags: styledTags,
            description: `AI-generated image using prompt: "${prompt}"`,
            submittedBy: submittedBy,
            submittedAt: new Date(),
            source: 'civitai-ai',
            metadata: savedImage.metadata
        };

        // Add to curator queue
        curatorModule.addToQueue(contentData);

        return {
            success: true,
            image: savedImage,
            tags: styledTags,
            contentData: contentData
        };
    }

    /**
     * Generate KinkScout character variations
     */
    async generateKinkScout(scenario, options = {}) {
        const kinkscoutPrompts = [
            `kinkscout character, ${scenario}, confident masculine pose, leather gear, underground aesthetic, high quality, professional photography`,
            `muscular male scout, ${scenario}, dark lighting, fetish mood, artistic composition, detailed anatomy`,
            `hooded scout leader, ${scenario}, mysterious atmosphere, leather outfit, commanding presence, cinematic lighting`
        ];

        const selectedPrompt = kinkscoutPrompts[Math.floor(Math.random() * kinkscoutPrompts.length)];
        return await this.generateImage(selectedPrompt, options);
    }

    /**
     * Batch generation with progress tracking
     */
    async batchGenerate(prompt, count, options, progressCallback) {
        const results = [];

        for (let i = 0; i < count; i++) {
            try {
                if (progressCallback) {
                    await progressCallback(Math.round((i / count) * 100), `Generating image ${i + 1} of ${count}...`);
                }

                const result = await this.generateImage(prompt, {
                    ...options,
                    seed: -1 // Random seed for variety
                });

                const saved = await this.saveGeneratedImage(result.images[0], prompt, options);
                results.push(saved);

            } catch (error) {
                this.log(`Batch generation ${i + 1} failed: ${error.message}`, 'ERROR');
            }
        }

        if (progressCallback) {
            await progressCallback(100, `Batch generation complete: ${results.length}/${count} images`);
        }

        return results;
    }

    /**
     * Cleanup generated files older than specified days
     */
    async cleanup(maxAgeDays = 7) {
        try {
            const files = fs.readdirSync(this.outputDir);
            const cutoffTime = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);
            let cleanedCount = 0;

            for (const file of files) {
                const filepath = path.join(this.outputDir, file);
                const stats = fs.statSync(filepath);

                if (stats.mtime.getTime() < cutoffTime) {
                    fs.unlinkSync(filepath);
                    cleanedCount++;
                }
            }

            this.log(`Cleanup complete: removed ${cleanedCount} old files`, 'INFO');
            return cleanedCount;

        } catch (error) {
            this.log(`Cleanup failed: ${error.message}`, 'ERROR');
            return 0;
        }
    }

    /**
     * Get available models from Automatic1111
     */
    async getAvailableModels() {
        try {
            const response = await fetch(`${this.automatic1111Url}/sdapi/v1/sd-models`);
            if (response.ok) {
                const models = await response.json();
                return models.map(model => model.title);
            }
            return [];
        } catch (error) {
            this.log(`Failed to get models: ${error.message}`, 'ERROR');
            return [];
        }
    }

    /**
     * Switch to different model
     */
    async switchModel(modelName) {
        try {
            const response = await fetch(`${this.automatic1111Url}/sdapi/v1/options`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sd_model_checkpoint: modelName
                })
            });

            if (response.ok) {
                this.defaultModel = modelName;
                this.log(`Switched to model: ${modelName}`, 'SUCCESS');
                return true;
            }
            return false;
        } catch (error) {
            this.log(`Model switch failed: ${error.message}`, 'ERROR');
            return false;
        }
    }

    log(message, type = 'INFO') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] CIVITAI-${type}: ${message}`);
    }
}

module.exports = { CivitaiIntegration };
