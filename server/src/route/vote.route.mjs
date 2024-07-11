"use strict";

import express from "express";
import validateRequest from "../utilities.mjs";
import { body } from "express-validator";
import VoteController from "../controller/vote.controller.mjs";

class VoteRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.router = new express.Router();
    this.voteController = new VoteController();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    /**
     * Get the score of all proposals
     */
    this.router.get("/", this.authenticator.isLoggedIn, (req, res, next) => {
      this.voteController
        .getScore()
        .then((score) => res.status(200).json(score))
        .catch((err) => next(err));
    });

    /**
     * Insert or Modify the score of a proposal
     * It requires the user to be logged in.
     * The proposal id and the rating are sent in the request body.
     *  - proposal: Proposal
     *  - rating: number in [0, 3]
     */
    this.router.post(
      "/",
      this.authenticator.isLoggedIn,
      [
        body("proposal").exists(),
        body("rating").isInt({ min: 0, max: 3 }),
        validateRequest,
      ],
      (req, res, next) => {
        this.voteController
          .insertScore(req.user, req.body.proposal, req.body.rating)
          .then((proposal) => res.status(200).json(proposal))
          .catch((err) => next(err));
      }
    );

    /**
     * Remove the score of a proposal
     * It requires the user to be logged in.
     * The proposal id is sent in the request body.
     *  - id: number
     */
    this.router.delete(
      "/",
      this.authenticator.isLoggedIn,
      [body("id").isInt(), validateRequest],
      (req, res, next) => {
        this.voteController
          .removeScore(req.user, req.body.id)
          .then((proposal) => res.status(200).json(proposal))
          .catch((err) => next(err));
      }
    );
  }
}

export default VoteRoutes;
