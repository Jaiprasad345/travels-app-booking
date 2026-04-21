FROM node:18-alpine

# Use a clean, non-root user
USER node
WORKDIR /home/node/app

# Copy files with correct ownership
COPY --chown=node:node package*.json ./

# Install with flags that ignore Windows/WSL permission glitches
RUN npm install --network-timeout=100000 --loglevel=notice

COPY --chown=node:node . .

EXPOSE 3000
CMD ["npm", "start"]