import secret from 'config';
import JsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserDao from '../daos/user';


function getSignedToken(payload, expiresIn) {
    const key = Buffer.from(secret, 'base64');
    return JsonWebToken.sign(payload, key, { expiresIn });
}

async function authenticate(name, password, expiresIn = '1h') {
    let user;
    try {
        user = await UserDao.findByName(name);
    } catch (err) {
        throw Error('internal server error');
    }

    if (!user || !bcrypt.compare(user.password, password)) {
        throw Error('invalid credentials');
    }

    return getSignedToken({ id: user.id, name }, expiresIn);
}

export default { authenticate };
