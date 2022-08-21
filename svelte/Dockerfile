FROM node:18-slim

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --global yarn
RUN yarn install
COPY . .
RUN yarn run build
RUN rm -rf node_modules
RUN npm install forever -g

EXPOSE 3000
