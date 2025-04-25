# Jild-AI Backend Deployment

## Docker Setup Guide

### Prerequisites
- Docker installed on your system
- Python 3.10+ (recommended)
- All project dependencies in `requirements.txt`

### Build Commands

Choose either traditional build or BuildX:

#### Traditional Docker Build
```bash
docker build -t jild-ai .
```

#### BuildX (Recommended for cross-platform builds)
```bash
docker buildx build -t jild-ai --load .
```

#### Run Command
```bash
docker run -p 5000:5000 jild-ai
```

#### Production Deployment

For production environments, consider these enhancements:

##### Using Docker Compose

###### Create a docker-compose.yml file:
```yaml
version: '3.8'

services:
  jild-ai:
    build: .
    ports:
      - "5000:5000"
    restart: unless-stopped
    environment:
      - FLASK_ENV=production
```
###### Then Run:
```bash
docker-compose up -d
```


##### With Gunicorn (Production WSGI Server)

###### Update your Dockerfile CMD:
```Dockerfile
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```
