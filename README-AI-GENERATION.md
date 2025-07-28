# 🎨 Civitai + Automatic1111 AI Integration

## Quick Start

Your Fetish Hypno Hub now includes AI image generation powered by Stable Diffusion through Automatic1111 WebUI.

### Setup Steps

1. **Install Automatic1111 WebUI**:

   ```bash
   git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
   cd stable-diffusion-webui
   ./webui.sh --api --enable-insecure-extension-access
   ```

2. **Install NSFW Models** (see `CIVITAI-INTEGRATION.md` for details):
   - FetishMix v2.1 (recommended for fetish content)
   - RealisticVision v5.1 (photorealistic males)
   - DreamShaper v8 (artistic style)

3. **Test Integration**:

   ```bash
   node test-civitai.js --generate
   ```

### Bot Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/generate [prompt]` | Generate AI images | `/generate muscular pup in leather gear` |
| `/kinkscout [scenario]` | Generate KinkScout character | `/kinkscout underground guide in cave` |
| `/aimodels` | List available models | `/aimodels` |
| `/switchmodel [name]` | Switch AI model | `/switchmodel FetishMix_v2.1` |

### Stylized Tags

AI-generated content automatically receives stylized tags:

- **Characters**: `#ᴘᴜᴘ` `#ʙᴇᴀʀ` `#ᴋɪɴᴋꜱᴄᴏᴜᴛ`
- **Materials**: `#ʟᴇᴀᴛʜᴇʀ` `#ʀᴜʙʙᴇʀ`
- **Scenarios**: `#ʜʏᴘɴᴏ` `#ʙᴏɴᴅᴀɢᴇ` `#ᴘɪꜱꜱ` `#ᴛʀᴀɴꜱғᴏʀᴍᴀᴛɪᴏɴ`
- **Always Added**: `#ᴀɪɢᴇɴᴇʀᴀᴛᴇᴅ` `#ᴠɪꜱᴜᴀʟ`

### Workflow Integration

1. **User generates content** with `/generate` or `/kinkscout`
2. **AI creates image** using Stable Diffusion
3. **Auto-tagging** applies stylized tags based on prompt
4. **Curator queue** receives content for approval
5. **Distribution** to channels after curator approval

### Configuration

Edit `.env.ai` for custom settings:

```bash
AUTOMATIC1111_URL=http://localhost:7860
AI_DEFAULT_MODEL=FetishMix_v2.1
AI_DEFAULT_STEPS=30
AI_IMAGE_WIDTH=768
AI_IMAGE_HEIGHT=1024
```

### Hardware Requirements

- **Minimum**: GTX 1060 6GB, 8GB RAM
- **Recommended**: RTX 3070+ 8GB, 16GB RAM
- **Optimal**: RTX 4090 24GB, 32GB RAM

### Troubleshooting

**"AI Generation Unavailable"**:

- Check if Automatic1111 WebUI is running
- Verify `--api` flag is enabled
- Test with: `curl http://localhost:7860/sdapi/v1/options`

**Generation fails**:

- Check GPU memory usage
- Reduce image dimensions or steps
- Switch to lighter model

**No models available**:

- Download models to `stable-diffusion-webui/models/Stable-diffusion/`
- Restart WebUI after adding models

### Example Prompts

**Pup Play**:

```
muscular male in pup gear, leather mask, tail plug, collar, underground dungeon, dramatic lighting, high quality, professional photography
```

**Bear Scene**:

```
hairy bear daddy, leather harness, confident pose, dark atmosphere, masculine energy, detailed anatomy, artistic composition
```

**Hypno Content**:

```
hypnotic swirls, mind control spirals, trance state, mystical energy, purple and blue lighting, surreal atmosphere
```

**KinkScout Character**:

```
scout leader in leather gear, underground guide, mysterious hooded figure, torch lighting, cave setting, commanding presence
```

### Security Notes

- AI generation runs locally (no external API calls)
- Images stored in `./generated_images/`
- Metadata includes generation settings
- Auto-cleanup after 7 days (configurable)

### File Structure

```
generated_images/
├── generated_1234567890.png        # Generated image
├── generated_1234567890_metadata.json  # Generation metadata
└── ...
```

---

**🎭 Ready to create mystical AI content for your Fetish Hypno Hub!**
