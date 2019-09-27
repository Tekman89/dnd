import User from 'models/user';

export async function get(id) {
    return User.query().findById(id);
}

export async function list() {
    return User.query();
}

export async function findByName(name) {
    return User.query().findOne('name', name);
}
