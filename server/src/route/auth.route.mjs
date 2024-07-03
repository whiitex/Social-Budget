"use strict";

import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import UserDAO from "../dao/user.dao.mjs";

class Authenticator {
  constructor(app) {
    this.app = app;
    this.router = new express.Router();
    this.userDAO = new UserDAO();
    this.initAuth();
  }

  getRouter() {
    return this.router;
  }

  initAuth() {
    const copyThis = this;

    // Passport configuration
    passport.use(
      new LocalStrategy(async function verify(username, password, callaback) {
        const user = await copyThis.userDAO.getUserByCredentials(
          username,
          password
        );
        if (!user)
          return callaback(null, false, "Incorrect username or password");
        else return callaback(null, user);
      })
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (user, done) {
      return done(null, user);
    });

    // Session configuration
    this.app.use(
      session({
        secret: "warzoneisbetterthanfortnite",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
          sameSite: "Strict",
        },
      })
    );

    this.app.use(passport.authenticate("session"));

    // Authentication routes

    /**
     * Route for logging in a user.
     * It expects the following parameters:
     * - username: string. It cannot be empty.
     * - password: string. It cannot be empty.
     */
    this.router.post("/", (req, res, next) => {
      this.login(req, res, next)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(401).json(err));
    });

    /**
     * Route for logging out a user.
     * It requires the user to be logged in.
     */
    this.router.delete("/current", this.isLoggedIn, (req, res, next) => {
      this.logout(req, res, next)
        .then(() => res.status(200).end())
        .catch((err) => next(err));
    });

    /**
     * Route for getting the current user.
     * It requires the user to be logged in.
     * It returns the current user.
     */
    this.router.get("/current", (req, res) => {
      res.status(200).json(req.user);
    });
  }

  /**
   * function to log in a user
   * @param req
   * @param res
   * @param next
   * @returns a promise that resolves to the logged in user or rejects with an error message
   */
  login(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) reject(err);
        else if (!user) reject(info);
        else {
          // success, log in the user
          req.login(user, (err) => {
            if (err) reject(err);
            else resolve(user);
          });
        }
      })(req, res, next);
    });
  }

  /**
   * function to log out a user
   * @param req
   * @param res
   * @param next
   * @returns a promise that resolves to null when the user is logged out
   */
  logout(req, res, next) {
    return new Promise((resolve, reject) => {
      req.logout(() => resolve(null));
    });
  }

  /**
   * Middleware to check if a user is logged in.
   */
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.status(401).send("Unauthorized");
  }

  /**
   * Middleware to check if a user is an admin
   */
  isAdmin(req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated() && req.user.isadmin) next();
    else res.status(403).send("Forbidden");
  }
}

export default Authenticator;
