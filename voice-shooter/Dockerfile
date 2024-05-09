FROM node:18.13-alpine

WORKDIR /app

COPY . .

RUN yarn install && yarn build && yarn cache clean

CMD ["yarn", "prod"]
