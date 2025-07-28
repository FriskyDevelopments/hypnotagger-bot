/**
 * 🎭 Fansly Integration Module for HypnoTagger Bot
 * Integrates Fansly downloader capabilities with mystical video processing
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const execAsync = promisify(exec);

class FanslyIntegration {
    constructor(options = {}) {
        this.pythonPath = options.pythonPath || 'python3';
        this.fanslyDownloaderPath = options.fanslyDownloaderPath || './fansly_downloader.py';
        this.tempDir = options.tempDir || '/tmp';
        this.configPath = options.configPath || './config.ini';
        this.outputDir = options.outputDir || './downloads';
    }

    /**
     * Check if Fansly downloader is available and properly configured
     */
    async checkFanslyAvailability() {
        try {
            // Check if Python is available
            await execAsync(`${this.pythonPath} --version`);

            // Check if fansly downloader file exists
            if (!fs.existsSync(this.fanslyDownloaderPath)) {
                throw new Error('Fansly downloader not found. Please install it first.');
            }

            // Check if config file exists and has valid token
            if (!fs.existsSync(this.configPath)) {
                throw new Error('Config.ini not found. Please set up Fansly downloader first.');
            }

            return true;
        } catch (error) {
            console.log('Fansly integration not available:', error.message);
            return false;
        }
    }

    /**
     * Detect if URL is a Fansly URL
     */
    isFanslyUrl(url) {
        const fanslyPatterns = [
            /fansly\.com/i,
            /fansly/i
        ];

        return fanslyPatterns.some(pattern => pattern.test(url));
    }

    /**
     * Extract Fansly post ID from URL
     */
    extractPostId(url) {
        const patterns = [
            /fansly\.com\/post\/(\d+)/i,
            /\/post\/(\d+)/i,
            /postId[=:](\d+)/i
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }

        return null;
    }

    /**
     * Download Fansly content using the Python downloader
     */
    async downloadFanslyContent(url, bot, chatId, progressCallback) {
        const postId = this.extractPostId(url);

        if (!postId) {
            throw new Error('Could not extract post ID from Fansly URL');
        }

        const timestamp = Date.now();
        const outputPath = path.join(this.tempDir, `fansly_${timestamp}`);

        try {
            // Ensure output directory exists
            if (!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath, { recursive: true });
            }

            if (progressCallback) {
                await progressCallback(10, 'Invoking Fansly mystical downloader...');
            }

            // Update config.ini for single post download
            await this.updateConfigForSinglePost(postId);

            if (progressCallback) {
                await progressCallback(25, 'Channeling Fansly energies...');
            }

            // Execute Fansly downloader in single post mode
            const command = `cd "${path.dirname(this.fanslyDownloaderPath)}" && ${this.pythonPath} fansly_downloader.py`;

            const { stdout, stderr } = await execAsync(command, {
                timeout: 300000, // 5 minutes timeout
                cwd: path.dirname(this.fanslyDownloaderPath)
            });

            if (progressCallback) {
                await progressCallback(70, 'Extracting downloaded mystical content...');
            }

            // Find downloaded files
            const downloadedFiles = await this.findDownloadedFiles(outputPath);

            if (downloadedFiles.length === 0) {
                throw new Error('No files were downloaded from Fansly');
            }

            if (progressCallback) {
                await progressCallback(85, 'Preparing mystical media for classification...');
            }

            return downloadedFiles;

        } catch (error) {
            console.error('Fansly download error:', error);
            throw new Error(`Fansly download failed: ${error.message}`);
        }
    }

    /**
     * Update config.ini to download specific post
     */
    async updateConfigForSinglePost(postId) {
        try {
            let configContent = fs.readFileSync(this.configPath, 'utf8');

            // Update download mode to Single
            configContent = configContent.replace(
                /download_mode\s*=.*/i,
                'download_mode = Single'
            );

            fs.writeFileSync(this.configPath, configContent);

            // Note: The actual post ID will be entered interactively by the Python script
            console.log(`Updated config for single post download: ${postId}`);

        } catch (error) {
            console.error('Failed to update config:', error);
            throw error;
        }
    }

    /**
     * Find downloaded files in the output directory
     */
    async findDownloadedFiles(baseDir) {
        const files = [];

        if (!fs.existsSync(baseDir)) {
            return files;
        }

        const scanDirectory = (dir) => {
            const items = fs.readdirSync(dir);

            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else if (this.isMediaFile(item)) {
                    files.push(fullPath);
                }
            }
        };

        scanDirectory(baseDir);
        return files;
    }

    /**
     * Check if file is a media file
     */
    isMediaFile(filename) {
        const mediaExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const ext = path.extname(filename).toLowerCase();
        return mediaExtensions.includes(ext);
    }

    /**
     * Process downloaded Fansly files for HypnoTagger
     */
    async processFanslyFiles(files, bot, chatId, classifyFunction) {
        const processedFiles = [];

        for (const filePath of files) {
            try {
                const filename = path.basename(filePath);
                const ext = path.extname(filename).toLowerCase();

                // Get file stats
                const stats = fs.statSync(filePath);
                const sizeMB = stats.size / (1024 * 1024);

                if (['.mp4', '.mov', '.avi', '.mkv', '.webm'].includes(ext)) {
                    // Process video file
                    const videoInfo = {
                        path: filePath,
                        filename: filename,
                        size: sizeMB,
                        type: 'video'
                    };

                    // Classify video content (extract from filename/metadata)
                    const contentText = this.extractContentFromFilename(filename);
                    const tagResult = await classifyFunction(contentText, false);

                    videoInfo.tags = tagResult.tags;
                    videoInfo.classification = tagResult;

                    processedFiles.push(videoInfo);

                } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
                    // Process image file
                    const imageInfo = {
                        path: filePath,
                        filename: filename,
                        size: sizeMB,
                        type: 'image'
                    };

                    // Classify image content
                    const contentText = this.extractContentFromFilename(filename);
                    const tagResult = await classifyFunction(contentText, false);

                    imageInfo.tags = tagResult.tags;
                    imageInfo.classification = tagResult;

                    processedFiles.push(imageInfo);
                }

            } catch (error) {
                console.error(`Failed to process file ${filePath}:`, error);
            }
        }

        return processedFiles;
    }

    /**
     * Extract content information from Fansly filename
     */
    extractContentFromFilename(filename) {
        // Fansly files typically have timestamp and ID in filename
        // Extract useful content for classification
        const base = path.basename(filename, path.extname(filename));

        // Remove timestamp and ID patterns to get content description
        let content = base
            .replace(/^\d+_/, '') // Remove timestamp prefix
            .replace(/_id_\d+$/, '') // Remove ID suffix
            .replace(/_preview$/, '') // Remove preview suffix
            .replace(/_hash_[a-f0-9]+$/, '') // Remove hash suffix
            .replace(/_/g, ' '); // Replace underscores with spaces

        return content || 'fansly content';
    }

    /**
     * Upload processed Fansly files to Telegram
     */
    async uploadFanslyFiles(processedFiles, bot, chatId) {
        for (const fileInfo of processedFiles) {
            try {
                const caption = this.createFanslyCaption(fileInfo);

                if (fileInfo.type === 'video') {
                    await bot.sendVideo(chatId, fs.createReadStream(fileInfo.path), {
                        caption,
                        parse_mode: 'Markdown',
                        supports_streaming: true
                    });
                } else if (fileInfo.type === 'image') {
                    await bot.sendPhoto(chatId, fs.createReadStream(fileInfo.path), {
                        caption,
                        parse_mode: 'Markdown'
                    });
                }

                console.log(`Uploaded Fansly ${fileInfo.type}: ${fileInfo.filename}`);

            } catch (error) {
                console.error(`Failed to upload ${fileInfo.filename}:`, error);
            }
        }
    }

    /**
     * Create mystical caption for Fansly content
     */
    createFanslyCaption(fileInfo) {
        const mysticalEmojis = ['🔮', '✨', '🌟', '💫', '🎭', '🌙', '⚡', '🌀'];
        const randomEmoji = mysticalEmojis[Math.floor(Math.random() * mysticalEmojis.length)];

        return `${randomEmoji} *Fansly Content Enchanted*
📁 ${fileInfo.filename}
📦 Size: ${fileInfo.size.toFixed(1)}MB
🏷️ ${fileInfo.tags.map(t => '#' + t).join(' ')}

✨ *Downloaded from the mystical Fansly realm*`;
    }

    /**
     * Cleanup downloaded files
     */
    async cleanup(files) {
        for (const filePath of files) {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`Cleaned up: ${filePath}`);
                }
            } catch (error) {
                console.warn(`Cleanup failed for ${filePath}:`, error.message);
            }
        }
    }

    /**
     * Install Fansly downloader dependencies
     */
    async installFanslyDependencies() {
        const requirements = [
            'requests',
            'loguru',
            'python-dateutil',
            'plyvel-ci',
            'psutil',
            'imagehash',
            'm3u8',
            'av',
            'pillow',
            'rich',
            'pyexiv2',
            'mutagen'
        ];

        try {
            const command = `${this.pythonPath} -m pip install ${requirements.join(' ')}`;
            await execAsync(command);
            console.log('Fansly dependencies installed successfully');
            return true;
        } catch (error) {
            console.error('Failed to install Fansly dependencies:', error);
            return false;
        }
    }
}

module.exports = { FanslyIntegration };
