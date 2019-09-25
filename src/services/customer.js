import bcrypt from 'bcrypt';

const saltRounds = 10;

const users = [{
    name: 'admin',
    password: bcrypt.hashSync('admin', saltRounds)
},
{
    name: 'super',
    password: bcrypt.hashSync('user', saltRounds)
}];


async function get(name) {
    return users.find(user => user.name === name);
}

async function create(payload) {
    return users.push({
        name: payload.name,
        password: bcrypt.hashSync(payload.password, saltRounds)
    });
}


export default { get, create };
