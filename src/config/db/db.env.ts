import { registerAs } from '@nestjs/config';
import * as env from 'dotenv';

env.config();

export default registerAs('postgres', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  replica_host: process.env.DB_REPLICA_HOST,
  replica_port: process.env.DB_REPLICA_PORT,
  replica_user: process.env.DB_REPLICA_USER,
  replica_password: process.env.DB_REPLICA_PASSWORD,
  replica_name: process.env.DB_REPLICA_NAME,
}));
