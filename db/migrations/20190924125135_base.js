exports.up = function up(knex) {
    return Promise.all([
        knex.schema.createTable('user', table => {
            table.increments().primary();
            table.string('password');
            table.string('name').unique();
            table.timestamps();
        }),

        knex.schema.createTable('role', table => {
            table.increments().primary();
            table.string('name').unique();
            table.timestamps();
        }),

        knex.schema.createTable('race', table => {
            table.increments().primary();
            table.string('name').unique();
            table.timestamps();
        }),

        knex.schema.createTable('class', table => {
            table.increments().primary();
            table.string('name').unique();
            table.timestamps();
        }),

        knex.schema.createTable('stat', table => {
            table.increments().primary();
            table.string('name').unique();
            table.timestamps();
        })
    ]).then(Promise.all([
        knex.schema.createTable('user_role', table => {
            table.increments().primary();
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('role_id').unsigned().references('id').inTable('role');
            table.unique(['user_id', 'role_id']);
            table.timestamps();
        }),

        knex.schema.createTable('character', table => {
            table.increments().primary();
            table.string('name');
            table.integer('race_id').unsigned().references('id').inTable('race');
            table.integer('user_id').unsigned().references('id').inTable('user');
        }),

        knex.schema.createTable('character_stats', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('stat_id').unsigned().references('id').inTable('stat');
            table.unique(['character_id', 'stat_id']);
            table.integer('value');
            table.timestamps();
        }),

        knex.schema.createTable('character_classes', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('class_id').unsigned().references('id').inTable('class');
            table.unique(['character_id', 'class_id']);
            table.integer('levels');
            table.timestamps();
        }),

        knex.schema.createTable('skill', table => {
            table.increments().primary();
            table.string('name').unique();
            table.integer('associated_stat_id').unsigned().references('id').inTable('stat');
            table.timestamps();
        })
    ]));
};

exports.down = function down(knex) {
    return knex.schema.dropTableIfExists('user_role').then(() => Promise.all([
        knex.schema.dropTableIfExists('user'),
        knex.schema.dropTableIfExists('role')
    ]));
};
