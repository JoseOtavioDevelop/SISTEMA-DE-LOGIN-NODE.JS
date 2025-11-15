FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Copie o restante do código
COPY . .

# Evita bug de nodemon sumir com o volume
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run", "dev"]
