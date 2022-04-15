import express from "express";
import cookieParser from "cookie-parser";
import { checkUsernamePassword, checkCookies } from "../middlewares/auth";
import { getUser, register, login } from "../database/userWrapper";
import { getUserFromSessionId, deleteSessionId } from "../database/authWrapper";

const authRouter = express.Router();
authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));
authRouter.use(cookieParser());

authRouter.post("/register", checkUsernamePassword, async (req, res) => {
  const user = await getUser(req.body.username);
  if (user) {
    return res.status(406).send("Username already taken!");
  }

  await register(req.body.username, req.body.password);
  res.send({ status: "ok" });
})

authRouter.post("/login", checkUsernamePassword, async (req, res) => {
  try {
    const sessionId = await login(req.body.username, req.body.password);

    let expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    return res.cookie("sessionid", sessionId, {
      expires: expiryDate,
      sameSite: "lax"
    }).end();
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
})

authRouter.post("/logout", checkCookies, async (req, res) => {
  await deleteSessionId(req.cookies.sessionid);
  res.clearCookie("sessionid").end();
})

authRouter.get("/me", checkCookies, async (req, res) => {
  const user = await getUserFromSessionId(req.cookies.sessionid);
  res.send(user);
})

export default authRouter;
