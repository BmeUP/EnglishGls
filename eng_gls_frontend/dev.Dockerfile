# dev
FROM node:12.18.1 as build
WORKDIR /app/front-end
COPY package.json /app/front-end
COPY yarn.lock /app/front-end
COPY src /app/front-end/src
COPY public /app/front-end/public
RUN npm i