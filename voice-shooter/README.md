# Boilerplate starter template

# Environment installation

## Tools

- **Vscode**: IDE for js projects

  - https://code.visualstudio.com/download
  - On windows: add WSL extension (https://code.visualstudio.com/docs/remote/wsl)

- **NVM**: node version manager

  - https://github.com/nvm-sh/nvm

- **Node**:
  - `nvm install 16.14.2`
- **Yarn**:
  - `npm i -g yarn`

### Node modules

Create file .env and copy the content in .env.example

```
cp .env.example .env
```

Change environment variable to connect in your local
DATABASE_URL put your connection string in the variable

Go to root of repository and type

```
yarn
```

Run Node.js

```
yarn run dev (development)

yarn run build (production)
```

## Structure prisma

To add paths to your `*.prisma` files for `inputs`, and define the `output` file, like follows:

```json
{
  "app": {
    "inputs": [
      "./libs/core/prisma/base.prisma",
      "./libs/user/prisma/user.prisma",
      "./libs/article/prisma/article.prisma"
    ],
    "output": "./prisma/schema.prisma"
  }
}
```

After you must executing

```bash
npx prismerge
```

will read all `*.prisma` files defined in `inputs` and merges them into one single `schema.prisma` file that can be read and processed by `Prisma`.

## Testing

launch this command to run test with Jest

```
yarn test
```

## SWAGGER

Open this url to show swagger documentation ui

```
http://localhost:3004/api-docs
```
