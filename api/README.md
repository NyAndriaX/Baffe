# Upvoice API

## Environment installation

## Tools

- **Vscode**: IDE for js projects

  - <https://code.visualstudio.com/download>
  - On windows: add [WSL extension](<https://code.visualstudio.com/docs/remote/wsl>)
- **NVM**: [node version manager](https://github.com/nvm-sh/nvm)
- **Node v18.x**
  - Tested with v18.13.0 / v18.17.0
- **Yarn v1**

### Node modules

Create file .env and copy the content in .env.example

```bash
cp .env.example .env
```

Change environment variable to connect in your local
DATABASE_URL put your connection string in the variable

Go to root of repository and type

```bash
yarn
```

## Structure prisma

To add paths to your `*.prisma` files for `inputs`, and define the `output` file, like follows:

```json
{
  "app": {
    "inputs": [
      "./dto/core/prisma/base.prisma",
      "./dto/user/prisma/user.prisma",
      "./dto/article/prisma/article.prisma"
    ],
    "output": "./prisma/schema.prisma"
  }
}
```

After you must executing

```bash
yarn prismerge
```

will read all `*.prisma` files defined in `inputs` and merges them into one single `schema.prisma` file that can be read and processed by `Prisma`.

## Run

````bash
yarn prisma:generate
````

Run Node.js

```bash
yarn start:dev (development)

yarn start:build (production)
```

## Testing

launch this command to run test with Jest

```shell
yarn test
```

## SWAGGER

Open this url to show swagger documentation ui

```text
http://localhost:1789/api-docs
```

## KAFKA

Run docker compose to install Kafka

docker-compose up -d

in the folder src/utils/ have two files for consumer and producer for Kafka ( kafkaConsumer / kafkaProducer)

In the folder config have file config kafka

The libraries use for manipulate kafka is KafkaJs
