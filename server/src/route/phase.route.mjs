"use strict";

import express from "express";
import validateRequest from "../utilities.mjs";
import { body } from "express-validator";
import PhaseController from "../controller/phase.controller.mjs";

class PhaseRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.router = new express.Router();
    this.phaseController = new PhaseController();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    /**
     * Get the current phase
     * It does not require the user to be logged in.
     */
    this.router.get("/", (req, res, next) => {
      this.phaseController
        .getPhase()
        .then((phase) => res.status(200).json(phase))
        .catch((err) => next(err));
    });

    /**
     * Update the phase
     * It requires the user to be admin.
     * The phase and the budget are sent in the request body.
     *  - phase: string
     *  - budget: number
     */
    this.router.put(
      "/",
      this.authenticator.isAdmin,
      [
        body("phase").isInt(),
        body("budget").optional().isDecimal({ gt: 0 }),
        validateRequest,
      ],
      (req, res, next) => {
        this.phaseController
          .updatePhase(req.body.phase, req.body.budget || null)
          .then((updated) => res.status(200).json(updated))
          .catch((err) => next(err));
      }
    );

    /**
     * Reset all tables (proposals, state, votes)
     * It requires the user to be admin.
     */
    this.router.delete("/", this.authenticator.isAdmin, (req, res, next) => {
      this.phaseController
        .resetAll()
        .then((reset) => res.status(200).json(reset))
        .catch((err) => next(err));
    });
  }
}

export default PhaseRoutes;
