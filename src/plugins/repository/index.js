import Models from 'models';

const models = {};

class ModelRepository {
    constructor(Model) {
        this.model = Model;
    }

    findAll() {
        return this.model.query();
    }

    findById(id) {
        return this.model.query().findById(id);
    }

    findBy(field, value) {
        return this.model.query().findOne(field, value);
    }

    add(entity) {
        return this.model.query().insert(entity);
    }

    update(entity, id) {
        return this.model.query().updateAndFetchById(id, entity);
    }

    query() {
        return this.model.query();
    }
}

function create(model) {
    const Model = Models[model];

    return new ModelRepository(Model);
}


const register = server => {
    Object.keys(Models).forEach(model => {
        console.log(model);
        const repo = create(model);
        const { name } = repo.model;

        models[name] = repo;
    });

    server.decorate('request', 'model', models);
};


export { models };
export { ModelRepository };

export default { name: 'repository', register };
