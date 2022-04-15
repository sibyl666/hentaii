import { getDatabase } from "./wrapper";

interface Manga {
  id: string,
  title: string,
  artist?: string,
  tags?: string[],
  count: number
}

export var totalCount = 0;
const updateCount = async () => {
  totalCount = await (await getDatabase()).collection("mangas").estimatedDocumentCount();
}
setTimeout(updateCount, 1000);
setInterval(updateCount, 120000);

export const checkSameId = async (id: string) => {
  return await (await getDatabase()).collection("mangas").findOne({ id })
}

export const addManga = async (manga: Manga) => {
  return await (await getDatabase()).collection("mangas").insertOne(manga);
}

export const delManga = async (id: string) => {
  return await (await getDatabase()).collection("mangas").deleteOne({ id });
}

export const getLatest = async (offset: number, count: number) => {
  let skip = Math.abs(Math.floor(offset * count));

  return await (await getDatabase()).collection("mangas")
  .find({}, { projection: { _id: 0 } })
  .sort({ _id: -1 })
  .skip(skip)
  .limit(count)
  .toArray()
}

export const getManga = async (id: string) => {
  return await (await getDatabase()).collection("mangas").findOne({
    id
  }, { projection: { _id: 0 } })
}

export const favorite = async (userId: string, mangaId: string) => {
  return await (await getDatabase()).collection("users").updateOne({
    userId
  }, { $addToSet: { favorites: mangaId }})
}

export const delFavorite = async (userId: string, mangaId: string) => {
  return await (await getDatabase()).collection("users").updateOne({
    userId
  }, { $pull: { favorites: mangaId }})
}

export const getFavorites = async (favorites: string[], offset: number, count: number) => {
  let skip = Math.abs(Math.floor(offset * 20));

  return await (await getDatabase()).collection("mangas").find({
    id: { $in: favorites }
  })
  .sort({ _id: -1 })
  .skip(skip)
  .limit(count)
  .toArray()
}

export const search = async (query: string) => {
  return await (await getDatabase()).collection("mangas").find({
    $text: {
      $search: query
    }
  })
  .limit(20)
  .toArray()
}
