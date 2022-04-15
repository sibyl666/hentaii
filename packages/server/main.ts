import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Routers
import authRouter from "./routes/auth";
import mangaRouter from "./routes/manga";

if (process.env.DEV) {
  app.use(express.static("./mangas"))
}

const corsWhileList = ["https://hentaii.xyz", "https://www.hentaii.xyz"];
app.use(cors({
  credentials: true,
  origin: process.env.DEV ? "http://localhost:3000" : corsWhileList
}))
app.use("/api/auth", authRouter);
app.use("/api/manga", mangaRouter);

app.listen(4000, () => console.log("Listening on post 4000!"));
