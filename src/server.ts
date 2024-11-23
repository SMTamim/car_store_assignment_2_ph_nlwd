/**
 * Server Configurations
 */

import mongoose from 'mongoose';
import app from './app';
import config from './config';

// main bootstrap function
function bootstrap() {
  try {
    // db connection
    mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`Server Started. Running on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

// call the bootstrap function to start the server
bootstrap();
