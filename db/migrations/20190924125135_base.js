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
        }),

        knex.schema.createTable('race', table => {
            table.increments().primary();
            table.string('name').unique();
        }),

        knex.schema.createTable('class', table => {
            table.increments().primary();
            table.string('name').unique();
        }),

        knex.schema.createTable('attribute', table => {
            table.increments().primary();
            table.string('name').unique();
        })
    ]).then(() => Promise.all([
        knex.schema.createTable('user_role', table => {
            table.increments().primary();
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('role_id').unsigned().references('id').inTable('role');
        }),

        knex.schema.createTable('character', table => {
            table.increments().primary();
            table.string('name');
            table.integer('race_id').unsigned().references('id').inTable('race');
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.timestamps();
        }),

        knex.schema.createTable('character_attributes', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('attribute_id').unsigned().references('id').inTable('attribute');
            table.integer('value');
        }),

        knex.schema.createTable('character_classes', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('class_id').unsigned().references('id').inTable('class');
            table.integer('levels');
        }),

        knex.schema.createTable('skill', table => {
            table.increments().primary();
            table.string('name').unique();
            table.integer('associated_attribute_id').unsigned().references('id').inTable('attribute');
        })
    ])).then(() => Promise.all([
        knex.schema.createTable('character_skills', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('skill_id').unsigned().references('id').inTable('skill');
        }),

        knex.schema.createTable('campaign', table => {
            table.increments().primary();
            table.string('name');
            table.integer('dungeon_master_id').unsigned().references('id').inTable('user');
            table.timestamps();
        })
    ])).then(() => Promise.all([
        knex.schema.createTable('campaign_characters', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('campaign_id').unsigned().references('id').inTable('campaign');
            table.boolean('alive');
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
