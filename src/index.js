import Hapi from '@hapi/hapi';
import routes from 'backend/routes';
import plugins from 'backend/plugins';
import fs from 'fs';

const server = new Hapi.Server({
    port: 9999,
    host: 'localhost',
    tls: {
        key: fs.readFileSync('config/cert/domain.key'),
        cert: fs.readFileSync('config/cert/domain.crt')
    },
    routes: {
        config: {
            security: {
                hsts: {
                    maxAge: 3600,
                    includeSubDomains: true,
                    preload: true
                }
            }
        }
    }
});


const init = async () => {
    await server.register(plugins);
    routes.forEach(route => {
        server.route(route);
        server.log('info', `route created in ${route}`);
    });

    await server.start();
    server.log('info', `server started on ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
    console.log(err);
    server.log('error', err);
    process.exit(1);
});


init();
