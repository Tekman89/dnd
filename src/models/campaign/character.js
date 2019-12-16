import BaseModel from 'models/base';


class Character extends BaseModel {
    static get tableName() {
        return 'character';
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
                    type: 'string'
                }
            }
        };
    }

    // TODO: this is still incomplete, populate it with the remaining relations
    static get relationshipMappings() {
        return {
            player: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'user',
                join: {
                    from: 'character.player_id',
                    to: 'user.id'
                }
            },
            race: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: 'race',
                join: {
                    from: 'character.race_id',
                    to: 'race.id'
                }
            }
        };
    }
}


export default Character;
