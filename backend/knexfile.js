// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/pajuba-development-db.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds/development'
          },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/pajuba-test-db.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds/test'
          },
        useNullAsDefault: true,
    },

    staging: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/pajuba-staging-db.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds/staging'
          },
        useNullAsDefault: true,
    },

    production: {
        client: 'sqlite3',
        connection: {
            filename: './src/database/pajuba-production-db.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds/production'
          },
        useNullAsDefault: true,
    },

};
