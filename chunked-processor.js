/**
 * 🎭 Enhanced Video Processing with Chunking Support
 * Handles videos larger than 50MB by splitting into chunks
 */

const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class ChunkedVideoProcessor {
    constructor(options = {}) {
        this.maxChunkSize = options.maxChunkSize || 40; // MB - more aggressive for 65MB files
        this.maxTotalSize = options.maxTotalSize || 500; // MB - total video limit
        this.tempDir = options.tempDir || '/tmp';
        this.ffmpegPath = options.ffmpegPath || 'ffmpeg';
        this.combineChunks = options.combineChunks !== false; // Default to true - always combine
    }

    /**
     * Process large video by chunking
     */
    async processLargeVideo(url, bot, chatId, classifyFunction) {
        const timestamp = Date.now();
        const tempJson = `${this.tempDir}/video_${timestamp}.json`;
        let chunks = [];
        let combinedVideo = null;

        try {
            // 1. Extract metadata first
            await this.extractMetadata(url, tempJson);
            const metadata = JSON.parse(fs.readFileSync(tempJson, 'utf8'));

            const title = metadata.title || 'Untitled';
            const duration = metadata.duration || 0;
            const filesize = metadata.filesize || metadata.filesize_approx || 0;
            const fileSizeMB = filesize / (1024 * 1024);

            console.log(`📊 Video analysis: "${title}" - ${fileSizeMB.toFixed(1)}MB, ${duration}s`);

            // 2. Enhanced size estimation for unknown file sizes
            let effectiveSize = fileSizeMB;
            if (fileSizeMB <= 0 && duration > 0) {
                // More accurate estimation: 2MB per minute for decent quality
                effectiveSize = (duration / 60) * 2;
                console.log(`📐 Estimated size: ${effectiveSize.toFixed(1)}MB based on ${duration}s duration`);
            }

            // 3. Check if chunking is needed - catch 65.3MB files
            if (effectiveSize <= this.maxChunkSize && fileSizeMB > 0) {
                return await this.processSingleVideo(url, bot, chatId, classifyFunction);
            }

            if (fileSizeMB > this.maxTotalSize) {
                throw new Error(`Video too large: ${fileSizeMB.toFixed(1)}MB (max: ${this.maxTotalSize}MB)`);
            }

            // 3. Calculate chunk parameters
            const chunkCount = Math.ceil(fileSizeMB / this.maxChunkSize);
            const chunkDuration = Math.floor(duration / chunkCount);

            bot.sendMessage(chatId, `🌀 *Large video detected!* Breaking into ${chunkCount} mystical segments...`, { parse_mode: 'Markdown' });

            // 4. Download and process chunks
            chunks = await this.downloadChunks(url, title, duration, chunkCount, chunkDuration, bot, chatId);

            // 5. Classify the video content
            const contentText = `${title} ${metadata.description || ''}`;
            const tagResult = await classifyFunction(contentText, false);
            const tags = tagResult.tags;

            // 6. Combine chunks back into full video
            bot.sendMessage(chatId, `🔮 *Mystical reconstruction ritual beginning...* Merging ${chunkCount} segments into one enchanted video...`, { parse_mode: 'Markdown' });

            const combinedFilename = `${this.tempDir}/${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_combined_${timestamp}.mp4`;
            combinedVideo = await this.combineChunks(chunks, combinedFilename);

            // 7. Upload the combined video
            await this.uploadCombinedVideo(combinedVideo, title, tags, duration, bot, chatId);

            bot.sendMessage(chatId, `✨ *Hypnotic transformation complete!* Your full video has been reconstructed and enchanted!`, { parse_mode: 'Markdown' });

        } catch (error) {
            console.error('Chunked processing error:', error);

            // Send user-friendly error message
            const errorMessages = [
                '🌀 *The chunking spell encountered resistance...* The video may be too complex to process.',
                '✨ *Mystical energies were insufficient...* This content requires special handling.',
                '🎭 *The segmentation ritual failed...* Perhaps try a different source or format.',
                '💫 *Chunking magic disrupted...* The digital realm rejected this particular enchantment.',
                '🔮 *Advanced processing blocked...* Some videos resist our mystical techniques.'
            ];

            bot.sendMessage(chatId, errorMessages[Math.floor(Math.random() * errorMessages.length)], { parse_mode: 'Markdown' });
            throw error;
        } finally {
            // Cleanup all temporary files
            this.cleanup([tempJson, combinedVideo, ...chunks]);
        }
    }

    /**
     * Extract video metadata using yt-dlp
     */
    async extractMetadata(url, outputFile) {
        const command = `yt-dlp -j "${url}" > "${outputFile}"`;
        await execAsync(command);
    }

    /**
     * Download video in chunks
     */
    async downloadChunks(url, title, totalDuration, chunkCount, chunkDuration, bot, chatId) {
        const chunks = [];
        const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

        for (let i = 0; i < chunkCount; i++) {
            const startTime = i * chunkDuration;
            const endTime = i === chunkCount - 1 ? totalDuration : (i + 1) * chunkDuration;
            const chunkFilename = `${this.tempDir}/${safeTitle}_part${i + 1}_${Date.now()}.mp4`;

            try {
                // Progress message
                bot.sendMessage(chatId, `📥 *Downloading segment ${i + 1}/${chunkCount}*... (${this.formatTime(startTime)} - ${this.formatTime(endTime)})`, { parse_mode: 'Markdown' });

                // Download specific time segment
                const command = `yt-dlp -f best --external-downloader ffmpeg --external-downloader-args "ffmpeg:-ss ${startTime} -t ${chunkDuration}" -o "${chunkFilename}" "${url}"`;

                await execAsync(command);

                // Verify chunk was created and has reasonable size
                if (fs.existsSync(chunkFilename)) {
                    const stats = fs.statSync(chunkFilename);
                    const sizeMB = stats.size / (1024 * 1024);

                    if (sizeMB > 0.1) { // At least 100KB
                        chunks.push({
                            filename: chunkFilename,
                            part: i + 1,
                            startTime,
                            endTime,
                            sizeMB: sizeMB.toFixed(1)
                        });
                    }
                }

            } catch (error) {
                console.warn(`Failed to download chunk ${i + 1}:`, error.message);
                // Continue with other chunks
            }
        }

        if (chunks.length === 0) {
            throw new Error('No chunks were successfully downloaded');
        }

        return chunks;
    }

    /**
     * Upload chunks to Telegram
     */
    async uploadChunks(chunks, title, tags, totalDuration, totalChunks, bot, chatId) {
        for (const chunk of chunks) {
            try {
                const caption = `🎬 *${title}* \\- Part ${chunk.part}/${totalChunks}
⏱️ *Segment:* ${this.formatTime(chunk.startTime)} \\- ${this.formatTime(chunk.endTime)}
📦 *Size:* ${chunk.sizeMB}MB
🏷️ ${tags.map(t => '#' + t).join(' ')}

✨ *Mystical segment ${chunk.part} of ${totalChunks}*`;

                bot.sendMessage(chatId, `📤 *Uploading mystical segment ${chunk.part}/${totalChunks}*... (${chunk.sizeMB}MB)`, { parse_mode: 'Markdown' });

                await bot.sendVideo(chatId, fs.createReadStream(chunk.filename), {
                    caption,
                    parse_mode: 'MarkdownV2',
                    supports_streaming: true
                });

                console.log(`Uploaded chunk ${chunk.part}/${totalChunks}`);

            } catch (error) {
                console.error(`Failed to upload chunk ${chunk.part}:`, error);
                // Continue with other chunks
            }
        }
    }

    /**
     * Upload combined video to Telegram
     */
    async uploadCombinedVideo(combinedFilename, title, tags, totalDuration, bot, chatId) {
        try {
            const stats = fs.statSync(combinedFilename);
            const sizeMB = stats.size / (1024 * 1024);

            const caption = `🎬 *${title}* \\- Complete Video
⏱️ *Duration:* ${this.formatTime(totalDuration)}
📦 *Size:* ${sizeMB.toFixed(1)}MB \\(Reconstructed from chunks\\)
🏷️ ${tags.map(t => '#' + t).join(' ')}

✨ *Mystically reconstructed full video*`;

            bot.sendMessage(chatId, `📤 *Uploading reconstructed masterpiece*... (${sizeMB.toFixed(1)}MB)`, { parse_mode: 'Markdown' });

            await bot.sendVideo(chatId, fs.createReadStream(combinedFilename), {
                caption,
                parse_mode: 'MarkdownV2',
                supports_streaming: true
            });

            console.log(`Uploaded combined video: ${combinedFilename} (${sizeMB.toFixed(1)}MB)`);

        } catch (error) {
            console.error(`Failed to upload combined video:`, error);
            throw error;
        }
    }

    /**
     * Process single video (under chunk size limit)
     */
    async processSingleVideo(url, bot, chatId, _classifyFunction) {
        // Use existing single video processing logic
        // This would be the original video processing code
        bot.sendMessage(chatId, '🌟 *Perfect size detected!* Processing as single mystical entity...', { parse_mode: 'Markdown' });
        // ... existing processing logic
    }

    /**
     * Format seconds to MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Cleanup temporary files
     */
    cleanup(files) {
        files.forEach(file => {
            if (file && fs.existsSync(file)) {
                try {
                    fs.unlinkSync(file);
                    console.log(`Cleaned up: ${file}`);
                } catch (error) {
                    console.warn(`Cleanup failed for ${file}:`, error.message);
                }
            }
        });
    }

    /**
     * Alternative: Create combined video file (if needed)
     */
    async combineChunks(chunks, outputFilename) {
        if (chunks.length <= 1) return chunks[0]?.filename;

        try {
            // Create file list for ffmpeg
            const fileList = `${this.tempDir}/filelist_${Date.now()}.txt`;
            const fileContent = chunks.map(chunk => `file '${chunk.filename}'`).join('\n');
            fs.writeFileSync(fileList, fileContent);

            // Combine using ffmpeg
            const command = `${this.ffmpegPath} -f concat -safe 0 -i "${fileList}" -c copy "${outputFilename}"`;
            await execAsync(command);

            // Cleanup file list
            fs.unlinkSync(fileList);

            return outputFilename;
        } catch (error) {
            console.error('Failed to combine chunks:', error);
            throw error;
        }
    }
}

module.exports = { ChunkedVideoProcessor };
