import { storeSessionId } from "./authWrapper";
import { getDatabase } from "./wrapper";
import { User } from "@hentaii/shared";
import bcrypt from "bcryptjs";

export const getUser = async (username: string) => {
  return (await getDatabase()).collection<User>("users").findOne({
    username
  }, {
    projection: {
      favorites: 0
    }
  })
}

export const register = async (username: string, password: string) => {
  let hash = await bcrypt.hash(password, 10);
  return await (await getDatabase()).collection("users").insertOne({
    username,
    password: hash
  })
}

export const login = async (username: string, password: string) => {
  let user = await getUser(username);
  if (!user) {
    throw Error("Wrong username or password");
  }

  let result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw Error("Wrong username or password");
  }
  return await storeSessionId(username);
}
