import crypto from 'crypto';

const secret = crypto.randomBytes(256).toString('base64');
console.log(secret);
