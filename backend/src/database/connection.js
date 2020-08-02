const knex = require('knex');
const configuration = require('../../knexfile');

function configByEnv(environment) {
    let config;
    switch (environment) {
        case 'development':
            config = configuration.development;
            break;
        case 'test':
            config = configuration.test;
            break;
        case 'staging':
            config = configuration.staging;
            break;
        case 'production':
            config = configuration.production;
            break;
        default:
            config = configuration.development;
            break;
    }

    return config;
}

const config = configByEnv(process.env.NODE_ENV);

const connection = knex(config);

module.exports = connection;