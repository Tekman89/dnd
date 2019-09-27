import UserDao from 'modules/authentication/daos/user';


async function get(id) {
    const user = await UserDao.find(id).eager('roles');

    if (!user) {
        throw Error('no such user');
    }

    return user;
}

async function findByName(name) {
    const user = await UserDao.findByName(name);

    if (!user) {
        throw Error('no such user');
    }

    return user;
}

async function create(user) {
// something
}

async function list(ids = []) {
// something
}

export default {
    get, findByName, create, list
};
