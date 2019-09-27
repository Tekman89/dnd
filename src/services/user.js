import * as UserDao from 'daos/user';


export async function get(id) {
    const user = await UserDao.find(id);

    if (!user) {
        throw Error('no such user');
    }

    return user;
}

export async function findByName(name) {
    const user = await UserDao.findByName(name);

    if (!user) {
        throw Error('no such user');
    }

    return user;
}

export async function create(user) {
// something
}

export async function list(ids = []) {
// something
}
