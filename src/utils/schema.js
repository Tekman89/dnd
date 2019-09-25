import Knex from 'knex';
import KnexConfig from 'knexfile';


(async function setup() {
    const knex = Knex(KnexConfig.development);
    try {
        await knex.migrate.latest();
        await knex.seed.run();
    } catch (err) {
        /* eslint-disable-next-line */
        console.log(err);
    } finally {
        await knex.destroy();
    }
}());
