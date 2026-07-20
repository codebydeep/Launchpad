#!/bin/bash
set -euo pipefail

# ── Logging ───────────────────────────────────────────────────────────────────
exec > >(tee /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1
echo ">>> Starting Launchpad deployment: $(date)"

# ── System update + Docker install ────────────────────────────────────────────
dnf update -y
dnf install -y docker

# Enable and start Docker
systemctl enable docker
systemctl start docker

# Add ec2-user to docker group (takes effect on next login, not needed for this script)
usermod -aG docker ec2-user

# ── Docker Compose CLI plugin (v2) ────────────────────────────────────────────
COMPOSE_VERSION="v2.27.1"
COMPOSE_DIR="/usr/local/lib/docker/cli-plugins"
mkdir -p "$COMPOSE_DIR"

curl -fsSL \
  "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-x86_64" \
  -o "${COMPOSE_DIR}/docker-compose"

chmod +x "${COMPOSE_DIR}/docker-compose"

# Verify
docker compose version

# ── App directory + docker-compose.yml ────────────────────────────────────────
APP_DIR="/opt/launchpad"
mkdir -p "$APP_DIR"

cat > "${APP_DIR}/docker-compose.yml" <<'EOF'
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

# ── Pull images and start containers ──────────────────────────────────────────
cd "$APP_DIR"

docker compose pull
docker compose up -d

echo ">>> Launchpad deployment complete: $(date)"
