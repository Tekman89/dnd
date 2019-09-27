/**
 * Initializes database connection.
 */

import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

import knexConfig from 'knexfile';

dotenv.config();


async function register(server) {
    const knex = Knex(knexConfig[process.env.ENVIRONMENT || 'development']);
    Model.knex(knex);

    // make sure that database connection is closed when server stops.
    server.ext('onPostStop', () => knex.destroy());
}

export default {
    name: 'database',
    register
};
