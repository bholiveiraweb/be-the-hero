const knex = require('knex');
const config = require('../../knexfile');

const env = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connect = knex(env);

module.exports = connect;