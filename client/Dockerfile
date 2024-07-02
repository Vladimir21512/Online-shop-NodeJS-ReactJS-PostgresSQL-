FROM node:18.16.1-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install --force

COPY . .

EXPOSE 5000

CMD ["npm", "start"]