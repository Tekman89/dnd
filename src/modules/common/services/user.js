import { models as Repository } from 'plugins/repository';


async function get(id) {
    const user = await Repository.User.find(id).eager('roles');

    if (!user) {
        throw Error('no such user');
    }

    return user;
}

async function findByName(name) {
    const user = await Repository.User.findByName(name);

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
