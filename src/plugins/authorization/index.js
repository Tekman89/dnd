import HapiAuthorization from 'hapi-authorization';
import UserTypes from 'enums/user-type';


async function register(server) {
    await server.register({
        plugin: HapiAuthorization,
        options: {
            roles: Object.keys(UserTypes).map(type => UserTypes[type])
        }
    });

    server.log('info', 'registered plugin authorization');
}


export default { name: 'authorization', register };
