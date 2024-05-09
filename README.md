# upvoice-main

## Introduction

The goal of this project is to automate the notification of users by voice caller, if there is a case of cart abandonment triggered example.

## Project architecture

We have 3 projects:

1) ```Shopify App (shopify-app)``` : It's project, this for the creation of shopify app. To set up the campaign setting for triggering a shoot.
2) ```Api (api)``` : This project is responsible for dealing with all the trades and logic that connects through the Shopify application
3) ```Voice shooter (voice-shooter)```: This is a project, responsible only for sending the shoot. He communicates with the api project by Kafka

## Tech Stack

1) ```Shopify App (shopify-app)``` : Node.js / Express.js / Typescript / Prisma / MongoDB
2) ```Api (api)``` : Node.js / Express.js / JavaScript / React.js / JSX
3) ```Voice shooter (voice-shooter)```: Node.js / Express.js / Typescript / Kafka

## Coding styles

- ES6 (Import, let, const, ....)
- Prettier ( code formatting )
- Eslint

### Requirements

- Node.js
- Yarn , to install ```npm i -g yarn```
