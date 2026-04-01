# Salvage-First Technical Audit (Prototype)

This document captures a salvage-first audit of the repository as an unfinished prototype and identifies what to preserve for ClipsFlow.

## Executive Summary

- The repo is an unfinished but partially functional Telegram ingestion + tagging bot prototype.
- The reusable DNA is strongest in:
  1) ingestion orchestration (`index.js`),
  2) heuristic tagging (`tagger.js`),
  3) progress UX state handling (`progress-manager.js`),
  4) large-file handling patterns (`chunked-processor.js`).
- The repo has major health issues: unresolved merge conflicts (`README.md`), dead/broken entrypoint (`index-corrupted.js`), and leaked real bot credentials in multiple docs/scripts.
- Immediate actions: rotate/revoke all exposed tokens, scrub them from git history, and remove them from any committed docs/scripts before further development or sharing.
- This should be transformed into internal services, not shipped as-is.

## Keep / Archive Snapshot

### KEEP / CORE
- `index.js`
- `tagger.js`
- `progress-manager.js`
- `chunked-processor.js`
- parts of `curator-module.js` as workflow reference

### KEEP / REFERENCE
- `classify.js`
- deployment files (`Dockerfile`, `docker-compose.yml`, `railway.json`) as baseline templates
- setup and integration docs as historical context only

### ARCHIVE
- `index-corrupted.js`
- `index-new.js` (empty placeholder)
- one-off debug and setup scripts that duplicate functionality

### RISK
- leaked tokens / IDs in `IPHONE-QUICKSTART.md`, `IOS-DEVELOPMENT-GUIDE.md`, `railway-manual-deploy.sh`
- unresolved merge conflict markers in `README.md`
- shell command composition patterns that can become unsafe when reused
