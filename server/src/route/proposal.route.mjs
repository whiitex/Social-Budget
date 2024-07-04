"use strict";

import express from "express";
import validateRequest from "../utilities.mjs";
import { body } from "express-validator";
import ProposalController from "../controller/proposal.controller.mjs";

class ProposalRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.router = new express.Router();
    this.proposalController = new ProposalController();
    this.initRoutes();
  }

  getRouter() {
    return this.router;
  }

  initRoutes() {
    /**
     * Get all approved proposals
     * It does NOT require the user to be logged in.
     */
    this.router.get("/approved", (req, res, next) => {
      this.proposalController
        .getApprovedProposals()
        .then((proposals) => res.status(200).json(proposals))
        .catch((err) => next(err));
    });

    /**
     * Get all proposals
     * It requires the user to be logged in.
     */
    this.router.get("/", this.authenticator.isLoggedIn, (req, res, next) => {
      this.proposalController
        .getProposals(req.user)
        .then((proposals) => res.status(200).json(proposals))
        .catch((err) => next(err));
    });

    /**
     * Insert a proposal
     * It requires the user to be logged in.
     * The proposal is sent in the request body.
     *  - description: string,
     *  - cost: number
     */
    this.router.put(
      "/",
      this.authenticator.isLoggedIn,
      [
        body("description").isString().default(""),
        body("cost").isNumeric({ min: 0 }).default(0),
        validateRequest,
      ],
      (req, res, next) => {
        this.proposalController
          .insertProposal(req.user, req.body)
          .then((proposal) => res.status(200).json(proposal))
          .catch((err) => next(err));
      }
    );

    /**
     * Edit a proposal
     * It requires the user to be logged in.
     * The proposal is sent in the request body.
     *  - id: number
     *  - description: string,
     *  - cost: number
     *  - is_approved: boolean
     */
    this.router.put(
      "/edit",
      this.authenticator.isLoggedIn,
      [
        body("id").exists().isNumeric({ min: 0 }),
        body("description").isString().default(""),
        body("cost").isNumeric({ min: 0 }).default(0),
        body("is_approved").isBoolean().default(false),
        validateRequest,
      ],
      (req, res, next) => {
        this.proposalController
          .editProposal(req.user, req.body)
          .then((proposal) => res.status(200).json(proposal))
          .catch((err) => next(err));
      }
    );

    /**
     * Remove a proposal
     * It requires the user to be logged in.
     * The proposal is sent in the request body.
     *   - id: number
     */
    this.router.delete("/", this.authenticator.isLoggedIn, [
      body("id").exists().isInt(),
      validateRequest,
    ], (req, res, next) => {
      this.proposalController
        .removeProposal(req.body)
        .then((proposal) => res.status(200).json(proposal))
        .catch((err) => next(err));
    });

    /**
     * Remove all proposals
     * It requires the user to be logged in and to be admin.
     */
    this.router.delete("/all", this.authenticator.isAdmin, (req, res, next) => {
      this.proposalController
        .removeAllProposals()
        .then((ok) => res.status(200).json(ok))
        .catch((err) => next(err));
    });
  }
}

export default ProposalRoutes;
