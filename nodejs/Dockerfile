# syntax=docker/dockerfile:1

FROM node:19.2-slim
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install

COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]