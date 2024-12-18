/**
 * Load the .env config
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  db_url: process.env.DB_URL,
};
