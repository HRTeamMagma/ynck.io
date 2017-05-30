require('dotenv').config();
var dbName;
var debugSetting;
var poolSetting;

if (process.env.NODE_ENV === 'test') {
  // Testing
  dbName = process.env.DB_NAME_TEST;
  debugSetting = true;
  poolSetting = {
    "min": 1,
    "max": 2
  };
} else if (process.env.NODE_ENV === 'production') {
  // Production
  dbName = process.env.DB_NAME;
  debugSetting = false;
  poolSetting = {
    "min": 2,
    "max": 10
  };
} else {
  // Development
  dbName = process.env.DB_NAME;
  debugSetting = true;
  poolSetting = {
    "min": 1,
    "max": 2
  };
}

module.exports = {
  "client": "postgresql",
  "connection": {
    "database": dbName,
    "user": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOSTNAME,
    "port": process.env.DB_PORT
  },
  "debug": debugSetting,
  "pool": poolSetting,
  "migrations": {
    "tableName": "knex_migrations",
    "directory": "db/migrations"
  },
  "seeds": {
    "directory": "db/seeds"
  }
};
