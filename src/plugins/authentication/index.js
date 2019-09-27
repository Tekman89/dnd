import crypto from 'crypto';
import { UserService } from 'services';
import JWT from 'hapi-auth-jwt2';

const secret = crypto.randomBytes(64).toString('base64');

async function validate(decoded) {
    try {
        await UserService.get(decoded.name);
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
}


export default { name: 'authentication', register };
