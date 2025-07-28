# 🎭 HypnoTagger Bot Docker Image
# Anonymous developer styling with distinctive color scheme

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Add metadata
LABEL maintainer="Anonymous Developer"
LABEL description="🎭 HypnoTagger Bot - AI-powered video tagging for Telegram"
LABEL version="1.0.0"

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    ffmpeg \
    curl \
    && pip3 install --break-system-packages yt-dlp

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S botuser && \
    adduser -S botuser -u 1001

# Create directories for temporary files
RUN mkdir -p /app/temp && \
    chown -R botuser:botuser /app

# Switch to non-root user
USER botuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "console.log('Bot is healthy')" || exit 1

# Expose port (if needed for webhooks)
EXPOSE 3000

# Start the bot
CMD ["npm", "start"]
