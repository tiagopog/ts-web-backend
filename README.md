# About

Foundation project to be used as base or reference for web backends written in TypeScript and targeting the Node.js runtime.

## Tech Stack

| What | Tech |
| -------- | ------- |
| Codebase Structure | MVC + Services |
| Language | TypeScript |
| Runtime | Node.js     |
| Build & Dependencies | NPM |
| Containers | Docker & Docker Compose |
| Database | Postgres |
| ORM | Prisma |
| Tests | Jest |
| CI/CD | GitHub Actions |
| Deployment | Fly.io |


# Installation

## Single-Step Installation

In the root of the project you should be able to run this single command and
have it all set up (Docker images, environment and database) and be ready to start
developing.

```sh
npm run local:init
```

## Alternative Steps for Installation

Go to the local directory and build the docker images:

```sh
$ cd local/
$ docker-compose build
```

Run the docker containers:

```sh
$ docker-compose run --rm --service-ports backend sh
```

Or using a NPM script:

```sh
npm run docker:shell
```

# Development

## Playing with your code

### REPL

You can play around with your code while developing features by using the project's REPL via NPM scripts.

Inside the Docker container you can run:

```sh
npm run repl
```

Or from your local shell (host) you can directly run:

```sh
npm run docker:repl
```

### Web Server

To locally test the web API you can run the server inside a container with:

```sh
npm run server
```

Or directly run it from your local shell:

```sh
npm run docker:server
```

## Tests

This project uses the `jest` framework for test suites.

After creating your test file and ending its name with `.test.ts`,
you can run it with a Docker container by simply calling:

```sh
npm run docker:test src/tests/web/controllers/your_test_file.test.ts
```

Alternatively, if you're not using Docker for local development, you can run:

```sh
npx jest src/tests/web/controllers/your_test_file.test.ts
```

## Creating New Migrations

Access the container for the backend applications:

```sh
npm run docker:shell
```

Then after making changes to the data schema (`src/models/schema.prisma`)
run the Prisma (ORM) command for generating the migration for the changes:

```sh
npx prisma migrate dev --name my_migration_name
```

Prisma will then geranate the migration file with the SQL commands and will
execute it right away.

If you just want to generate the migration file so you can check/edit it before
actually running the migration, you can pass the `--create-only` to the
`migrate` command.

```sh
npx prisma migrate dev --name my_migration_name --create-only
```

And then after editing it you can execute the migration by running:

```sh
npx prisma migrate dev
```

# Deployment

## Manual Deployment

Backend applications are deployed to Fly.io. In order to manually deploy a new revision of the backend
application, one just needs to run:

```sh
 fly deploy --app ts-web-backend-staging
```

After the command is done, the backend will be deployed to staging environment.

## Troubleshooting Deployments

If an image fails to deploy you can the logs in Fly.io then test it locally. First build the
deployment image in you local:

```sh
docker build -t ts-web-backend:staging -f Dockerfile .
```

You can also run it locally (mimicing what Fly.io does) by running:


# Testing Deployments - Web API

Show user details:

```sh
curl https://ts-web-backend-staging.fly.dev/api/v1/users/ee251031-aa94-46a2-b80c-aab671b48063
```

```sh
docker run --rm -it -e DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5438/ts_web_backend_dev?schema=public" -p 3001:3000 ts-web-backend:staging
```

# Database

## Connect to Remote Database

Connect to the database hosted in Fly.io via command line:

```sh
fly postgres connect --app ts-web-backend-staging --database ts_backend_database_staging
```

Or open a SSH tunnel to Fly's internal network:

```sh
fly proxy 5432:5432 -a ts-web-backend-staging
```

Then you can use any database client of your choice and connect to the external
database via `localhost:5432`.
