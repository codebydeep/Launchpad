#!/bin/bash
set -euo pipefail

sudo dnf update -y
sudo dnf install -y docker

sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user

COMPOSE_VERSION="v2.27.1"
COMPOSE_DIR="/usr/local/lib/docker/cli-plugins"
sudo mkdir -p "$COMPOSE_DIR"

sudo curl -fsSL \
  "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-x86_64" \
  -o "${COMPOSE_DIR}/docker-compose"

sudo chmod +x "${COMPOSE_DIR}/docker-compose"

sudo mkdir -p /opt/launchpad

cat <<'EOF' | sudo tee /opt/launchpad/docker-compose.yml > /dev/null
services:
  frontend:
    image: 3453458134/app-frontend:latest
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - my-net

  backend:
    image: 3453458134/app-backend:latest
    ports:
      - "5000:4000"
    depends_on:
      - mongo
    networks:
      - my-net

  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db
    networks:
      - my-net

volumes:
  mongo-data:

networks:
  my-net:
EOF

cd /opt/launchpad
sudo docker compose pull
sudo docker compose up -d
