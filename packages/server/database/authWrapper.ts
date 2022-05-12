import { getDatabase } from "./wrapper";
import { randomBytes } from "crypto";
import { User } from "@hentaii/shared";

export const generateSessionId = async () => {
  return await randomBytes(20).toString("hex");
}

export const storeSessionId = async (username: string) => {
  let id = await generateSessionId();

  await (await getDatabase()).collection("sessions").insertOne({
    username,
    sessionId: id
  })

  return id
}

export const deleteSession = async (sessionId: string) => {
  await (await getDatabase()).collection("sessions").deleteOne({
    sessionId
  })
}

export const getUserFromSessionId = async (sessionId: string) => {
  let session = await (await getDatabase()).collection("sessions").findOne({
    sessionId
  })

  if (!session) return;

  return await (await getDatabase()).collection<User>("users").findOne({
    username: session!.username
  }, { projection: {
    _id: 0,
    password: 0
  }})
}

export const deleteSessionId = async (sessionId: string) => {
  return await (await getDatabase()).collection("sessions").deleteOne({
    sessionId
  })
}
