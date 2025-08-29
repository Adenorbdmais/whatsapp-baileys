FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]

