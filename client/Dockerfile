FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 8000

CMD ["npm", "run", "dev", "--host"]
