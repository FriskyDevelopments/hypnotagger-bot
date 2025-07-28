# 🚂 Railway Deployment Guide

## Environment Variables in Railway

Set these in your Railway dashboard:

```bash
BOT_TOKEN=your_bot_token_here
CHAT_ID=your_chat_id_here
NODE_ENV=production
MAX_FILE_SIZE_MB=50
MAX_DURATION_SECONDS=1800
LOG_LEVEL=info
```

## Railway-Specific Optimizations

### Memory Management

- Free tier: 512MB RAM
- Set NODE_OPTIONS=--max-old-space-size=512
- Clean up temporary files aggressively

### Storage Optimization  

- Use /tmp for temporary files
- Railway provides ephemeral storage
- Clean up after each video processing

### Processing Speed

- Limit video duration for free tier
- Use efficient yt-dlp options
- Implement timeouts for long downloads

## Scaling on Railway

### Free Tier (Good for testing)

- MAX_FILE_SIZE_MB=50
- MAX_DURATION_SECONDS=1800 (30 min)
- Basic video processing

### Developer Tier ($5/month)

- MAX_FILE_SIZE_MB=50 (Telegram limit)
- MAX_DURATION_SECONDS=3600 (60 min)
- Better performance, more concurrent users

### Team Tier ($20/month)  

- MAX_FILE_SIZE_MB=50 (still Telegram limited)
- MAX_DURATION_SECONDS=7200 (120 min)
- High availability, multiple regions

## The Reality

50MB is actually the sweet spot because:

- Telegram won't accept larger uploads
- Most videos under 50MB are reasonable length
- Railway free tier handles this perfectly
- Processing is fast and efficient

## Want Larger Videos?

Consider these approaches:

- Use Railway PostgreSQL to store metadata
- Implement video compression  
- Split long videos into segments
- Use external storage (S3, CloudFlare R2)

```
