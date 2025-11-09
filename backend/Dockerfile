FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ensure uploads folder exists
RUN mkdir -p /app/src/uploads

# Change working directory to src for running the app
WORKDIR /app/src

EXPOSE 3000
CMD ["node", "app.js"]