import BaseModel from './base';

class User extends BaseModel {
    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'password'],
            properties: {
                id: {
                    type: 'integer'
                },
                name: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        };
    }

    static get relationMappings() {
        return {
            roles: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: 'role',
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_roles.userId',
                        to: 'user_roles.roleId'
                    },
                    to: 'role.id'
                }
            }
        };
    }

    $formatJson(json) {
        const { password, ...result } = super.$formatJson(json);

        return result;
    }
}


export default User;
