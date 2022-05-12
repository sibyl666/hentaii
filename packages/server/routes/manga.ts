import multer, { diskStorage } from "multer";
import express from "express";
import cookieParser from "cookie-parser";
import { checkPermissions, checkCookies } from "../middlewares/auth";
import {
  addManga,
  checkSameId,
  delManga,
  getLatest,
  getManga,
  favorite,
  delFavorite,
  search,
  getFavorites,
  totalCount,
  getRandom,
} from "../database/mangaWrapper";
import { getUserFromSessionId } from "../database/authWrapper";
import { rm } from "fs/promises";
import { generateId } from "../utils";
import { exec } from "child_process";

const mangaRouter = express.Router();
mangaRouter.use(cookieParser());
mangaRouter.use(express.json());

mangaRouter.post("/upload", checkPermissions("UPLOAD"), async (req, res) => {
  if (!req.query.title) {
    return res.status(422).send("Title required!");
  }

  let id = generateId(12);
  while (!checkSameId(id)) {
    id = generateId(12);
  }

  var count = 1;
  const download = multer({
    storage: diskStorage({
      destination: `mangas/${id}`,
      filename: (req, res, cb) => {
        cb(null, `${count++}`.padStart(3, "0") + ".png");
      },
    }),
  }).array("file", 300);

  download(req, res, async (err) => {
    if (err) {
      return res.status(500).send("An error occured!");
    }

    await addManga({
      id: id,
      title: req.query.title!.toString(),
      count: Number(req.files!.length),
    });

    res.send({ status: "ok" });

    exec("python3 ./scripts/thumbnail.py");
  });
});

mangaRouter.delete("/delete", checkPermissions("DELETE"), async (req, res) => {
  if (!req.body.id) {
    return res.status(422).send("Manga id required!");
  }

  const result = await delManga(req.body.id);
  if (result.deletedCount === 0) {
    return res.status(500).send("Can't delete the manga!");
  }

  try {
    await rm(`./mangas/${req.body.id}`, { recursive: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Can't delete manga from the disk");
  }

  res.send({ status: "ok" });
});

mangaRouter.get("/latest", async (req, res) => {
  let offset = parseInt(req.query.page as string) || 0;

  const mangas = await getLatest(offset - 1, 20);
  res.send({totalCount, data: {...mangas}});
});

mangaRouter.get("/get", async (req, res) => {
  if (!req.query.id) {
    return res.status(406).send("Id required!");
  }

  const manga = await getManga(req.query.id as string);
  if (!manga) {
    return res.status(404).send("Can't find manga!");
  }

  res.send(manga);
});

mangaRouter.get("/search", async (req, res) => {
  if (!req.query.q) {
    return res.status(406).send("q param required!");
  }

  const result = await search(req.query.q.toString());
  res.send(result);
});

mangaRouter.get("/favorites", checkCookies, async (req, res) => {
  let offset = parseInt(req.query.page as string) || 0;
  
  const user = await getUserFromSessionId(req.cookies.sessionid);
  if (!user) {
    return res.status(403).send("Forbidden!");
  }

  if (!user?.favorites || user.favorites.length == 0) {
    return res.status(200).send([]);
  }

  const result = await getFavorites(user, offset - 1, 20);
  res.send(result);
});

mangaRouter.post("/favorite", checkCookies, async (req, res) => {
  const user = await getUserFromSessionId(req.cookies.sessionid);
  if (!user) {
    return res.status(403).send("Forbidden!");
  }

  if (!req.body.id) {
    return res.status(406).send("Id required!");
  }

  const manga = await getManga(req.body.id);
  if (!manga) {
    return res.status(404).send("Can't find manga!");
  }

  await favorite(user.id, manga.id);
  res.send({ status: "ok" });
});

mangaRouter.delete("/favorite", checkCookies, async (req, res) => {
  const user = await getUserFromSessionId(req.cookies.sessionid);
  if (!user) {
    return res.status(403).send("Forbidden!");
  }

  if (!req.body.id) {
    return res.status(406).send("Id required!");
  }

  const manga = await getManga(req.body.id);
  if (!manga) {
    return res.status(404).send("Can't find manga!");
  }

  await delFavorite(user.id, manga.id);
  res.send({ status: "ok" });
});

mangaRouter.get("/random", checkCookies, async (req, res) => {
  const random = await getRandom();
  const doc = await random.next();

  res.send(doc)
})

export default mangaRouter;
