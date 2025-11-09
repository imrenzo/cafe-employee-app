FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ensure uploads folder exists
RUN mkdir -p /app/uploads

EXPOSE 3000
CMD ["node", "src/app.js"]