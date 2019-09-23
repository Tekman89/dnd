import bcrypt from 'bcrypt'

function start() {

	if (process.argv.length <= 2) {
		console.error('usage:', 'yarn start <password to hash>');
		process.exit(1);
	}


	console.log(bcrypt.hashSync(process.argv[2], 10));
}



start();
