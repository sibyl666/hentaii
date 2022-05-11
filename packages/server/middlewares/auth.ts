import axios from "axios";
import { RequestHandler } from "express";
import { getUserFromSessionId } from "../database/authWrapper";
import { Permission } from "../types";

export const checkUsernamePassword: RequestHandler = async (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.token) {
    return res.status(422).send("Username or Password is required!");
  }

  const resp = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
    params: {
      secret: process.env.CAPTCHA_SECRET,
      response: req.body.token,
    }
  });

  if (!resp.data.success && !process.env.DEV) {
    return res.status(406).send("Bot lol");
  }

  next();
};

export const checkPermissions = (perm: Permission) => {
  const checkPermissions: RequestHandler = async (req, res, next) => {
    if (!req.cookies.sessionid) {
      return res.status(403).send("Forbidden!");
    }

    const user = await getUserFromSessionId(req.cookies.sessionid);
    if (!user || !user.permissions?.includes(perm)) {
      return res.status(403).send("Forbidden!");
    }

    next();
  };

  return checkPermissions;
};

export const checkCookies: RequestHandler = (req, res, next) => {
  if (!req.cookies.sessionid) {
    return res.status(403).send("Forbidden!");
  }

  next();
};
