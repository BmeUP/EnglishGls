# prod
FROM node:14.18.1-alpine as build
WORKDIR /app/front-end
COPY package.json /app/front-end
COPY yarn.lock /app/front-end
COPY src /app/front-end/src
COPY public /app/front-end/public
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/front-end/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
