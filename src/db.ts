import { connect } from "mongoose";
import env from "../env";

// or any ORM and connection string/method according to your database
const MONGO_HOST = env.IS_DOCKER ? "db" : "localhost";
//const CONNECTION_STRING = `mongodb://${env.MONGO_USER}:${env.MONGO_PASS}@db:27017/${env.MONGO_DATABASE}?authSource=admin`;
const CONNECTION_STRING = `mongodb://${env.MONGO_USER}:${env.MONGO_PASS}@${MONGO_HOST}:27017/${env.MONGO_DATABASE}?authSource=admin`;

console.log(`🔌 CONNECTION_STRING : ${CONNECTION_STRING}...`);

export async function DbConnect() {
  try {
    const _db = await connect(CONNECTION_STRING);
    console.log(`🟢 connected to MongoDB: ${env.MONGO_DATABASE}`);
    return _db;
  }
  catch (e) {
    console.warn(e);
    return e;
  }
}
