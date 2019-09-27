import HapiAuthorization from 'hapi-authorization';


async function register(server) {
    await server.register({
        plugin: HapiAuthorization
    });

    server.log('info', 'registered plugin authorization');
}


export default { name: 'authorization', register };
