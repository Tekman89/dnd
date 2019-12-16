import BaseModel from 'models/base';


class Race extends BaseModel {
    static get tableName() {
        return 'race';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description'],
            properties: {
                name: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                }
            }
        };
    }
}

export default Race;
