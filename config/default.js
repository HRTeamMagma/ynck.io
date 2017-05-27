module.exports = {
  "knex": {
    "client": "postgresql",
    "connection": {
      "database": "ynck",
      "user": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "host": process.env.DB_HOSTNAME,
      "port": process.env.DB_PORT
    },
    "pool": {
      "min": 1,
      "max": 2
    },
    "migrations": {
      "tableName": "knex_migrations",
      "directory": "db/migrations"
    },
    "seeds": {
      "directory": "db/seeds"
    }
  },

  "passport": {
    "Google": {},
    "Facebook": {},
    "Twitter": {}
  }
}