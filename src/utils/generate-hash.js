/* eslint-disable no-console */
import bcrypt from 'bcrypt';

function start() {
    if (process.argv.length <= 2) {
        console.error('usage:', 'yarn start <password to hash>');
        process.exit(1);
    }

    const saltRounds = 10;
    console.log(bcrypt.hashSync(process.argv[2], saltRounds));
}


start();
