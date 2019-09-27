import secret from 'config';
import UserService from 'modules/common/services/user';
import JWT from 'hapi-auth-jwt2';


async function validate(decoded) {
    try {
        await UserService.findByName(decoded.name);
        return { isValid: true };
    } catch (err) {
        return { isValid: false };
    }
}

async function register(server) {
    await server.register(JWT);

    // private key
    const key = Buffer.from(secret, 'base64');
    const strategyName = 'jwt';

    server.auth.strategy(strategyName, 'jwt', {
        key,
        validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.auth.default(strategyName);
    server.log('info', 'registered plugin auth');
}


export default { name: 'authentication', register };
