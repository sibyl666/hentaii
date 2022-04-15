import { Db, MongoClient } from "mongodb";

let db: Db;
export const getDatabase = async () => {
  if (db) {
    return db
  }

  const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
  db = (await mongoClient.connect()).db("hnt");
  return db
}
