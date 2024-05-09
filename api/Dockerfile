FROM node:18.17-alpine

WORKDIR /app

COPY . .

RUN yarn install && yarn prisma:generate && yarn build && yarn cache clean

CMD ["yarn", "start:prod"]
