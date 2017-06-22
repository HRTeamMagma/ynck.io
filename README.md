# ynck.io

ynck is a platform for tattoo enthusiasts to discover artists/designs, find inspiration, and connect with others in the community.

## Team

- Helen Tang
- An Yu
- Devon Weldon
- Scott Moschella

## Development

### Installing System Dependencies

```
brew install yarn
brew install redis
brew install postgresql
```

### Install Project Dependencies

```
yarn global add grunt-cli knex eslint
```

## Database Initialization

Ensure `postgres` is running before performing these steps.

### Database Creation:

Use grunt to create a new database for your development and test environments:

Development envronment: `grunt pgcreatedb:default`

Other environments, specify like so: `NODE_ENV=test grunt pgcreatedb:default`

### Run Migrations & Data Seeds

In terminal, from the root directory:

`knex migrate:latest --env NODE_ENV`

`knex migrate:rollback --env NODE_ENV`

`knex seed:run --env NODE_ENV`

Note: `--env NODE_ENV` may be omitted for development. For example, `knex migrate:latest` will run all migrations in the development environment, while `knex migrate:latest --env test` will migrate in the test environment.

## Running the App

To run webpack build: `yarn run build`

To run server: `yarn run start`

To run tests: `yarn run test`

To run your redis server for the session store `redis-server`


