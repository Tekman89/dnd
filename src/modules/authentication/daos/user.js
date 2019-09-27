import User from 'modules/authentication/models/user';

async function get(id) {
    return User.query().findById(id);
}

async function list() {
    return User.query();
}

async function findByName(name) {
    return User.query().findOne('name', name);
}

export default { get, list, findByName };
