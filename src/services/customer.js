import bcrypt from 'bcrypt';

const users = [{
    name: 'admin',
    password: bcrypt.hashSync('admin', 10)
},
{
    name: 'super',
    password: bcrypt.hashSync('user', 10)
}];


async function get(name) {
    return users.find(user => user.name === name);
}

async function create(payload) {
    return users.push({
        name: payload.name,
        password: bcrypt.hashSync(payload.password, 10)
    });
}


export default { get, create };
