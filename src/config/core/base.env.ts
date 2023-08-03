import * as env from 'dotenv';

env.config();

const ENV = process.env.APP_ENV;

module.exports(ENV);
