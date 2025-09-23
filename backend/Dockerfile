FROM node:20-bookworm
WORKDIR /app
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
USER root
RUN npm ci --include=dev || npm install
COPY . .
USER node
CMD ["npm","run","dev"]

