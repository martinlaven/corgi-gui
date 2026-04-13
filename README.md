# Corgi GUI

A self-hosted web interface for decoding Vehicle Identification Numbers (VINs), powered by [cardog-ai/corgi](https://github.com/cardog-ai/corgi) and the NHTSA VPIC database.

![Corgi GUI screenshot](assets/corgi-gui_screenshot.png)

## Features

- Decode any 17-character VIN instantly
- Displays make, model, year, engine, plant, and manufacturer info
- Visual VIN breakdown (WMI / VDS / Check digit / Model year / Plant / VIS)
- Confidence score and processing time per decode
- Fully offline after first run — no external API calls
- VPIC database cached on disk, pre-warmed at build time
- Localized UI — automatically adapts to the browser's language (English, Swedish, German, Italian, Spanish, French, Portuguese, Japanese, Korean, Dutch)

## Quick start

```bash
git clone https://github.com/martinlaven/corgi-gui.git
cd corgi-gui
docker compose up -d
```

Open **http://localhost:3000** (or whichever port you configured).

## Configuration

Edit `docker-compose.yml` to change the port:

```yaml
ports:
  - "3000:3000"   # host:container
```

The VPIC database is cached in a Docker volume (`vpic_cache`) and persists across restarts.

## Project structure

```
corgi-gui/
├── assets/
│   └── corgi-gui_screenshot.png
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prewarm.mjs        # Pre-warms the VPIC database at build time
├── src/
│   └── server.js      # Express API server
└── public/
    └── index.html     # Frontend
```

## API

| Endpoint | Description |
|----------|-------------|
| `GET /api/decode/:vin` | Decode a VIN, returns JSON |
| `GET /api/health` | Health check |

### Example

```bash
curl http://localhost:3000/api/decode/1HGCM82633A123456
```

## Built with

- [corgi](https://github.com/cardog-ai/corgi) — fast offline VIN decoding
- [Express](https://expressjs.com/) — HTTP server
- [Docker](https://www.docker.com/) — containerization
- [Claude](https://claude.ai) (Anthropic) — built with AI assistance

## License

MIT
