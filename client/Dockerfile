FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 3000

# Uruchamiamy aplikację (npm run dev) na końcu
CMD ["npm", "run", "dev"]
