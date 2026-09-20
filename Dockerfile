FROM mcr.microsoft.com/playwright:v1.62.1-noble

WORKDIR /app

# Native build tools required by better-sqlite3
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       python3 \
       make \
       g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=test
ENV LLM_PROVIDER=demo

RUN npm run typecheck

EXPOSE 3000

CMD ["npm", "run", "api"]