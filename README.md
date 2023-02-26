# Nx Project Template

This template can be used for creating new projects using Nx. It contains a working example
that uses a *very* opinionated list of tools and libraries.


## Tooling

### Nx

[Nx](https://nx.dev) is a monorepo tool that comes with CLI and VS Code tooling.
It allows the user to have multiple libraries (public and private) and applications in the same repository.
Libraries can be shared between applications and can be imported by other libraries and/or deployed to npm.
The application(s) can also be deployed individually.

> 📘 Explaining how Nx works is not part of this README. Please refer to the [Nx documentation](https://nx.dev) for more information.


### Scripts to Rule Them All

[Scripts to Rule Them All](https://github.com/github/scripts-to-rule-them-all) is a pattern for organizing scripts. In this project they can be used to access commonly used functionality. Each script also comes with
helpful error messages.

- `script/build-all`: Builds all libraries and applications
- `script/ci`: Runs the commands necessary to build in a CI environment
- `script/docker-up`: Starts the docker container(s)
- `script/docker-down`: Stops the docker container(s)
- `script/projects`: Lists all projects
- `script/run`: Starts a project that has been built before
- `script/serve`: Starts a project in development mode
- `script/setup`: Prepares the monorepo for development
- `script/test-all`: Runs all tests

> 📙 Nx sometimes fails to properly manage the cache which can result in a passing build that
> fails in a CI environment. For this reason the following aliases can be used (add them to .zshrc / .bashrc):
> 
> ```bash
> alias nba="clear && nx run-many --target=build --all --skip-nx-cache"
> alias nta="clear && nx run-many --target=test --all --skip-nx-cache"
> alias nra="clear && nba && nta"
> ```


### Docker

This project *can be* used with [Docker](https://www.docker.com/). The `docker-compose.yml` file contains the configuration for the containers.


### PostgreSQL

This project *can be* used with [PostgreSQL](https://www.postgresql.org/). The `docker-compose.yml` file contains the configuration for the database in case you don't want a locall installment.

> 📘 RDS can also be used as it is fully compatible with PostgreSQL.


### Husky

[Husky](https://www.npmjs.com/package/husky) is a tool that allows you to run scripts before or after git commands. In this project it is used to run the linter (`lint-staged`) before committing.

The `.lintstagedrc` file describes how linting works. It will run
[eslint](https://eslint.org/) and [prettier](https://prettier.io/) on all staged files.


### Testing

Testing is done using [Jest](https://jestjs.io/). All files that have the `.spec.ts` extension will be run by Jest. You can peruse the example tests in the `yourapp` project.


### Volta

[Volta](https://volta.sh/) is a tool that allows you to manage your Node.js version. It is recommended to use it to ensure that everyone is using the same version of Node.js. If you run `script/setup` it will install Node with Volta for you.


### Dotenv

[Dotenv](https://www.npmjs.com/package/dotenv) is a tool that allows you to load environment variables from a `.env` file. They are ignored by git and can be used to store sensitive information.


## Libraries and Tools


### React

[React](https://reactjs.org/) is used for the frontend.

> 📘 If you don't know how to use React [this](https://frontendmasters.com/courses/complete-react-v8/)
> course is a superb source of information.


### React Query

[React Query](https://react-query.tanstack.com/) is a library that allows you to fetch data in a declarative way. It is used in the `yourapp` project.


### tRPC

[tRPC](https://trpc.io/) is a library that allows seamless integration between the frontend and the backend
with an RPC-like interface. It is used in the `yourapp` project.

> 📘 A note on the T3 stack: The [T3](https://create.t3.gg/) stack might be familiar if you take a look
> at the tooling used here. This is not a coincidence. We've started with T3, but it doesn't work well
> with monorepos, so we integrated the same tech into Nx.


### Tailwind

[Tailwind](https://tailwindcss.com/) is a utility-first CSS framework. It is used to style the frontend.


### Next.js

[Next.js](https://nextjs.org/) is a framework for React that allows you to create server-side rendered applications. It is used in the `yourapp` project.


### Authentication

[NextAuth.js](https://next-auth.js.org/) is a library that allows you to add authentication to your Next.js application. It is used in the `yourapp` project.


### Authorization

For *authorization* a custom-made library (PBAC) is used. It is used in the `yourapp` project.


### Prisma

[Prisma](https://www.prisma.io/) is an ORM(ish) tool that can be used to connect to a database.
It is used in the `yourapp` project for database access.


### Serialization

For serializing (and validating) data between the backend and the frontend we're using
the [Zod](https://zod.dev/) library.


### Functional Programming

We're using functional programming in this project with the help of [fp-ts](https://gcanti.github.io/fp-ts/).

The main reasons:

- Established and well-known coding patterns: even though people sometimes have an aversion to strictly
  typed fp, its concepts are well understood and applicable across many languages. If you've learned it once
  you can apply it elsewhere too. In our opinion it is much better than using arbitrary patterns and
  semantics that most frameworks bring to the table
- Straightworward error handling
- Simple to write asynchronous code
- Easy to test
- Less error-prone


## Project Layout


