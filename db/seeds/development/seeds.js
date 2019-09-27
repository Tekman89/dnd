import UserType from '../../../src/enums/user-type';

exports.seed = knex => Promise.all([
    knex('user').insert([{
        id: 1,
        name: 'admin',
        password: '$2b$10$nglNzrYhXDaxzBJR/hLNE.6whYUbpduz01FazHXZtvsiTEOwm2suy' // admin
    },
    {
        id: 2,
        name: 'user',
        password: '$2b$10$wIrOQH.kN5dgxhkyrVccxOMTNbUJcTib80WP/6AcnyJNBO.w1kj9S' // password
    }]),
    knex('role').insert(Object.keys(UserType).map((type, index) => ({ id: index + 1, name: UserType[type] }))),
    knex('user_roles').insert([{
        id: 1,
        user_id: 1,
        role_id: 1
    }, {
        id: 2,
        user_id: 1,
        role_id: 2
    }, {
        id: 3,
        user_id: 1,
        role_id: 3
    }, {
        id: 4,
        user_id: 2,
        role_id: 3
    }])
]);
