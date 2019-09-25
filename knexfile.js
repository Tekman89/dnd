import Path from 'path';
import { knexSnakeCaseMappers } from 'objection';

const KnexConfig = {
    testing: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: `${__dirname}/db/migrations`
        },
        seeds: {
            directory: `${__dirname}/db/seeds/testing`
        },
        useNullAsDefault: true,
        log: {
            warn() {} // discards all warnings. https://knexjs.org/#Installation-log
        },
        ...knexSnakeCaseMappers()
        // debug: {
        //     query: true,
        //     bindings: true,
        //     pool: true,
        //     client: true
        // }
    },

    development: {
        client: 'sqlite3',
        connection: {
            filename: Path.resolve(__dirname, 'db/dev.sqlite3')
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds/development'
        },
        useNullAsDefault: true,
        acquireConnectionTimeout: 1000,
        debug: {
            query: true,
            tx: true,
            pool: true,
            client: true,
            bindings: true
        },
        asyncStackTraces: true, // performance penalty, dev only
        ...knexSnakeCaseMappers()
    },
    ...knexSnakeCaseMappers()
};
export default KnexConfig;
