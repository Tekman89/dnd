import CastingTime from 'enums/casting-time';
import DamageType from 'enums/damage-type';
import UserType from 'enums/user-type';
import MagicSchool from 'enums/magic-school';

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
            table.enum('name', Object.keys(UserType).map(key => UserType[key]));
        }),

        knex.schema.createTable('race', table => {
            table.increments().primary();
            table.string('name').unique();
            table.string('description', 10000);
        }),

        knex.schema.createTable('class', table => {
            table.increments().primary();
            table.string('name').unique();
        }),

        knex.schema.createTable('attribute', table => {
            table.increments().primary();
            table.string('name').unique();
        }),

        knex.schema.createTable('magic_school', table => {
            table.increments().primary();
            table.enum('name', Object.keys(MagicSchool).map(key => MagicSchool[key]));
        }),

        knex.schema.createTable('damage_type', table => {
            table.increments().primary();
            table.enum('type', Object.keys(DamageType).map(key => DamageType[key]));
        }),

        knex.schema.createTable('casting_time', table => {
            table.increments().primary();
            table.enum('time', Object.keys(CastingTime).map(key => CastingTime[key]));
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
        }),

        knex.schema.createTable('attack', table => {
            table.increments().primary();
            table.integer('damage_type_id').unsigned().references('id').inTable('damage_type');
            table.string('range');
            table.string('area');
            table.string('attack');
            table.string('save');
        })

    ])).then(() => Promise.all([
        knex.schema.createTable('character_skills', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('skill_id').unsigned().references('id').inTable('skill');
            table.boolean('proficient');
        }),

        knex.schema.createTable('campaign', table => {
            table.increments().primary();
            table.string('name');
            table.integer('dungeon_master_id').unsigned().references('id').inTable('user');
            table.timestamps();
        }),

        knex.schema.createTable('spell', table => {
            table.increments().primary();
            table.string('name');
            table.string('description', 2048);
            table.string('short_description', 512);
            table.integer('level');
            table.integer('school_id').unsigned().references('id').inTable('magic_school');
            table.integer('attack_id').unsigned().references('id').inTable('attack');
            table.integer('casting_time_id').unsigned().references('id').inTable('casting_time');
        })

    ])).then(() => Promise.all([
        knex.schema.createTable('campaign_characters', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('campaign_id').unsigned().references('id').inTable('campaign');
            table.boolean('alive');
            table.timestamps();
        }),

        knex.schema.createTable('class_spells', table => {
            table.increments().primary();
            table.integer('class_id').unsigned().references('id').inTable('class');
            table.integer('spell_id').unsigned().references('id').inTable('spell');
        }),

        knex.schema.createTable('character_spells', table => {
            table.increments().primary();
            table.integer('character_id').unsigned().references('id').inTable('character');
            table.integer('spell_id').unsigned().references('id').inTable('spell');
            table.boolean('prepared');
        })
    ]));
};

exports.down = function down(knex) {
    return knex.schema.dropTableIfExists('user_role').then(() => Promise.all([
        knex.schema.dropTableIfExists('user'),
        knex.schema.dropTableIfExists('role')
    ]));
};
