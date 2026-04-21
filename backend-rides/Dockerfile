FROM node:18-alpine

WORKDIR /app

# NEW: Create a home for npm and give it permissions
RUN mkdir -p /root/.npm && chmod -R 777 /root/.npm

COPY package*.json ./

# NEW: Run install with a flag to ignore log errors
RUN npm install --loglevel=error

COPY . .

EXPOSE 3000
CMD ["npm", "start"]