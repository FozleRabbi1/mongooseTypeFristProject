import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

// ===========>>> asynchronous
process.on('unhandledRejection', () => {
  console.log(' unhandledRejection is deceted , sutting down');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// ==========.>>> synchronous  (আমাদের ভুলের কারনে এর error কাজ করবে)
process.on('uncaughtException', () => {
  console.log(' uncaughtException is deceted , sutting down');
  process.exit(1);
});
// Promise.reject();          //unhandledRejection
// console.log(x);         //uncaughtException
