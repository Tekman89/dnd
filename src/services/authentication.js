import secret from 'config';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CustomerService from './customer';


function getSignedToken(payload, expiresIn) {
    const key = Buffer.from(secret, 'base64');
    return JsonWebToken.sign(payload, key, { expiresIn });
}

async function authenticate(name, password, expiresIn) {
    const user = await CustomerService.get(name);

    if (!user || !bcrypt.compare(user.password, password)) {
        throw Error('invalid credentials');
    }

    return getSignedToken({ id: user.id, name }, expiresIn);
}

export default { authenticate };
