/**
 * Initializes database connection.
 */

import Knex from 'knex';
import { Model } from 'objection';

import knexConfig from 'knexfile';


async function register(server) {
    const knex = Knex(knexConfig[process.env.ENVIRONMENT || 'development']);
    Model.knex(knex);

    // make sure that database connection is closed when server stops.
    server.ext('onPostStop', () => knex.destroy());
    server.log('info', 'registered plugin database');
}

export default {
    name: 'database',
    register
};
