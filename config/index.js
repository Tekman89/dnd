import Crypto from 'crypto';

const secret = Crypto.randomBytes(256).toString('base64');
console.log('SECRET: ', secret);

export default secret;
