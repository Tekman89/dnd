import { Model } from 'objection';

class BaseModel extends Model {
    $beforeInsert() {
        this.createdAt = new Date();
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    $formatJson(json) {
        const result = super.$formatJson(json);

        Object.keys(result).forEach(key => {
            if (result[key] === null) {
                delete result[key];
            }
        });

        return result;
    }
}

// directory to be used when looking for models
BaseModel.modelPaths = __dirname;

// persist timestamp fields despite not being part of the JSON Schema
BaseModel.pickJsonSchemaProperties = false;

export default BaseModel;
