import mongoose from 'mongoose';
import app from './app';
import config from './config';

function main() {
  try {
    mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`Server Started. Running on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
main();
