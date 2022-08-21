FROM node:18-slim

WORKDIR /app
COPY package.json ./
RUN npm install yarn -g
RUN yarn install
COPY . .
RUN yarn run build
RUN rm -rf node_modules src
RUN npm install forever -g

EXPOSE 3000
