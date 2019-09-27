import Roles from 'enums/user-type';
import BaseModel from 'modules/common/models/base';

class Role extends BaseModel {
    static get tableName() {
        return 'role';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: {
                    type: 'integer'
                },
                name: {
                    type: { type: 'string', enum: Object.keys(Roles).map(key => Roles[key]) }
                }
            }
        };
    }
}

export default Role;
